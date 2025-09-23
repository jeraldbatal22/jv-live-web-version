'use client';

import ComingSoon from '@/components/common/coming-soon';
// import { useState, useRef } from 'react';
// import PreviewVideoPlayer from '@/components/common/feed/preview-video-player';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
import MainLayout from '@/components/layout/main-content';

export default function LiveNow() {
  // const [isLive, setIsLive] = useState(false);
  // const videoRef = useRef<HTMLVideoElement>(null);

  // // Player state for displaying a live/video stream in UI
  // const [isPlaying, setIsPlaying] = useState(true);
  // const [isMuted, setIsMuted] = useState(true);
  // const [showControls, setShowControls] = useState(true);

  // const videoData = {
  //   username: 'JustVibing',
  //   caption: 'Live show • Enjoy the vibes',
  //   likes: 1200,
  //   comments: 340,
  //   saves: 58,
  //   shares: 96,
  //   // Demo MP4 stream; replace with your live HLS/MP4 URL when available
  //   url: 'https://cdn.coverr.co/videos/coverr-working-on-a-laptop-1405/1080p.mp4',
  // } as any;

  // const startLive = async () => {
  //   try {
  //     const stream = await navigator.mediaDevices.getUserMedia({
  //       video: true,
  //       audio: true,
  //     });
  //     if (videoRef.current) {
  //       videoRef.current.srcObject = stream;
  //       await videoRef.current.play();
  //     }
  //     setIsLive(true);
  //   } catch (err) {
  //     console.error('Error accessing camera/mic:', err);
  //     alert('Camera or microphone access denied.');
  //   }
  // };

  return (
    <MainLayout>
      <div className="flex w-full flex-col gap-6 px-6">
        <ComingSoon />
        {/* <Card>
          <CardHeader>
            <CardTitle>Go Live (local preview)</CardTitle>
          </CardHeader>
          <CardContent>
            {!isLive ? (
              <Button onClick={startLive} className="px-6">
                🎥 Live now
              </Button>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full max-w-xl rounded-xl border"
                />
                <p className="font-medium text-green-600">
                  ✅ You are live (local preview)
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Live Stream</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-[60vh] w-full overflow-hidden rounded-xl">
              <PreviewVideoPlayer
                videoData={videoData}
                isPlaying={isPlaying}
                isMuted={isMuted}
                isActive
                onPlayPause={() => setIsPlaying((p) => !p)}
                onMuteToggle={() => setIsMuted((m) => !m)}
                onVideoClick={() => setShowControls((s) => !s)}
                showControls={showControls}
              />
            </div>
          </CardContent>
        </Card> */}
      </div>
    </MainLayout>
  );
}
