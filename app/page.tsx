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
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
      title: 'For Bigger Fun',
      username: 'funzone',
      caption: 'Maximum fun ahead! 🎉 #fun #party #goodvibes #weekend #laughs',
      likes: '120.1K',
      comments: '2341',
      saves: '8.2K',
      shares: '10.4K',
    },
    {
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
      title: 'For Bigger Joyrides',
      username: 'joyrider',
      caption: 'Take a ride! 🚗💨 #joyride #cars #adventure #road',
      likes: '210.2K',
      comments: '3210',
      saves: '12.4K',
      shares: '14.8K',
    },
    {
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
      title: 'For Bigger Meltdowns',
      username: 'meltdown',
      caption: 'When things heat up! 🔥 #meltdown #drama #intense',
      likes: '98.7K',
      comments: '1890',
      saves: '5.6K',
      shares: '7.1K',
    },
    {
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
      title: 'Sintel (Short)',
      username: 'blender',
      caption: 'Beautiful open movie. 🐉 #sintel #blender #animation #cinema',
      likes: '412.3K',
      comments: '6543',
      saves: '27.9K',
      shares: '31.2K',
    },
    {
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
      title: 'Tears of Steel',
      username: 'openmovie',
      caption: 'Sci‑fi short film 🎬 #tearsofsteel #blender #vfx #scifi',
      likes: '301.5K',
      comments: '5211',
      saves: '21.4K',
      shares: '24.6K',
    },
    {
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4',
      title: 'Volkswagen GTI Review',
      username: 'autotalk',
      caption: 'Car review time 🚘 #VW #GTI #review #cars',
      likes: '54.6K',
      comments: '1104',
      saves: '2.7K',
      shares: '3.3K',
    },
    {
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
      title: 'What Car For A Grand?',
      username: 'budgetgarage',
      caption: 'Budget car hunt! 💸 #cars #budget #auto #deal',
      likes: '76.1K',
      comments: '1540',
      saves: '4.1K',
      shares: '5.0K',
    },
    {
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
      title: 'Subaru Outback Street & Dirt',
      username: 'rallylife',
      caption: 'On and off road! 🏞️ #subaru #outback #rally #4x4',
      likes: '89.9K',
      comments: '1720',
      saves: '5.3K',
      shares: '6.7K',
    },
    {
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
      title: 'We Are Going On Bullrun',
      username: 'roadtrip',
      caption: 'The rally begins! 🏁 #bullrun #roadtrip #cars',
      likes: '65.2K',
      comments: '1209',
      saves: '3.2K',
      shares: '4.8K',
    },
    {
      url: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
      title: 'Flowers (CC0)',
      username: 'mdnmedia',
      caption: 'Relaxing flower clip 🌺 #nature #flowers #relax',
      likes: '41.7K',
      comments: '820',
      saves: '2.1K',
      shares: '2.9K',
    },
    {
      url: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
      title: 'Sintel Trailer (W3C)',
      username: 'w3media',
      caption: 'Trailer cut 🎞️ #sintel #trailer #animation',
      likes: '52.4K',
      comments: '1012',
      saves: '2.4K',
      shares: '3.1K',
    },
    {
      url: 'https://media.w3.org/2010/05/bunny/trailer.mp4',
      title: 'Bunny Trailer (W3C)',
      username: 'w3media',
      caption: 'Classic bunny 🐰 #bunny #trailer #cartoon',
      likes: '47.8K',
      comments: '930',
      saves: '1.9K',
      shares: '2.6K',
    },
    {
      url: 'https://media.w3.org/2010/05/video/movie_300.mp4',
      title: 'Movie 300 (W3C)',
      username: 'w3media',
      caption: 'Test clip 300p 📺 #test #sample #video',
      likes: '33.4K',
      comments: '640',
      saves: '1.2K',
      shares: '1.8K',
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
        'The ultimate escape! 🏃‍♂️💨 -#escape #adventure #thriller #action #cinematic...',
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
  console.log(current);
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
