'use client';

import React, { useState } from 'react';
import PreviewVideoPlayer from '@/components/common/feed/preview-video-player';
import MainLayout from '@/components/layout/main-content';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

const FeedPage = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [current, setCurrent] = useState(1);

  // Multiple free video URLs
  const videos = [
    {
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      title: 'Big Buck Bunny',
      username: 'memekingdomtv',
      caption:
        'Baby Cappuccina strikes again 🟣✨ #cartoon #ballerinacappuccina #brainrot #tungtungtungsahur...',
      likes: '459.3K',
      comments: '8881',
      saves: '34.9K',
      shares: '37.7K',
    },
    {
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      title: "Elephant's Dream",
      username: 'dreamworld',
      caption:
        'Amazing elephant adventure! 🐘✨ #nature #wildlife #elephants #adventure #dreams...',
      likes: '234.7K',
      comments: '4562',
      saves: '18.3K',
      shares: '22.1K',
    },
    {
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      title: 'For Bigger Blazes',
      username: 'actionhero',
      caption:
        'Epic action sequence! 🔥💥 #action #adventure #epic #fire #blaze #cinematic...',
      likes: '678.9K',
      comments: '12345',
      saves: '56.7K',
      shares: '89.2K',
    },
    {
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      title: 'For Bigger Escapes',
      username: 'escapeartist',
      caption:
        'The ultimate escape! 🏃‍♂️💨 #escape #adventure #thriller #action #cinematic...',
      likes: '345.6K',
      comments: '7890',
      saves: '23.4K',
      shares: '45.6K',
    },
  ];

  // Video control functions
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Handle video events
  const handleVideoClick = () => {
    togglePlayPause();
  };

  const [emblaApi, setEmblaApi] = React.useState<CarouselApi>();

  React.useEffect(() => {
    if (!emblaApi) {
      return;
    }

    emblaApi.on('select', (e) => {
      setCurrent(e.selectedScrollSnap() + 1);
      setIsPlaying(true);
    });
    return () => {
      emblaApi?.off('select', (e) => console.log(e));
    };
  }, [emblaApi]);
  console.log(current)
  return (
    <MainLayout>
      <div className="relative h-full w-full flex-1 overflow-hidden">
        <div className="relative h-full">
          <Carousel
            setApi={setEmblaApi}
            className="relative"
            orientation="vertical"
          >
            <CarouselContent className="!h-[calc(100dvh+16px)]">
              {videos.map((video, index) => (
                <CarouselItem key={index} className="">
                  <div className="">
                    <PreviewVideoPlayer
                      videoData={video}
                      isPlaying={isPlaying && current === index + 1}
                      isMuted={isMuted}
                      onPlayPause={() => {
                        if (current === index + 1) {
                          handleVideoClick();
                        }
                      }}
                      isActive={current === index}
                      onMuteToggle={() => setIsMuted(!isMuted)}
                      onVideoClick={() => {
                        console.log(current, index);
                        if (current === index + 1) {
                          handleVideoClick();
                        }
                      }}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </MainLayout>
  );
};

export default FeedPage;
