'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { registerSchema, type RegisterFormData } from '@/lib/validations/auth';
import Image from 'next/image';
import { Checkbox } from '@/components/ui/checkbox';
import { useRouter } from 'next/navigation';

const RegisterPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      isAcceptTermsAndPrivacy: false,
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      // TODO: Implement actual register logic
      console.log('Register data:', data);
      router.push('/create-account');
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Register error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // const handleSocialRegister = (provider: 'facebook' | 'google' | 'apple') => {
  //   console.log(`Register with ${provider}`);
  //   // TODO: Implement social register logic
  // };

  return (
    <div className="flex min-h-screen flex-col text-white">
      {/* Header with back button */}
      <div className="flex items-start justify-between p-4 sm:p-6">
        <Link
          href="/"
          className="flex items-center text-green-400 transition-colors hover:text-green-300"
        >
          <ArrowLeft className="h-6 w-6" />
        </Link>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col items-center justify-center px-4 pb-8 sm:px-6">
        <div className="w-full max-w-md space-y-8">
          {/* Title section */}
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-wider text-white uppercase sm:text-4xl">
              REGISTER
            </h1>
            <p className="text-sm text-gray-400 sm:text-base">
              Register to continue streaming, connecting, and exploring.
            </p>
            <p className="text-sm text-gray-400 sm:text-base">
              Your audience is waiting!
            </p>
          </div>

          {/* Logo */}
          <div className="flex justify-center">
            <Image
              src="/assets/images/logo.png"
              alt="logo"
              height={150}
              width={150}
            />
          </div>

          {/* Register form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email field */}
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-white uppercase"
              >
                EMAIL
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter email address"
                className="h-12 rounded-full border-none bg-gray-800 text-white placeholder:text-gray-400 focus:border-pink-400 focus:ring-pink-400/20"
                {...register('email')}
              />
              {errors.email && (
                <p className="text-sm text-red-400">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Controller
                  name="isAcceptTermsAndPrivacy"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      id="terms"
                      checked={!!field.value}
                      onCheckedChange={(checked) => field.onChange(Boolean(checked))}
                    />
                  )}
                />
                <Label htmlFor="terms">
                  I Accept the{' '}
                  <Link href="" className="!text-green-500">
                    Terms of Use
                  </Link>{' '}
                  and{' '}
                  <Link href="" className="!text-green-500">
                    Privacy Policy
                  </Link>
                </Label>
              </div>
              {errors.isAcceptTermsAndPrivacy && (
                <p className="text-sm text-red-400">
                  {errors.isAcceptTermsAndPrivacy.message}
                </p>
              )}
            </div>

            {/* Register button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="h-12 w-full transform rounded-lg bg-[linear-gradient(105deg,#FE39F0_0%,#EE003F_100%)] text-lg font-bold text-white transition-all duration-200 hover:scale-[1.02] hover:from-pink-600 hover:to-pink-500 disabled:transform-none disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? 'REGISTERING...' : 'REGISTER'}
            </Button>
          </form>

          {/* Social register section */}
          <div className="space-y-4">
            {/* Divider */}
            <div className="flex items-center">
              <div className="flex-1 border-t-2 border-gray-700"></div>
              <span className="flex-1 pl-6 text-gray-400">
                Or Register using
              </span>
              <div className="flex-1 border-t-2 border-gray-700"></div>
            </div>

            {/* Social register buttons */}
            <div className="flex gap-4">
              <Button
                variant="ghost"
                className="bg-gray-transparent flex h-[62px] flex-1 items-center justify-center rounded-2xl border-1"
              >
                <Image
                  src="/assets/icons/svg/google-icon.svg"
                  height={35}
                  width={35}
                  alt="google-icon"
                />
              </Button>
              <Button
                variant="ghost"
                className="bg-gray-transparent flex h-[62px] flex-1 items-center justify-center rounded-2xl border-1"
              >
                <Image
                  src="/assets/icons/svg/apple-icon.svg"
                  height={35}
                  width={35}
                  alt="apple-icon"
                />
              </Button>
              <Button
                variant="ghost"
                className="bg-gray-transparent flex h-[62px] flex-1 items-center justify-center rounded-2xl border-1"
              >
                <Image
                  src="/assets/icons/svg/facebook-icon.svg"
                  height={35}
                  width={35}
                  alt="facebook-icon"
                />
              </Button>
            </div>
          </div>

          {/* Login link */}
          <div className="text-center">
            <span className="text-sm text-gray-400">
              Already have an account?{' '}
            </span>
            <Link
              href="/login"
              className="text-sm font-medium !text-green-400 !underline transition-colors hover:text-green-300"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
