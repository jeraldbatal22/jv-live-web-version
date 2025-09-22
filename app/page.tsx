'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import VideoPlayer from '@/components/video-player';
import {
  // ChevronUp,
  // ChevronDown,
  Heart,
  MessageCircle,
  Bookmark,
  Share,
} from 'lucide-react';
import MainLayout from '@/components/layout/main-content';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  // CarouselNext,
  // CarouselPrevious,
} from '@/components/ui/carousel';
// import Autoplay from 'embla-carousel-autoplay';
// import { Card, CardContent } from '@/components/ui/card';

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

  const currentVideo = videos[current];

  // Video control functions
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const skipForward = () => {
    // This will be handled by the video player component
  };

  const skipBackward = () => {
    // This will be handled by the video player component
  };

  // const nextVideo = () => {
  //   setCurrent((prev) => {
  //     const next = prev + 1;
  //     return next > videos.length ? 1 : next;
  //   });
  //   setIsPlaying(true);
  // };

  // const prevVideo = () => {
  //   setCurrent((prev) => {
  //     const prevIndex = prev - 1;
  //     return prevIndex < 1 ? videos.length : prevIndex;
  //   });
  //   setIsPlaying(true);
  // };

  // Handle video events
  const handleVideoClick = () => {
    togglePlayPause();
  };

  // const plugin = React.useRef(Autoplay({ stopOnInteraction: true }));

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

  return (
    <MainLayout>
      <div className="relative h-full w-full flex-1 overflow-hidden">
        <div className="relative h-full">
          <Carousel
            opts={{
              slidesToScroll: 1,
              containScroll: 'trimSnaps',
            }}
            setApi={setEmblaApi}
            className="relative"
            orientation="vertical"
          >
            <CarouselContent className="!h-[calc(100dvh+20px)]">
              {videos.map((video, index) => (
                <CarouselItem key={index} className="h-full">
                  <div className="">
                    <VideoPlayer
                      src={video.url}
                      username={video.username}
                      caption={video.caption}
                      isPlaying={isPlaying && current === index + 1}
                      isMuted={isMuted}
                      onPlayPause={() => {
                        if (current === index + 1) {
                          handleVideoClick();
                        }
                      }}
                      isActive={current === index}
                      onMuteToggle={() => setIsMuted(!isMuted)}
                      onSkipForward={skipForward}
                      onSkipBackward={skipBackward}
                      onVideoClick={() => {
                        console.log(current, index);
                        if (current === index + 1) {
                          handleVideoClick();
                        }
                      }}
                      showControls={true}
                      onMouseEnter={() => {}}
                      onMouseLeave={() => {}}
                    />
                  </div>
                  {/* <Card className="h-full rounded-none">
                    <CardContent className="flex aspect-square">
                      <span className="text-4xl font-semibold">
                        {index + 1}
                      </span>
                    </CardContent>
                  </Card> */}
                </CarouselItem>
              ))}
            </CarouselContent>
            {/* <div className="pointer-events-auto absolute top-1/2 left-2 z-20 flex -translate-y-1/2 transform flex-col space-y-2 md:left-10">
              <CarouselPrevious className="inherit size-10" />
              <CarouselNext className="inherit size-10" />
            </div> */}
          </Carousel>

          {/* {videos.map((video, index) => (
            <div
              key={index}
              className={`absolute inset-0 h-screen w-full transition-transform duration-300 ${
                current === index + 1 ? 'translate-y-0' : 'translate-y-full'
              }`}
              style={{
                height: '100vh',
                width: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
              }}
            >
              <VideoPlayer
                src={video.url}
                username={video.username}
                caption={video.caption}
                isPlaying={isPlaying && current === index + 1}
                isMuted={isMuted}
                onPlayPause={() => {
                  if (current === index + 1) {
                    togglePlayPause();
                  }
                }}
                onMuteToggle={() => setIsMuted(!isMuted)}
                onSkipForward={skipForward}
                onSkipBackward={skipBackward}
                onVideoClick={() => {
                  if (current === index + 1) {
                    handleVideoClick();
                  }
                }}
                showControls={true}
                onMouseEnter={() => {}}
                onMouseLeave={() => {}}
              />
            </div>
          ))} */}

          {/* Custom Navigation Arrows */}
          {/* <div className="pointer-events-auto absolute top-1/2 left-2 z-20 flex -translate-y-1/2 transform flex-col space-y-2 md:left-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                prevVideo();
              }}
              className="h-10 w-10 rounded-full bg-black/20 text-white backdrop-blur-sm hover:bg-black/30 md:h-16 md:w-16"
            >
              <ChevronUp className="!h-6 !w-6 md:!h-8 md:!w-8" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                nextVideo();
              }}
              className="h-10 w-10 rounded-full bg-black/20 text-white backdrop-blur-sm hover:bg-black/30 md:h-16 md:w-16"
            >
              <ChevronDown className="!h-6 !w-6 md:!h-8 md:!w-8" />
            </Button>
          </div> */}

          {/* Video Counter */}
          <div className="absolute right-1 bottom-30 z-10 transform rounded px-2 py-1 text-sm text-white md:right-4">
            <div className="flex-1 flex-row items-center justify-end space-y-4 pb-8">
              {/* Profile Picture */}
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-lg font-bold text-white md:h-16 md:w-16">
                {currentVideo?.username?.charAt(0).toUpperCase() || 'U'}
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
                <span className="text-xs">{currentVideo?.likes || '0'}</span>
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
                <span className="text-xs">{currentVideo?.comments || '0'}</span>
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
                <span className="text-xs">{currentVideo?.saves || '0'}</span>
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
                <span className="text-xs">{currentVideo?.shares || '0'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default FeedPage;
