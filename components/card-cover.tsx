import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Eye, Signal, User } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState, useCallback, useMemo } from 'react';

interface CardCoverPropTypes {
  coverImageUrl: string;
  title: string;
  description?: string;
  countViews: string | number;
  onClick?: () => void;
  className?: string;
  id: string;
  category: string;
}

const CardCover = React.memo<CardCoverPropTypes>(
  ({
    id,
    coverImageUrl,
    title,
    description = 'Construction worker Mike is thrust into the world of espionage when his high school sweetheart, Roxanne, recruits him for a high-stakes intelligence mission.',
    onClick,
    className,
    countViews,
    category,
  }) => {
    const [isHovered, setIsHovered] = useState(false);
    const router = useRouter();
    // Memoize computed values
    const displayDescription = useMemo(() => {
      if (!description) return '';
      // Shorter description for better mobile readability
      const isTruncated = description.length > 70;
      return isTruncated ? description.slice(0, 70) + '...' : description;
    }, [description]);

    const handleMouseEnter = useCallback(() => {
      setIsHovered(true);
    }, []);

    const handleMouseLeave = useCallback(() => {
      setIsHovered(false);
    }, []);

    const handleTouchStart = useCallback(() => {
      setIsHovered(true);
    }, []);

    const handleTouchEnd = useCallback(() => {
      // Delay hiding hover state on mobile to allow for better UX
      setTimeout(() => setIsHovered(false), 2000);
    }, []);

    const handleCardClick = useCallback(() => {
      if (onClick) {
        return onClick?.();
      } else {
        router.push(`/movies/${id}`);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [onClick, id]);

    return (
      <div
        className={cn(
          'group relative h-52 cursor-pointer rounded-2xl transition-all duration-300 ease-in-out sm:h-48 lg:h-[380px]',
          'hover:scale-[1.02] hover:shadow-lg hover:shadow-black/20',
          'focus-within:ring-primary-500 focus-within:ring-2 focus-within:ring-offset-2',
          'touch-manipulation active:scale-[0.98]', // Better mobile touch feedback
          className
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onClick={handleCardClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleCardClick();
          }
        }}
        aria-label={`View details for ${title}`}
      >
        {/* Live Badge */}
        <div className="absolute top-1.5 left-1.5 z-10 flex items-center gap-0.5 rounded-md bg-[linear-gradient(105deg,#FE39F0_0%,#EE003F_100%)] px-1.5 py-0.5 backdrop-blur-sm sm:top-2 sm:left-2 sm:gap-1 sm:px-2 sm:py-1">
          <Signal className="h-2.5 w-2.5 sm:!h-5 sm:!w-5" fill="currentColor" />
          <Label className="text-[10px] font-medium text-white sm:text-lg">
            Live
          </Label>
        </div>

        {/* Viewers Count Badge */}
        <div className="absolute top-1.5 right-1.5 z-10 flex flex-col items-end gap-0.5 sm:top-2 sm:gap-3 sm:px-2 sm:py-1">
          <div className="flex items-center gap-1 rounded-md bg-gray-800 px-2 py-1 backdrop-blur-sm">
            <Eye className="h-2.5 w-2.5 sm:!h-6 sm:!w-6" />
            <Label className="text-[10px] text-gray-400 sm:text-lg">
              {countViews}
            </Label>
          </div>
          <div className="flex items-center gap-1 rounded-full bg-[linear-gradient(105deg,#57A7FF_0%,#04FF00_100%)] px-2 py-2 backdrop-blur-sm">
            <User
              className="h-2.5 w-2.5 text-pink-500 sm:!h-4 sm:!w-4"
              fill="currentColor"
            />
            <Label className="text-[10px] text-[#251E25] sm:text-[12px]">
              {category}
            </Label>
          </div>
        </div>

        {/* Category Badge Image */}
        <div className="relative h-full w-full overflow-hidden rounded-2xl">
          <Image
            src={coverImageUrl}
            alt={`${title} cover image`}
            fill
            className={cn(
              'object-cover transition-all duration-300 ease-in-out',
              isHovered && 'scale-105 blur-[1px]'
            )}
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
            priority={false}
          />
          {/* Overlay for better text readability */}
        </div>

        {isHovered && <div className="absolute inset-0 backdrop-blur-sm" />}

        {/* Card Content */}
        <Card className="absolute inset-0 !flex flex-col justify-evenly rounded-lg border-0 bg-transparent py-0 shadow-none">
          <CardHeader className="flex-1"></CardHeader>
          {/* Hover Description */}
          {isHovered && (
            <CardContent className="z-10 flex flex-1 items-center justify-center p-0">
              <div className="text-center">
                <Label className="cursor-pointer px-1 text-[10px] leading-relaxed text-white sm:px-2 sm:text-xs">
                  {displayDescription}
                </Label>
              </div>
            </CardContent>
          )}

          {/* Footer with Title and Genres */}
          <CardFooter className="z-10 p-2 backdrop-blur-xs sm:p-3">
            <div className="w-full space-y-0.5 text-start sm:space-y-1">
              <Label className="line-clamp-1 block cursor-pointer text-xs font-semibold text-white sm:text-lg">
                {title}
              </Label>
            </div>
          </CardFooter>
        </Card>
      </div>
    );
  }
);

CardCover.displayName = 'CardCover';

export default CardCover;
