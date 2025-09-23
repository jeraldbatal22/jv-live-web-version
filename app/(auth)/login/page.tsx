'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { loginSchema, type LoginFormData } from '@/lib/validations/auth';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      // TODO: Implement actual login logic
      console.log('Login data:', data);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push("/")
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // const handleSocialLogin = (provider: 'facebook' | 'google' | 'apple') => {
  //   console.log(`Login with ${provider}`);
  //   // TODO: Implement social login logic
  // };

  return (
    <div className="flex min-h-dvh flex-col text-white pt-3">
      {/* Main content */}
      <div className="flex flex-1 flex-col items-center justify-center px-4 pb-8 sm:px-6">
        <div className="w-full max-w-md space-y-8">
          {/* Title section */}
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-wider text-white uppercase sm:text-4xl">
              LOGIN
            </h1>
            <p className="text-sm text-gray-400 sm:text-base">
              Log in to continue streaming, connecting, and exploring.
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
              className="w-[100px] h-[100px] md:w-[150px] md:h-[150px]"
            />
          </div>

          {/* Login form */}
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

            {/* Password field */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="password"
                  className="text-sm font-medium text-white uppercase"
                >
                  PASSWORD
                </Label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-gray-400 transition-colors hover:text-white"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  placeholder="Enter password"
                  type={showPassword ? 'text' : 'password'}
                  className="h-12 rounded-full border-none bg-gray-800 pr-12 text-white placeholder:text-gray-400 focus:border-pink-400 focus:ring-pink-400/20"
                  {...register('password')}
                />
                <Button
                  variant="ghost"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-400 transition-colors hover:text-white"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </Button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-400">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Login button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="h-12 w-full transform rounded-lg bg-[linear-gradient(105deg,#FE39F0_0%,#EE003F_100%)] text-lg font-bold text-white transition-all duration-200 hover:scale-[1.02] hover:from-pink-600 hover:to-pink-500 disabled:transform-none disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? 'LOGGING IN...' : 'LOGIN'}
            </Button>
          </form>

          {/* Social login section */}
          <div className="space-y-4">
            {/* Divider */}
            <div className="flex items-center">
              <div className="flex-1 border-t-2 border-gray-700"></div>
              <span className="flex-1 pl-6 text-gray-400">Or Login using</span>
              <div className="flex-1 border-t-2 border-gray-700"></div>
            </div>

            {/* Social login buttons */}
            <div className="flex gap-4">
              <Button variant="ghost" className="flex h-[62px] flex-1 items-center justify-center rounded-2xl bg-gray-transparent border-1">
                <Image
                  src="/assets/icons/svg/google-icon.svg"
                  height={35}
                  width={35}
                  alt="google-icon"
                />
              </Button>
              <Button variant="ghost" className="flex h-[62px] flex-1 items-center justify-center rounded-2xl bg-gray-transparent border-1">
                <Image
                  src="/assets/icons/svg/apple-icon.svg"
                  height={35}
                  width={35}
                  alt="apple-icon"
                />
              </Button>
              <Button variant="ghost" className="flex h-[62px] flex-1 items-center justify-center rounded-2xl bg-gray-transparent border-1">
                <Image
                  src="/assets/icons/svg/facebook-icon.svg"
                  height={35}
                  width={35}
                  alt="facebook-icon"
                />
              </Button>
            </div>
          </div>

          {/* Registration link */}
          <div className="text-center">
            <span className="text-sm text-gray-400">
              Don`t have an account?{' '}
            </span>
            <Link
              href="/register"
              className="text-sm font-medium !text-green-400 !underline transition-colors hover:text-green-300"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
