'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  MoreVertical,
  Music,
  Share,
  Bookmark,
  MessageCircle,
  Heart,
} from 'lucide-react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import '@videojs/themes/dist/city/index.css';
import { SidebarTrigger } from '../../ui/sidebar';
import { motion } from 'framer-motion';

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
  onVideoClick: _onVideoClick,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<any>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [tapFeedback, setTapFeedback] = useState<{
    visible: boolean;
    type: 'play' | 'pause';
  }>({
    visible: false,
    type: 'play',
  });
  const hideFeedbackTimerRef = useRef<number | null>(null);
  // const [intrinsicSize, setIntrinsicSize] = useState<{ width: number; height: number } | null>(null);

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
    const onLoadedMetadata = () => {
      setDuration(player.duration() || 0);
      // const width = (player.videoWidth && player.videoWidth()) || (videoRef.current?.videoWidth ?? 0);
      // const height = (player.videoHeight && player.videoHeight()) || (videoRef.current?.videoHeight ?? 0);
      // if (width > 0 && height > 0) {
      //   setIntrinsicSize({ width, height });
      //   try {
      //     if (typeof (player as any).aspectRatio === 'function') {
      //       (player as any).aspectRatio(`${width}:${height}`);
      //     }
      //     if (typeof (player as any).fluid === 'function') {
      //       (player as any).fluid(true);
      //     }
      //   } catch {}
      // }
    };
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
    if (isPlaying) {
      player.play().catch(() => {});
    } else {
      player.pause();
    }
  }, [isPlaying]);

  // Handle mute state changes
  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;
    player.muted(isMuted);
  }, [isMuted]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (hideFeedbackTimerRef.current) {
        clearTimeout(hideFeedbackTimerRef.current);
      }
    };
  }, []);

  const showTapFeedback = (type: 'play' | 'pause') => {
    if (hideFeedbackTimerRef.current) {
      clearTimeout(hideFeedbackTimerRef.current);
    }
    setTapFeedback({ visible: true, type });
    hideFeedbackTimerRef.current = window.setTimeout(() => {
      setTapFeedback((prev) => ({ ...prev, visible: false }));
      hideFeedbackTimerRef.current = null;
    }, 700);
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleSeek = (value: number[]) => {
    const player = playerRef.current;
    if (player && duration > 0) {
      const newTime = (value[0] / 100) * duration;
      player.currentTime(newTime);
      onPlayPause();
    }
  };

  const handlePlayPause = () => {
    // Do not directly control the player here to avoid double toggles on mobile.
    // Let isPlaying effect drive the actual player state.
    showTapFeedback(isPlaying ? 'pause' : 'play');
    onPlayPause();
  };

  return (
    <div
      className="relative flex h-dvh w-full cursor-pointer items-center justify-center bg-[#251E25]"
      onPointerDown={(e) => {
        // Use pointer events for better mobile behavior and to avoid duplicate click/touch
        if ((e.target as HTMLElement)?.closest('[data-interactive="true"]'))
          return;
        handlePlayPause();
      }}
    >
      <video
        ref={videoRef}
        className="video-js vjs-theme-city md:!h-full md:!w-full"
        style={
          {
            // absolute inset-0 !flex !justify-center !items-center !cursor-pointer !object-contain
            // width: '100%',
            // height: '100%',
            // objectFit: 'contain',
            // display: 'block',
            // aspectRatio: intrinsicSize ? `${intrinsicSize.width} / ${intrinsicSize.height}` : undefined,
          }
        }
      />

      {/* Video Overlays */}
      <div
        className="absolute top-2 left-2 z-20 md:top-4 md:left-4"
        data-interactive="true"
        onPointerDown={(e) => e.stopPropagation()}
      >
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

      <div
        className="absolute top-2 right-2 z-20 flex items-center md:top-4 md:right-4"
        data-interactive="true"
        onPointerDown={(e) => e.stopPropagation()}
      >
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

      {/* Tap feedback overlay (auto-hides) */}
      {tapFeedback.visible && (
        <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="rounded-full bg-black/30 p-6 text-white md:p-8"
          >
            {tapFeedback.type === 'play' ? (
              <Play className="!h-8 !w-8 md:!h-10 md:!w-10" />
            ) : (
              <Pause className="!h-8 !w-8 md:!h-10 md:!w-10" />
            )}
          </motion.div>
        </div>
      )}

      {/* Video Counter */}
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        onPointerDown={(e) => e.stopPropagation()}
        className="absolute right-1 bottom-30 z-20 transform rounded px-2 py-1 text-sm text-white md:right-4"
      >
        <div className="flex-1 flex-row items-center justify-end space-y-4 pb-8">
          {/* Profile Picture */}
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-lg font-bold text-white md:h-16 md:w-16">
            {videoData.username?.charAt(0).toUpperCase() || 'U'}
          </div>

          {/* Like Button */}
          <div className="flex flex-col items-center space-y-1">
            <Button
              onClick={() => console.log('HEART')}
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
        onPointerDown={(e) => e.stopPropagation()}
        className="absolute right-0 bottom-0 left-0 z-20 w-full max-w-full px-5 py-3 text-white backdrop-blur-sm md:space-y-3"
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

      {/* Progress Bar - Interactive Slider */}
      <div
        className="absolute bottom-0 left-0 z-20 w-full"
        data-interactive="true"
        onPointerDown={(e) => e.stopPropagation()}
      >
        <Slider
          value={[progressPercentage]}
          isShowSliderThumb={false}
          onValueChange={handleSeek}
          max={100}
          min={0}
          step={0.1}
          className="w-full cursor-pointer"
        />
      </div>
    </div>
  );
};

export default PreviewVideoPlayer;
