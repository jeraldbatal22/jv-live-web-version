'use client';

import React, { Fragment, useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import CardCover from '@/components/common/card-cover';
import { ChevronRightIcon } from 'lucide-react';
import CATEGORIES_MOCK_DATA from '@/mock/categories-data';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface BrowseByCategorySectionProps {
  data: any;
}

const BrowseByCategorySection = ({ data }: BrowseByCategorySectionProps) => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const toggleInterest = (interestId: string) => {
    const newInterests = selectedInterests.includes(interestId)
      ? selectedInterests.filter((id) => id !== interestId)
      : [...selectedInterests, interestId];

    setSelectedInterests(newInterests);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between px-1 sm:px-0">
        <h3 className="pt-3 text-lg sm:text-xl md:text-title-sm md:pt-5">
          Browse By Category
        </h3>
        <button className="flex items-center gap-1 text-primary-500 hover:text-primary-400 sm:gap-2">
          <ChevronRightIcon className="h-3 w-3 sm:h-4 sm:w-4" />
        </button>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-3 md:gap-4">
        {CATEGORIES_MOCK_DATA.map((category) => {
          const isSelected = selectedInterests.includes(category.id);

          return (
            <Button
              key={category.id}
              variant="ghost"
              onClick={() => toggleInterest(category.id)}
              className={`flex h-9 items-center justify-center space-x-2 rounded-full transition-all duration-200 sm:h-10 md:h-11 ${
                isSelected
                  ? 'border-green-500 bg-[linear-gradient(105deg,#57A7FF_0%,#04FF00_100%)] text-black'
                  : 'border-gray-600 bg-[#302930] text-gray-400 hover:border-gray-500 hover:text-gray-300'
              }`}
            >
              <Image
                src={category.icon}
                alt={category.name}
                width={18}
                height={18}
                className={`text-red-500 ${isSelected ? '!text-white' : '!text-gray-400'}`}
              />
              <span className="text-center text-xs font-medium sm:text-sm md:text-base">
                {category.name}
              </span>
            </Button>
          );
        })}
      </div>
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {data.map((item: any) => {
            return (
              <Fragment key={item.id}>
                <CarouselItem className="basis-2/3 sm:basis-1/2 md:basis-1/3 lg:basis-1/5 pl-2 md:pl-4">
                  <CardCover
                    id={item.id}
                    coverImageUrl={item.coverImageUrl}
                    title={item.title}
                    countViews={item.countViews}
                    category={item.category}
                  />
                </CarouselItem>
              </Fragment>
            );
          })}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default BrowseByCategorySection;
