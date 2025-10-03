'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import MainLayout from '@/components/layout/main-content';
import {
  Edit,
  Eye,
  ImageDown,
  ListVideo,
  Share,
  Table,
  User,
  Video,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAppSelector } from '@/store/hooks';
import { useState } from 'react';

const UserProfileMePage = () => {
  const { login } = useAppSelector((state) => state.auth);
  const [selectedTab, setSelectedTab] = useState('all');

  return (
    <MainLayout>
      <div className="flex flex-col space-y-6 px-0 py-6 sm:px-6 sm:py-8 lg:space-y-8 lg:px-10 lg:py-10">
        {/* Cover & Profile Info */}
        <div
          className="relative h-60 w-full bg-contain bg-center md:h-80"
          style={{ backgroundImage: "url('/assets/images/cover-10.png')" }}
        >
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute bottom-[-40px] left-4 flex items-end gap-3 sm:bottom-[-48px] sm:gap-4">
            <div className="relative h-32 w-32">
              <Image
                src="/assets/images/cover-10.png"
                alt="Profile"
                fill
                className="rounded-full border-4 border-black object-cover"
              />
            </div>
            <div>
              <h1 className="text-lg font-semibold sm:text-xl">
                {login?.fullName}
              </h1>
              <p className="text-muted-foreground text-xs sm:text-sm">
                {login?.email}
              </p>
            </div>
          </div>
        </div>

        {/* Stats & Actions */}
        <div className="mt-12 flex flex-col gap-4 px-4 sm:mt-16 sm:px-6 md:flex-row md:items-center md:justify-between md:px-8">
          {/* Stats */}
          <div className="flex w-full justify-around gap-6 sm:gap-12 md:w-auto lg:gap-20">
            <div className="text-center">
              <p className="text-2xl font-bold sm:text-3xl">5</p>
              <p className="text-muted-foreground text-[10px] sm:text-xs">
                Posts
              </p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold sm:text-3xl">24.9k</p>
              <p className="text-muted-foreground text-[10px] sm:text-xs">
                Followers
              </p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold sm:text-3xl">783</p>
              <p className="text-muted-foreground text-[10px] sm:text-xs">
                Following
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
            <Button
              variant="ghost"
              className="h-13 w-full rounded-full bg-[#302930] sm:w-auto"
            >
              <Edit /> Edit Profile
            </Button>
            <Button
              variant="ghost"
              className="h-13 w-full rounded-full bg-[#302930] sm:w-auto"
            >
              <Share /> Share Profile
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-0 px-4 md:px-8">
          <Tabs
            value={selectedTab}
            onValueChange={(value) => setSelectedTab(value)}
            className="w-full"
          >
            <TabsList
              className={cn(
                'flex h-12 w-full items-center gap-2 overflow-x-auto rounded-full bg-transparent sm:h-14 sm:gap-4'
              )}
            >
              {[
                { name: 'all', Icon: Table },
                { name: 'videos', Icon: Video },
                { name: 'photos', Icon: ImageDown },
                { name: 'live', Icon: ListVideo },
              ].map((item: any) => {
                return (
                  <TabsTrigger
                    key={item.name}
                    className={cn(
                      'flex cursor-pointer items-center gap-1 rounded-full px-3 py-2 text-xs sm:px-4 sm:py-2 sm:text-sm',
                      selectedTab === item.name
                        ? 'bg-[linear-gradient(105deg,#FE39F0_0%,#EE003F_100%)]'
                        : 'bg-[#302930]'
                    )}
                    value={item.name}
                  >
                    <item.Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                    {item.name.toUpperCase()}
                  </TabsTrigger>
                );
              })}
            </TabsList>

            <TabsContent value="all">
              <PostGrid />
            </TabsContent>
            <TabsContent value="videos">
              <PostGrid />
            </TabsContent>
            <TabsContent value="photos">
              <PostGrid />
            </TabsContent>
            <TabsContent value="live">
              <PostGrid />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
};

// Post Grid (Reusable for all tabs)
function PostGrid() {
  const posts = [
    {
      id: 1,
      image: '/assets/images/cover-1.png',
      views: 1203,
      live: true,
      category: 'Beauty & Fashion',
    },
    {
      id: 2,
      image: '/assets/images/cover-2.png',
      views: 1203,
      live: false,
      category: 'Beauty & Fashion',
    },
    {
      id: 3,
      image: '/assets/images/cover-3.png',
      views: 1203,
      live: false,
      category: 'Beauty & Fashion',
    },
    {
      id: 4,
      image: '/assets/images/cover-4.png',
      views: 1203,
      live: false,
      category: 'Beauty & Fashion',
    },
  ];

  return (
    <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-4 md:grid-cols-4">
      {posts.map((post) => (
        <Card
          key={post.id}
          // className="relative cursor-pointer overflow-hidden border-none bg-[#1A1A1A] py-0"
          className={cn(
            'group relative h-48 cursor-pointer rounded-xl py-0 transition-all duration-300 ease-in-out sm:h-56 sm:rounded-2xl lg:h-[380px]',
            'hover:scale-[1.02] hover:shadow-lg hover:shadow-black/20',
            'focus-within:ring-primary-500 focus-within:ring-2 focus-within:ring-offset-2',
            'touch-manipulation active:scale-[0.98]' // Better mobile touch feedback
          )}
        >
          <CardContent className="p-0">
            <div className="relative aspect-[3/4] w-full">
              <Image
                src={post.image}
                alt="Post"
                fill
                className="object-cover"
              />
              <div className="absolute top-2 left-2 flex gap-1">
                {post.live && <Badge variant="destructive">LIVE</Badge>}
                <Badge className="max-w-[70%] truncate bg-[linear-gradient(105deg,#57A7FF_0%,#04FF00_100%)] px-2 py-2 text-[10px] text-[#251E25] backdrop-blur-sm sm:text-[12px]">
                  <User
                    className="h-2.5 w-2.5 text-pink-500 sm:!h-4 sm:!w-4"
                    fill="currentColor"
                  />
                  {post.category}
                </Badge>
              </div>
              <Badge className="absolute bottom-2 left-2 rounded bg-black/60 px-2 py-0.5 text-[10px] text-white sm:text-sm">
                <Eye className="h-2.5 w-2.5 sm:!h-6 sm:!w-6" />
                {post.views}
              </Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default UserProfileMePage;
