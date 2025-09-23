'use client';

import React from 'react';
import { UseFormRegister, FieldErrors, UseFormWatch, UseFormSetValue } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { CreateAccountFormData } from '@/lib/validations/auth';
// import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import DatePicker from '@/components/ui/date-picker';

interface YourDetailsProps {
  register: UseFormRegister<CreateAccountFormData>;
  errors: FieldErrors<CreateAccountFormData>;
  watch: UseFormWatch<CreateAccountFormData>;
  setValue: UseFormSetValue<CreateAccountFormData>;
  isSubmitting: boolean;
}

const YourDetails = ({ register, errors, watch, setValue, isSubmitting }: YourDetailsProps) => {
  // const router = useRouter();

  return (
    <div className="space-y-5">
      <div className="space-y-2 text-start">
        <h1 className="text-2xl font-bold text-white uppercase sm:text-3xl">
          YOUR DETAILS
        </h1>
        <p className="text-sm text-gray-400 sm:text-base">
          Create your account to share unforgettable moments and explore
          livestreams from all over the world.
        </p>
      </div>

      <div className="space-y-6">
        {/* Username field */}
        <div className="space-y-2">
          <Label
            htmlFor="username"
            className="text-sm font-medium text-white uppercase"
          >
            USERNAME
          </Label>
          <Input
            id="username"
            type="text"
            placeholder="Enter username"
            className="h-12 rounded-full border-none bg-gray-800 text-white placeholder:text-gray-400 focus:border-pink-400 focus:ring-pink-400/20"
            {...register('username')}
          />
          {errors.username && (
            <p className="text-sm text-red-400">{errors.username.message}</p>
          )}
        </div>

        {/* First Name field */}
        <div className="space-y-2">
          <Label
            htmlFor="firstName"
            className="text-sm font-medium text-white uppercase"
          >
            FIRST NAME
          </Label>
          <Input
            id="firstName"
            type="text"
            placeholder="Enter first name"
            className="h-12 rounded-full border-none bg-gray-800 text-white placeholder:text-gray-400 focus:border-pink-400 focus:ring-pink-400/20"
            {...register('firstName')}
          />
          {errors.firstName && (
            <p className="text-sm text-red-400">{errors.firstName.message}</p>
          )}
        </div>

        {/* Last Name field */}
        <div className="space-y-2">
          <Label
            htmlFor="lastName"
            className="text-sm font-medium text-white uppercase"
          >
            LAST NAME
          </Label>
          <Input
            id="lastName"
            type="text"
            placeholder="Enter last name"
            className="h-12 rounded-full border-none bg-gray-800 text-white placeholder:text-gray-400 focus:border-pink-400 focus:ring-pink-400/20"
            {...register('lastName')}
          />
          {errors.lastName && (
            <p className="text-sm text-red-400">{errors.lastName.message}</p>
          )}
        </div>

        {/* Middle Name field */}
        <div className="space-y-2">
          <Label
            htmlFor="middleName"
            className="text-sm font-medium text-white uppercase"
          >
            MIDDLE NAME
          </Label>
          <Input
            id="middleName"
            type="text"
            placeholder="Enter middle name (optional)"
            className="h-12 rounded-full border-none bg-gray-800 text-white placeholder:text-gray-400 focus:border-pink-400 focus:ring-pink-400/20"
            {...register('middleName')}
          />
          {errors.middleName && (
            <p className="text-sm text-red-400">{errors.middleName.message}</p>
          )}
        </div>

        {/* Birthday field */}
        <div className="space-y-2">
          <DatePicker
            value={watch('birthday') ? new Date(watch('birthday')) : undefined}
            onChange={(date) => setValue('birthday', date?.toISOString() || '')}
            label="BIRTHDAY"
            placeholder="MM/DD/YY"
            className='text-sm'
            inputClassName="h-12 border-none rounded-full"
          />
          {errors.birthday && (
            <p className="text-sm text-red-400">{errors.birthday.message}</p>
          )}
        </div>

        {/* Gender field */}
        <div className="space-y-2">
          <Label
            htmlFor="gender"
            className="text-sm font-medium text-white uppercase"
          >
            GENDER
          </Label>
          <Select 
            value={watch('gender') || ''}
            onValueChange={(value) => setValue('gender', value)}
          >
            <SelectTrigger className="!h-12 w-full rounded-full border-none bg-gray-800 px-4 text-white focus:border-pink-400 focus:ring-pink-400/20 focus:outline-none">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
            </SelectContent>
          </Select>
          {errors.gender && (
            <p className="text-sm text-red-400">{errors.gender.message}</p>
          )}
        </div>

        {/* Done button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-12 w-full transform rounded-full bg-[linear-gradient(105deg,#FE39F0_0%,#EE003F_100%)] text-lg font-bold text-white transition-all duration-200 hover:scale-[1.02] hover:from-pink-600 hover:to-pink-500 disabled:transform-none disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? 'CREATING ACCOUNT...' : 'DONE'}
        </Button>
      </div>
    </div>
  );
};

export default YourDetails;
