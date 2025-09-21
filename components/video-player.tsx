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
} from 'lucide-react';

interface VideoPlayerProps {
  src: string;
  username: string;
  caption: string;
  isPlaying: boolean;
  isMuted: boolean;
  onPlayPause: () => void;
  onMuteToggle: () => void;
  onSkipForward: () => void;
  onSkipBackward: () => void;
  onVideoClick: () => void;
  showControls: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  username,
  caption,
  isPlaying,
  isMuted,
  onPlayPause,
  onMuteToggle,
  onSkipForward,
  onSkipBackward,
  onVideoClick,
  showControls,
  onMouseEnter,
  onMouseLeave,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
    };
  }, []);

  // Handle play/pause state changes
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.play().catch(console.error);
    } else {
      video.pause();
    }
  }, [isPlaying]);

  // Handle mute state changes
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = isMuted;
  }, [isMuted]);

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleSkipForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime += 10;
    }
    onSkipForward();
  };

  const handleSkipBackward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime -= 10;
    }
    onSkipBackward();
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(console.error);
      }
    }
    onPlayPause();
  };
  console.log(src, username);
  return (
    <div
      className="relative h-screen w-full bg-black"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onVideoClick}
      onTouchStart={() => {
        // Show controls on mobile touch
        if (window.innerWidth < 1024) {
          onMouseEnter();
          setTimeout(() => onMouseLeave(), 3000);
        }
      }}
      style={{
        width: '100%',
        height: '100vh',
        backgroundColor: '#000',
        position: 'relative',
      }}
    >
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full cursor-pointer object-cover"
        autoPlay
        loop
        muted={isMuted}
        playsInline
        preload="metadata"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Debug overlay for mobile */}
      <div className="absolute top-4 left-4 z-50 lg:hidden">
        <div className="rounded bg-red-500 px-2 py-1 text-xs text-white">
          Video: {isPlaying ? 'Playing' : 'Paused'}
        </div>
      </div>

      {/* Video Overlays */}
      <div className="absolute top-4 left-4 z-1">
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
            <VolumeX className="h-6 w-6" />
          ) : (
            <Volume2 className="h-6 w-6" />
          )}
        </Button>
      </div>

      <div className="absolute top-4 right-4 z-1">
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-black/20"
          onClick={(e) => e.stopPropagation()}
        >
          <MoreVertical className="h-6 w-6" />
        </Button>
      </div>

      {/* Video Controls Overlay */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'} lg:${showControls ? 'opacity-100' : 'opacity-0'} mobile-controls`}
      >
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              handleSkipBackward();
            }}
            className="mobile-nav-button h-20 w-20 rounded-full text-white hover:bg-black/20"
          >
            <SkipBack className="!h-8 !w-8" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              handlePlayPause();
            }}
            className="mobile-nav-button h-20 w-20 rounded-full text-white hover:bg-black/20"
          >
            {isPlaying ? (
              <Pause className="!h-8 !w-8" />
            ) : (
              <Play className="!h-8 !w-8" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              handleSkipForward();
            }}
            className="mobile-nav-button h-20 w-20 rounded-full text-white hover:bg-black/20"
          >
            <SkipForward className="!h-8 !w-8" />
          </Button>
        </div>
      </div>

      {/* Video Metadata */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          console.log('first');
        }}
        className="absolute right-0 bottom-0 left-0 z-10 w-full max-w-xs space-y-3 px-5 py-3 text-white backdrop-blur-sm lg:max-w-full"
      >
        <div className="text-3xl font-semibold">{username}</div>
        <div className="mt-1 text-lg">
          {caption}
          <span className="ml-1 text-gray-300">more</span>
        </div>
        <div className="text-md mt-2 flex items-center">
          <Music className="mr-1 h-4 w-4" />
          <span>original sound - {username}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 h-1 w-full bg-gray-600">
        <div
          className="h-full bg-red-500 transition-all duration-100"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
};

export default VideoPlayer;
