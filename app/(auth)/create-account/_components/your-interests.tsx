'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useFormContext } from 'react-hook-form';
import { CreateAccountFormData } from '@/lib/validations/auth';
// import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import CATEGORIES_MOCK_DATA from '@/mock/categories-data';

interface YourInterestsProps {
  onHandleChangeTab: () => void;
  onHandlePreviousTab?: () => void;
}

const YourInterests = ({ onHandleChangeTab, onHandlePreviousTab }: YourInterestsProps) => {
  const { setValue, watch, trigger, formState: { errors } } = useFormContext<CreateAccountFormData>();
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Sync local state with form state
  useEffect(() => {
    const formInterests = watch('interests') || [];
    setSelectedInterests(formInterests);
  }, [watch]);

  const toggleInterest = (interestId: string) => {
    const newInterests = selectedInterests.includes(interestId)
      ? selectedInterests.filter((id) => id !== interestId)
      : [...selectedInterests, interestId];
    
    setSelectedInterests(newInterests);
    setValue('interests', newInterests);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const isValid = await trigger('interests');
      if (!isValid) {
        return;
      }
      // TODO: Implement actual interest selection logic
      console.log('Selected interests:', selectedInterests);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onHandleChangeTab();
    } catch (error) {
      console.error('Error saving interests:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with back button and skip */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={onHandlePreviousTab}
          className="p-2 text-white hover:text-gray-300"
        >
          {/* <ArrowLeft className="h-5 w-5" /> */}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onHandleChangeTab}
          className="text-sm font-medium text-white hover:text-gray-300"
        >
          SKIP
        </Button>
      </div>

      {/* Title and description */}
      <div className="space-y-2 text-center">
        <h1 className="text-xl font-bold text-white uppercase sm:text-3xl">
          YOUR INTERESTS
        </h1>
        <p className="text-xs text-gray-400 sm:text-base">
          Select categories you&apos;d love to explore. This helps us
          personalize your experience and recommend the best livestreams.
        </p>
      </div>

      {/* Interest categories grid */}
      <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:gap-4">
        {CATEGORIES_MOCK_DATA.map((category) => {
          const isSelected = selectedInterests.includes(category.id);
          return (
            <Button
              key={category.id}
              variant="ghost"
              onClick={() => toggleInterest(category.id)}
              className={`flex h-10 sm:h-[44px] items-center justify-center space-x-2 rounded-full transition-all duration-200 ${
                isSelected
                  ? 'border-green-500 bg-[linear-gradient(105deg,#57A7FF_0%,#04FF00_100%)] text-black'
                  : 'border-gray-600 bg-[#302930] text-gray-400 hover:border-gray-500 hover:text-gray-300'
              }`}
            >
              <Image
                src={category.icon}
                alt={category.name}
              width={20}
              height={20}
                className={`text-red-500 ${isSelected ? '!text-white' : '!text-gray-400'}`}
              />
              <span className="text-center text-sm sm:text-lg font-medium">
                {category.name}
              </span>
            </Button>
          );
        })}
      </div>

      {/* Error message for interests */}
      {errors.interests && (
        <p className="text-sm text-red-400 text-center">
          {errors.interests.message}
        </p>
      )}

      {/* Continue button */}
      <Button
        onClick={handleSubmit}
        disabled={isLoading || selectedInterests.length === 0}
        className="h-11 sm:h-12 w-full transform rounded-lg bg-[linear-gradient(105deg,#FE39F0_0%,#EE003F_100%)] text-base sm:text-lg font-bold text-white transition-all duration-200 hover:scale-[1.02] hover:from-pink-600 hover:to-pink-500 disabled:transform-none disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isLoading ? 'SAVING...' : 'CONTINUE'}
      </Button>
    </div>
  );
};

export default YourInterests;
