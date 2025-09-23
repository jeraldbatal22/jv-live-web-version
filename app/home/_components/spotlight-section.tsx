'use client';

import React, { Fragment } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import CardCover from '@/components/common/card-cover';
import { ChevronRightIcon } from 'lucide-react';

interface SpotlightSectionProps {
  data: any;
}

const SpotlightSection = ({ data }: SpotlightSectionProps) => {
  return (
    <div>
      <div className="flex items-center justify-between px-1 sm:px-0">
        <h3 className="py-3 text-lg sm:text-xl md:text-title-sm md:py-5">Spotlight</h3>
        <button className="flex items-center gap-1 text-primary-500 hover:text-primary-400 sm:gap-2">
          <ChevronRightIcon className="h-3 w-3 sm:h-4 sm:w-4" />
        </button>
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

export default SpotlightSection;
