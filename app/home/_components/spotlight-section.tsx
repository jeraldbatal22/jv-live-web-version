'use client';

import React, { Fragment } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import CardCover from '@/components/card-cover';
import { ChevronRightIcon } from 'lucide-react';

interface SpotlightSectionProps {
  data: any;
}

const SpotlightSection = ({ data }: SpotlightSectionProps) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h3 className="md:text-title-sm py-3 text-xl md:py-5">Spotlight</h3>
        <button className="text-primary-500 hover:text-primary-400 flex items-center gap-1 sm:gap-2">
          <ChevronRightIcon className="h-3 w-3 sm:h-4 sm:w-4" />
        </button>
      </div>
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
      >
        <CarouselContent>
          {data.map((item: any) => {
            return (
              <Fragment key={item.id}>
                <CarouselItem className="basis-2/4 md:basis-1/5">
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
