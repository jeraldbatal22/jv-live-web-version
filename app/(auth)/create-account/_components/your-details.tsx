'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { CreateAccountFormData } from '@/lib/validations/auth';
import { Input } from '@/components/ui/input';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import DatePicker from '@/components/ui/date-picker';

interface YourDetailsProps {
  isSubmitting: boolean;
}

const YourDetails = ({ isSubmitting }: YourDetailsProps) => {
  const { control } = useFormContext<CreateAccountFormData>();

  return (
    <div className="space-y-5">
      <div className="space-y-2 text-start">
        <h1 className="text-xl font-bold text-white uppercase sm:text-3xl">
          YOUR DETAILS
        </h1>
        <p className="text-xs text-gray-400 sm:text-base">
          Create your account to share unforgettable moments and explore
          livestreams from all over the world.
        </p>
      </div>

      <div className="space-y-4 sm:space-y-6">
        <FormField
          control={control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs sm:text-sm font-medium text-white uppercase">USERNAME</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter username"
                  className="h-12 rounded-full border-none bg-gray-800 text-white placeholder:text-gray-400 focus:border-pink-400 focus:ring-pink-400/20"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs sm:text-sm font-medium text-white uppercase">FIRST NAME</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter first name"
                  className="h-12 rounded-full border-none bg-gray-800 text-white placeholder:text-gray-400 focus:border-pink-400 focus:ring-pink-400/20"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs sm:text-sm font-medium text-white uppercase">LAST NAME</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter last name"
                  className="h-12 rounded-full border-none bg-gray-800 text-white placeholder:text-gray-400 focus:border-pink-400 focus:ring-pink-400/20"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="middleName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs sm:text-sm font-medium text-white uppercase">MIDDLE NAME</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter middle name (optional)"
                  className="h-12 rounded-full border-none bg-gray-800 text-white placeholder:text-gray-400 focus:border-pink-400 focus:ring-pink-400/20"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="birthday"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs sm:text-sm font-medium text-white uppercase">BIRTHDAY</FormLabel>
              <FormControl>
                <DatePicker
                  value={field.value ? new Date(field.value) : undefined}
                  onChange={(date) => field.onChange(date?.toISOString() || '')}
                  placeholder="MM/DD/YYYY"
                  className='text-sm'
                  inputClassName="h-12 border-none rounded-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs sm:text-sm font-medium text-white uppercase">GENDER</FormLabel>
              <FormControl>
                <Select value={field.value || ''} onValueChange={field.onChange}>
                  <SelectTrigger className="!h-12 w-full rounded-full border-none bg-gray-800 px-4 text-white focus:border-pink-400 focus:ring-pink-400/20 focus:outline-none">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-11 sm:h-12 w-full transform rounded-full bg-[linear-gradient(105deg,#FE39F0_0%,#EE003F_100%)] text-base sm:text-lg font-bold text-white transition-all duration-200 hover:scale-[1.02] hover:from-pink-600 hover:to-pink-500 disabled:transform-none disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? 'CREATING ACCOUNT...' : 'DONE'}
        </Button>
      </div>
    </div>
  );
};

export default YourDetails;
