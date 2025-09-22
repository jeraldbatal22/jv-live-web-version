'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  SkipBack,
  SkipForward,
  MoreVertical,
  Music,
  Share,
  Bookmark,
  MessageCircle,
  Heart,
} from 'lucide-react';
import { useIdleOverlay } from '@/hooks/usIdleOverlay';
import { cn } from '@/lib/utils';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import '@videojs/themes/dist/city/index.css';
import { SidebarTrigger } from '../../ui/sidebar';

interface PreviewVideoPlayerProps {
  videoData: any;
  isPlaying: boolean;
  isMuted: boolean;
  isActive?: boolean;
  onPlayPause: () => void;
  onMuteToggle: () => void;
  onVideoClick: () => void;
  showControls?: boolean;
}

const PreviewVideoPlayer: React.FC<PreviewVideoPlayerProps> = ({
  videoData,
  isPlaying,
  isMuted,
  onPlayPause,
  onMuteToggle,
  onVideoClick,
  showControls = true,
  isActive,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<any>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (!videoRef.current || playerRef.current) return;

    const player = videojs(videoRef.current, {
      controls: false, // keep using custom overlay controls
      autoplay: true,
      loop: true,
      preload: 'metadata',
      playsinline: true,
      fluid: false,
      responsive: true,
      inactivityTimeout: 0,
    });

    playerRef.current = player;

    // Wire up time/duration updates
    const onTimeUpdate = () => setCurrentTime(player.currentTime() || 0);
    const onLoadedMetadata = () => setDuration(player.duration() || 0);
    player.on('timeupdate', onTimeUpdate);
    player.on('loadedmetadata', onLoadedMetadata);

    // Source and mute handled in subsequent effects

    return () => {
      player.off('timeupdate', onTimeUpdate);
      player.off('loadedmetadata', onLoadedMetadata);
      player.dispose();
      playerRef.current = null;
    };
  }, []);

  // Update source when src changes
  useEffect(() => {
    if (!playerRef.current) return;
    const player = playerRef.current;
    const currentSrc = (player.currentSource()?.src as string) || '';
    if (videoData?.url && currentSrc !== videoData?.url) {
      player.src({ src: videoData?.url, type: 'video/mp4' });
    }
  }, [videoData?.url]);

  // Handle play/pause state changes
  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;
    if (isPlaying || isActive) {
      player.play().catch(() => {});
    } else {
      player.pause();
    }
  }, [isPlaying, isActive]);

  // Handle mute state changes
  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;
    player.muted(isMuted);
  }, [isMuted]);

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleSkipForward = () => {
    const player = playerRef.current;
    if (player) {
      player.currentTime((player.currentTime() || 0) + 10);
    }
  };

  const handleSkipBackward = () => {
    const player = playerRef.current;
    if (player) {
      player.currentTime(Math.max(0, (player.currentTime() || 0) - 10));
    }
  };

  const handlePlayPause = () => {
    const player = playerRef.current;
    if (player) {
      if (isPlaying) {
        player.pause();
      } else {
        player.play().catch(() => {});
      }
    }
    onPlayPause();
  };
  const containerRef = useRef<HTMLDivElement>(null);
  const { isIdle } = useIdleOverlay({ idleTime: 3000, ref: containerRef }); // 3s idle delay

  return (
    <div
      ref={containerRef}
      className="relative h-dvh w-full bg-black"
      onClick={onVideoClick}
    >
      <video
        ref={videoRef}
        className="video-js vjs-theme-city absolute inset-0 h-full w-full cursor-pointer object-cover"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
      />

      {/* Video Overlays */}
      <div className="absolute top-2 left-2 z-20 md:top-4 md:left-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            onMuteToggle();
          }}
          className="text-white hover:bg-black/20"
        >
          {isMuted ? (
            <VolumeX className="!h-5 !w-5 md:!h-6 md:!w-6" />
          ) : (
            <Volume2 className="!h-5 !w-5 md:!h-6 md:!w-6" />
          )}
        </Button>
      </div>

      <div className="absolute top-2 right-2 z-20 flex items-center md:top-4 md:right-4">
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-black/20"
          onClick={(e) => e.stopPropagation()}
        >
          <MoreVertical className="!h-5 !w-5 md:!h-6 md:!w-6" />
        </Button>
        <SidebarTrigger
          onClick={(e) => e.stopPropagation()}
          className="z-20 mt-0 flex cursor-pointer md:hidden"
        />
      </div>

      {/* Video Controls Overlay */}
      <div
        className={cn(
          showControls ? 'opacity-100' : 'opacity-0',
          `lg:${showControls ? 'opacity-100' : 'opacity-0'}`,
          isIdle
            ? 'pointer-events-none scale-90 opacity-0'
            : 'scale-100 opacity-100',
          'absolute inset-0 z-2 flex items-center justify-center transition-all duration-500 ease-in-out'
        )}
      >
        <div className="flex items-center space-x-2 md:space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              handleSkipBackward();
            }}
            className="h-14 w-14 rounded-full text-white hover:bg-black/20 md:h-20 md:w-20"
          >
            <SkipBack className="!h-5 !w-5 md:!h-8 md:!w-8" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              handlePlayPause();
            }}
            className="h-14 w-14 rounded-full text-white hover:bg-black/20 md:h-20 md:w-20"
          >
            {isPlaying ? (
              <Pause className="!h-5 !w-5 md:!h-8 md:!w-8" />
            ) : (
              <Play className="!h-5 !w-5 md:!h-8 md:!w-8" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              handleSkipForward();
            }}
            className="mobile-nav-button h-14 w-14 rounded-full text-white hover:bg-black/20 md:h-20 md:w-20"
          >
            <SkipForward className="!h-5 !w-5 md:!h-8 md:!w-8" />
          </Button>
        </div>
      </div>

      {/* Video Counter */}
      <div className="absolute right-1 bottom-30 z-10 transform rounded px-2 py-1 text-sm text-white md:right-4">
        <div className="flex-1 flex-row items-center justify-end space-y-4 pb-8">
          {/* Profile Picture */}
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-lg font-bold text-white md:h-16 md:w-16">
            {videoData.username?.charAt(0).toUpperCase() || 'U'}
          </div>

          {/* Like Button */}
          <div className="flex flex-col items-center space-y-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 cursor-pointer rounded-full bg-black/20 text-white backdrop-blur-sm hover:bg-black/30 md:h-16 md:w-16"
            >
              <Heart className="!h-5 !w-5 md:!h-7 md:!w-7" />
            </Button>
            <span className="text-xs">{videoData.likes || '0'}</span>
          </div>

          {/* Comment Button */}
          <div className="flex flex-col items-center space-y-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 cursor-pointer rounded-full bg-black/20 text-white backdrop-blur-sm hover:bg-black/30 md:h-16 md:w-16"
            >
              <MessageCircle className="!h-5 !w-5 md:!h-7 md:!w-7" />
            </Button>
            <span className="text-xs">{videoData.comments || '0'}</span>
          </div>

          {/* Save Button */}
          <div className="flex flex-col items-center space-y-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 cursor-pointer rounded-full bg-black/20 text-white backdrop-blur-sm hover:bg-black/30 md:h-16 md:w-16"
            >
              <Bookmark className="!h-5 !w-5 md:!h-7 md:!w-7" />
            </Button>
            <span className="text-xs">{videoData.saves || '0'}</span>
          </div>

          {/* Share Button */}
          <div className="flex flex-col items-center space-y-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 cursor-pointer rounded-full bg-black/20 text-white backdrop-blur-sm hover:bg-black/30 md:h-16 md:w-16"
            >
              <Share className="!h-5 !w-5 md:!h-7 md:!w-7" />
            </Button>
            <span className="text-xs">{videoData.shares || '0'}</span>
          </div>
        </div>
      </div>

      {/* Video Metadata */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          console.log('first');
        }}
        className="absolute right-0 bottom-0 left-0 z-1 w-full max-w-full px-5 py-3 text-white backdrop-blur-sm md:space-y-3"
      >
        <div className="text-xl font-semibold md:text-3xl">
          {videoData.username}
        </div>
        <div className="mt-1 text-sm md:text-lg">
          {videoData.caption}
          <span className="ml-1 text-gray-300">more</span>
        </div>
        <div className="md:text-md mt-2 flex items-center text-sm">
          <Music className="mr-1 h-4 w-4" />
          <span>original sound - {videoData.username}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 z-2 h-1 w-full bg-gray-600">
        <div
          className="h-full bg-gray-100 transition-all duration-100"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
};

export default PreviewVideoPlayer;
