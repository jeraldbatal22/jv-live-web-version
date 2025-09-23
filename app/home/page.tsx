import React from 'react';
// import MainLayout from '@/components/common/layout';
// import ErrorBoundary from '@/components/common/error-boundary';
import MainLayout from '@/components/layout/main-content';
import RECOMMENDED_MOCK_DATA from '@/mock/recommended-data';
import TRENDING_FOR_YOU_MOCK_DATA from '@/mock/trending-for-you-data';
import USERS_MOCK_DATA from '@/mock/mock-user';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import SpotlightSection from './_components/spotlight-section';
import TopLiveSectionSection from './_components/top-lives-section';
import BrowseByCategorySection from './_components/browse-by-category-section';
import { Signal } from 'lucide-react';
import { Label } from '@radix-ui/react-label';
// import { tmdbService } from '@/lib/api/tmdb';
// import { I_DISCOVER_PAGE_DATA } from '@/lib/api/types';
// import {
//   HeroSectionSkeleton,
//   SectionSkeleton,
// } from '@/components/common/loading-skeleton';

// Data fetching function
// async function getDiscoverPageData(): Promise<I_DISCOVER_PAGE_DATA> {
//   try {
//     return await tmdbService.getDiscoverPageData();
//   } catch (error) {
//     console.error('Error fetching discover page data:', error);
//     throw new Error('Failed to fetch movie data. Please try again later.');
//   }
// }

// Main page component
const DiscoverPage = () => {
  // let data: I_DISCOVER_PAGE_DATA;

  // try {
  //   data = await getDiscoverPageData();
  // } catch (error) {
  //   // If data fetching fails, we'll let the error boundary handle it
  //   throw error;
  // }

  return (
    <MainLayout>
      <div className="flex flex-col space-y-6 px-4 py-6 sm:px-6 sm:py-8 lg:space-y-8 lg:px-10 lg:py-10">
        {/* Cast Section */}
        <div>
          <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto sm:gap-4 md:gap-6">
            {USERS_MOCK_DATA.map((actor, index) => (
              <div
                key={index}
                className="flex-shrink-0 snap-start cursor-pointer text-center"
              >
                <div className="relative object-cover transition-all duration-300 ease-in-out hover:scale-105">
                  <Avatar className="mx-auto mb-1 h-12 w-12 border-4 border-pink-500 sm:mb-2 sm:h-16 sm:w-16 md:mb-3 md:h-20 md:w-20 lg:h-24 lg:w-24">
                    <AvatarImage src={actor.image} alt={actor.name} />
                    <AvatarFallback>
                      {actor.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-2.5 right-1/2 z-10 flex translate-x-1/2 items-center gap-0.5 rounded-md bg-[linear-gradient(105deg,#FE39F0_0%,#EE003F_100%)] px-1.5 py-0.5 backdrop-blur-sm sm:gap-1 sm:px-2 sm:py-1">
                    <Signal
                      className="h-2.5 w-2.5 sm:!h-4 sm:!w-4"
                      fill="currentColor"
                    />
                    <Label className="text-[10px] font-medium text-white sm:text-[14px]">
                      Live
                    </Label>
                  </div>
                </div>
                <p className="text-xs font-medium sm:text-sm">{actor.name}</p>
              </div>
            ))}
          </div>
        </div>
        {/* TRENDING MOVIES SECTION */}
        <div className="">
          <SpotlightSection data={RECOMMENDED_MOCK_DATA || []} />
          <TopLiveSectionSection data={TRENDING_FOR_YOU_MOCK_DATA || []} />
          <BrowseByCategorySection data={RECOMMENDED_MOCK_DATA || []} />
        </div>
        {/* TRENDING STORIES SECTION */}
        {/* <TrendingStoriesSection data={TRENDING_FOR_YOU_MOCK_DATA || []} /> */}
        {/* 
        <ErrorBoundary>
          <Suspense
            fallback={<SectionSkeleton />}
          >
            <SpotlightSection data={RECOMMENDED_MOCK_DATA || []} />
          </Suspense>
        </ErrorBoundary>


        <ErrorBoundary>
          <Suspense
            fallback={
              <div className="h-32 animate-pulse rounded-lg bg-gray-200" />
            }
          >
            <TrendingStoriesSection data={TRENDING_FOR_YOU_MOCK_DATA || []} />
          </Suspense>
        </ErrorBoundary> */}
      </div>
    </MainLayout>
  );
};

export default DiscoverPage;
