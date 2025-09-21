'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import VideoPlayer from '@/components/video-player';
import {
  Search,
  Home,
  Compass,
  UserPlus,
  Plus,
  Tv,
  User,
  MoreHorizontal,
  ChevronUp,
  ChevronDown,
  Heart,
  MessageCircle,
  Bookmark,
  Share,
  Menu,
  X,
} from 'lucide-react';
import MainLayout from '@/components/layout/main-content';

const FeedPage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [current, setCurrent] = useState(1);
  const [count, setCount] = useState(0);

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

  const nextVideo = () => {
    setCurrent((prev) => {
      const next = prev + 1;
      return next > videos.length ? 1 : next;
    });
    setIsPlaying(true);
  };

  const prevVideo = () => {
    setCurrent((prev) => {
      const prevIndex = prev - 1;
      return prevIndex < 1 ? videos.length : prevIndex;
    });
    setIsPlaying(true);
  };

  // Initialize count
  useEffect(() => {
    setCount(videos.length);
  }, [videos.length]);

  // Handle video events
  const handleVideoClick = () => {
    togglePlayPause();
  };

  return (
    <MainLayout>
      {/* Central Video Player with Custom Carousel */}
      <div className="relative h-full w-full flex-1 overflow-hidden">
        {/* <div className="absolute bottom-0 left-0 z-10 h-1/3 w-full rounded-lg bg-gradient-to-t from-black via-black/50 to-transparent" /> */}
        <div className="relative h-full w-full">
          {videos.map((video, index) => (
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
          ))}

          {/* Custom Navigation Arrows */}
          <div className="pointer-events-auto absolute top-1/2 left-4 z-20 flex -translate-y-1/2 transform flex-col space-y-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                prevVideo();
              }}
              className="h-16 w-16 rounded-full bg-black/20 text-white backdrop-blur-sm hover:bg-black/30"
            >
              <ChevronUp className="!h-8 !w-8" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                nextVideo();
              }}
              className="h-16 w-16 rounded-full bg-black/20 text-white backdrop-blur-sm hover:bg-black/30"
            >
              <ChevronDown className="!h-8 !w-8" />
            </Button>
          </div>

          {/* Video Counter */}
          <div className="absolute right-4 bottom-30 z-10 transform rounded px-2 py-1 text-sm text-white">
            <div className="flex-1 flex-row items-center justify-end space-y-4 pb-8">
              {/* Profile Picture */}
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-lg font-bold text-white">
                {currentVideo?.username?.charAt(0).toUpperCase() || 'U'}
              </div>

              {/* Like Button */}
              <div className="flex flex-col items-center space-y-1">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-16 w-16 cursor-pointer rounded-full hover:opacity-60"
                >
                  <Heart className="!h-7 !w-7" />
                </Button>
                <span className="text-xs">{currentVideo?.likes || '0'}</span>
              </div>

              {/* Comment Button */}
              <div className="flex flex-col items-center space-y-1">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-16 w-16 cursor-pointer rounded-full hover:opacity-60"
                >
                  <MessageCircle className="!h-7 !w-7" />
                </Button>
                <span className="text-xs">{currentVideo?.comments || '0'}</span>
              </div>

              {/* Save Button */}
              <div className="flex flex-col items-center space-y-1">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-16 w-16 cursor-pointer rounded-full hover:opacity-60"
                >
                  <Bookmark className="!h-7 !w-7" />
                </Button>
                <span className="text-xs">{currentVideo?.saves || '0'}</span>
              </div>

              {/* Share Button */}
              <div className="flex flex-col items-center space-y-1">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-16 w-16 cursor-pointer rounded-full hover:opacity-60"
                >
                  <Share className="!h-7 !w-7" />
                </Button>
                <span className="text-xs">{currentVideo?.shares || '0'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Hidden on mobile, shown on desktop */}
      <div className="hidden flex-col bg-gray-900 lg:hidden lg:w-80">
        {/* Interaction Buttons */}
        <div className="hidden flex-1 flex-col items-center justify-end space-y-6 pb-8">
          {/* Profile Picture */}
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-sm font-bold text-white">
            {currentVideo?.username?.charAt(0).toUpperCase() || 'U'}
          </div>

          {/* Like Button */}
          <div className="flex flex-col items-center space-y-1">
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 border-gray-700 bg-gray-800 hover:bg-gray-700"
            >
              <Heart className="h-6 w-6" />
            </Button>
            <span className="text-xs">{currentVideo?.likes || '0'}</span>
          </div>

          {/* Comment Button */}
          <div className="flex flex-col items-center space-y-1">
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 border-gray-700 bg-gray-800 hover:bg-gray-700"
            >
              <MessageCircle className="h-6 w-6" />
            </Button>
            <span className="text-xs">{currentVideo?.comments || '0'}</span>
          </div>

          {/* Save Button */}
          <div className="flex flex-col items-center space-y-1">
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 border-gray-700 bg-gray-800 hover:bg-gray-700"
            >
              <Bookmark className="h-6 w-6" />
            </Button>
            <span className="text-xs">{currentVideo?.saves || '0'}</span>
          </div>

          {/* Share Button */}
          <div className="flex flex-col items-center space-y-1">
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 border-gray-700 bg-gray-800 hover:bg-gray-700"
            >
              <Share className="h-6 w-6" />
            </Button>
            <span className="text-xs">{currentVideo?.shares || '0'}</span>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="fixed right-0 bottom-0 left-0 z-30 flex justify-around border-t border-gray-700 bg-gray-900/95 py-2 backdrop-blur-sm lg:hidden">
        <Button variant="ghost" size="icon" className="text-red-500">
          <Home className="h-6 w-6" />
        </Button>
        <Button variant="ghost" size="icon" className="text-white">
          <Compass className="h-6 w-6" />
        </Button>
        <Button variant="ghost" size="icon" className="text-white">
          <Plus className="h-6 w-6" />
        </Button>
        <Button variant="ghost" size="icon" className="text-white">
          <MessageCircle className="h-6 w-6" />
        </Button>
        <Button variant="ghost" size="icon" className="text-white">
          <User className="h-6 w-6" />
        </Button>
      </div>

      {/* Mobile Video Navigation Buttons */}
      <div className="absolute top-1/2 left-4 z-20 flex -translate-y-1/2 transform flex-col space-y-3 lg:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            prevVideo();
          }}
          className="mobile-nav-button h-12 w-12 bg-black/20 text-white backdrop-blur-sm hover:bg-black/30"
        >
          <ChevronUp className="h-6 w-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            nextVideo();
          }}
          className="mobile-nav-button h-12 w-12 bg-black/20 text-white backdrop-blur-sm hover:bg-black/30"
        >
          <ChevronDown className="h-6 w-6" />
        </Button>
      </div>

      {/* Mobile Video Counter */}
      <div className="absolute top-1/2 right-4 z-20 -translate-y-1/2 transform rounded bg-black/50 px-2 py-1 text-sm text-white lg:hidden">
        {current} / {count}
      </div>

      {/* Mobile Interaction Buttons - Overlay on video */}
      <div className="absolute right-4 bottom-20 z-20 flex flex-col space-y-4 lg:hidden">
        {/* Profile Picture */}
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-xs font-bold text-white">
          {currentVideo?.username?.charAt(0).toUpperCase() || 'U'}
        </div>

        {/* Like Button */}
        <div className="flex flex-col items-center space-y-1">
          <Button
            variant="ghost"
            size="icon"
            className="mobile-nav-button h-10 w-10 text-white hover:bg-black/20"
          >
            <Heart className="h-5 w-5" />
          </Button>
          <span className="text-xs text-white">
            {currentVideo?.likes || '0'}
          </span>
        </div>

        {/* Comment Button */}
        <div className="flex flex-col items-center space-y-1">
          <Button
            variant="ghost"
            size="icon"
            className="mobile-nav-button h-10 w-10 text-white hover:bg-black/20"
          >
            <MessageCircle className="h-5 w-5" />
          </Button>
          <span className="text-xs text-white">
            {currentVideo?.comments || '0'}
          </span>
        </div>

        {/* Save Button */}
        <div className="flex flex-col items-center space-y-1">
          <Button
            variant="ghost"
            size="icon"
            className="mobile-nav-button h-10 w-10 text-white hover:bg-black/20"
          >
            <Bookmark className="h-5 w-5" />
          </Button>
          <span className="text-xs text-white">
            {currentVideo?.saves || '0'}
          </span>
        </div>

        {/* Share Button */}
        <div className="flex flex-col items-center space-y-1">
          <Button
            variant="ghost"
            size="icon"
            className="mobile-nav-button h-10 w-10 text-white hover:bg-black/20"
          >
            <Share className="h-5 w-5" />
          </Button>
          <span className="text-xs text-white">
            {currentVideo?.shares || '0'}
          </span>
        </div>
      </div>
    </MainLayout>
    // <div className="min-h-screen bg-black text-white mobile-video-container">
    //   {/* Mobile Header */}
    //   <div className="lg:hidden flex items-center justify-between p-4 bg-gray-900/95 backdrop-blur-sm z-30">
    //     <h1 className="text-xl font-bold text-white">TikTok</h1>
    //     <Button
    //       variant="ghost"
    //       size="icon"
    //       onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
    //       className="text-white mobile-nav-button"
    //     >
    //       {isMobileMenuOpen ? (
    //         <X className="w-6 h-6" />
    //       ) : (
    //         <Menu className="w-6 h-6" />
    //       )}
    //     </Button>
    //   </div>

    //   <div className="flex">
    //     {/* Left Sidebar - Hidden on mobile, shown on desktop */}
    //     <div
    //       className={`hidden lg:flex lg:w-64 bg-gray-900 flex-col ${
    //         isMobileMenuOpen ? "lg:flex" : ""
    //       }`}
    //     >
    //       {/* Logo */}
    //       <div className="p-6">
    //         <h1 className="text-2xl font-bold text-white">TikTok</h1>
    //       </div>

    //       {/* Search Bar */}
    //       <div className="px-6 mb-6">
    //         <div className="relative">
    //           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
    //           <input
    //             type="text"
    //             placeholder="Search"
    //             className="w-full bg-gray-800 text-white px-10 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-red-500"
    //           />
    //         </div>
    //       </div>

    //       {/* Navigation Links */}
    //       <nav className="flex-1 px-6">
    //         <ul className="space-y-2">
    //           <li>
    //             <a
    //               href="#"
    //               className="flex items-center space-x-3 text-red-500 font-semibold py-2"
    //             >
    //               <Home className="w-5 h-5" />
    //               <span>For You</span>
    //             </a>
    //           </li>
    //           <li>
    //             <a
    //               href="#"
    //               className="flex items-center space-x-3 text-white hover:text-gray-300 py-2"
    //             >
    //               <Compass className="w-5 h-5" />
    //               <span>Explore</span>
    //             </a>
    //           </li>
    //           <li>
    //             <a
    //               href="#"
    //               className="flex items-center space-x-3 text-white hover:text-gray-300 py-2"
    //             >
    //               <UserPlus className="w-5 h-5" />
    //               <span>Following</span>
    //             </a>
    //           </li>
    //           <li>
    //             <a
    //               href="#"
    //               className="flex items-center space-x-3 text-white hover:text-gray-300 py-2"
    //             >
    //               <Plus className="w-5 h-5" />
    //               <span>Upload</span>
    //             </a>
    //           </li>
    //           <li>
    //             <a
    //               href="#"
    //               className="flex items-center space-x-3 text-white hover:text-gray-300 py-2"
    //             >
    //               <Tv className="w-5 h-5" />
    //               <span>LIVE</span>
    //             </a>
    //           </li>
    //           <li>
    //             <a
    //               href="#"
    //               className="flex items-center space-x-3 text-white hover:text-gray-300 py-2"
    //             >
    //               <User className="w-5 h-5" />
    //               <span>Profile</span>
    //             </a>
    //           </li>
    //           <li>
    //             <a
    //               href="#"
    //               className="flex items-center space-x-3 text-white hover:text-gray-300 py-2"
    //             >
    //               <MoreHorizontal className="w-5 h-5" />
    //               <span>More</span>
    //             </a>
    //           </li>
    //         </ul>
    //       </nav>

    //       {/* Login Button */}
    //       <div className="p-6">
    //         <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
    //           Log in
    //         </Button>
    //       </div>

    //       {/* Footer */}
    //       <div className="p-6 text-xs text-gray-400 space-y-2">
    //         <div className="space-y-1">
    //           <div>Company</div>
    //           <div>Program</div>
    //           <div>Terms & Policies</div>
    //         </div>
    //         <div>© 2025 TikTok</div>
    //       </div>
    //     </div>

    //     {/* Mobile Menu Overlay */}
    //     {isMobileMenuOpen && (
    //       <div
    //         className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50"
    //         onClick={() => setIsMobileMenuOpen(false)}
    //       >
    //         <div
    //           className="w-64 h-full bg-gray-900 p-6"
    //           onClick={(e) => e.stopPropagation()}
    //         >
    //           <div className="flex items-center justify-between mb-6">
    //             <h1 className="text-xl font-bold text-white">TikTok</h1>
    //             <Button
    //               variant="ghost"
    //               size="icon"
    //               onClick={() => setIsMobileMenuOpen(false)}
    //               className="text-white"
    //             >
    //               <X className="w-6 h-6" />
    //             </Button>
    //           </div>

    //           {/* Mobile Search */}
    //           <div className="mb-6">
    //             <div className="relative">
    //               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
    //               <input
    //                 type="text"
    //                 placeholder="Search"
    //                 className="w-full bg-gray-800 text-white px-10 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-red-500"
    //               />
    //             </div>
    //           </div>

    //           {/* Mobile Navigation */}
    //           <nav className="mb-6">
    //             <ul className="space-y-2">
    //               <li>
    //                 <a
    //                   href="#"
    //                   className="flex items-center space-x-3 text-red-500 font-semibold py-2"
    //                 >
    //                   <Home className="w-5 h-5" />
    //                   <span>For You</span>
    //                 </a>
    //               </li>
    //               <li>
    //                 <a
    //                   href="#"
    //                   className="flex items-center space-x-3 text-white hover:text-gray-300 py-2"
    //                 >
    //                   <Compass className="w-5 h-5" />
    //                   <span>Explore</span>
    //                 </a>
    //               </li>
    //               <li>
    //                 <a
    //                   href="#"
    //                   className="flex items-center space-x-3 text-white hover:text-gray-300 py-2"
    //                 >
    //                   <UserPlus className="w-5 h-5" />
    //                   <span>Following</span>
    //                 </a>
    //               </li>
    //               <li>
    //                 <a
    //                   href="#"
    //                   className="flex items-center space-x-3 text-white hover:text-gray-300 py-2"
    //                 >
    //                   <Plus className="w-5 h-5" />
    //                   <span>Upload</span>
    //                 </a>
    //               </li>
    //               <li>
    //                 <a
    //                   href="#"
    //                   className="flex items-center space-x-3 text-white hover:text-gray-300 py-2"
    //                 >
    //                   <Tv className="w-5 h-5" />
    //                   <span>LIVE</span>
    //                 </a>
    //               </li>
    //               <li>
    //                 <a
    //                   href="#"
    //                   className="flex items-center space-x-3 text-white hover:text-gray-300 py-2"
    //                 >
    //                   <User className="w-5 h-5" />
    //                   <span>Profile</span>
    //                 </a>
    //               </li>
    //             </ul>
    //           </nav>

    //           <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
    //             Log in
    //           </Button>
    //         </div>
    //       </div>
    //     )}

    //     {/* Main Content Area */}

    //   </div>
    // </div>
  );
};

export default FeedPage;
