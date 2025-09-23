'use client';

import React, { useState, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { CreateAccountFormData } from '@/lib/validations/auth';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Eye, EyeOff, Check } from 'lucide-react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

interface CreatePasswordProps {
  onHandleChangeTab: () => void;
  onHandlePreviousTab?: () => void;
}

const CreatePassword = ({ onHandleChangeTab, onHandlePreviousTab }: CreatePasswordProps) => {
  const { watch, trigger } = useFormContext<CreateAccountFormData>();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const password = watch('password', '');

  // Calculate password strength
  const passwordStrength = useMemo(() => {
    if (!password) return { score: 0, label: '' };
    
    let score = 0;
    if (password.length >= 8) score += 25;
    if (password.length >= 12) score += 25;
    if (/[a-zA-Z]/.test(password)) score += 25;
    if (/\d/.test(password)) score += 12.5;
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) score += 12.5;

    let label = '';
    if (score >= 75) label = 'Strong';
    else if (score >= 50) label = 'Medium';
    else if (score >= 25) label = 'Weak';
    else label = '';

    return { score, label };
  }, [password]);

  // Check password requirements
  const requirements = useMemo(() => {
    return {
      length: password.length >= 8 && password.length <= 20,
      complexity: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/.test(password),
    };
  }, [password]);

  const handlePasswordSubmit = async () => {
    setIsLoading(true);
    try {
      const isValid = await trigger(['password', 'confirmPassword']);
      if (!isValid) {
        return;
      }
      // TODO: Implement actual password creation logic
      console.log('Password data:', { password, confirmPassword: watch('confirmPassword') });
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onHandleChangeTab();
    } catch (error) {
      console.error('Password creation error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with back button */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={onHandlePreviousTab}
          className="p-2 text-white hover:text-gray-300"
        >
          {/* <ArrowLeft className="h-5 w-5" /> */}
        </Button>
      </div>

      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold text-white uppercase sm:text-3xl">
          CREATE PASSWORD
        </h1>
        <p className="text-sm text-gray-400 sm:text-base">
          Choose a strong password to keep your account safe.
        </p>
      </div>

      <div className="space-y-4 sm:space-y-6">
        <FormField
          name="password"
          control={useFormContext<CreateAccountFormData>().control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-white uppercase">PASSWORD</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="Enter password"
                    type={showPassword ? 'text' : 'password'}
                    className="h-11 sm:h-12 rounded-full border-none bg-gray-800 pr-10 sm:pr-12 text-white placeholder:text-gray-400 focus:border-pink-400 focus:ring-pink-400/20"
                    {...field}
                  />
                  <Button
                    variant="ghost"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-1/2 right-2 sm:right-3 -translate-y-1/2 transform text-gray-400 transition-colors hover:text-white"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="confirmPassword"
          control={useFormContext<CreateAccountFormData>().control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-white uppercase">CONFIRM PASSWORD</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="Confirm password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    className="h-11 sm:h-12 rounded-full border-none bg-gray-800 pr-10 sm:pr-12 text-white placeholder:text-gray-400 focus:border-pink-400 focus:ring-pink-400/20"
                    {...field}
                  />
                  <Button
                    variant="ghost"
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute top-1/2 right-2 sm:right-3 -translate-y-1/2 transform text-gray-400 transition-colors hover:text-white"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password Strength Indicator */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-white uppercase">
            PASSWORD STRENGTH
          </p>
          <div className="flex items-center space-x-2 sm:space-x-3">
            <Progress 
              value={passwordStrength.score} 
              className="flex-1 h-1.5 sm:h-2 bg-gray-700"
            />
            <span className="text-xs sm:text-sm text-white font-medium">
              {passwordStrength.label}
            </span>
          </div>
        </div>

        {/* Password Requirements */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-white uppercase">
            PASSWORD REQUIREMENTS
          </p>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                requirements.length ? 'bg-pink-500 border-pink-500' : 'border-gray-500'
              }`}>
                {requirements.length && <Check className="w-3 h-3 text-white" />}
              </div>
              <span className="text-sm text-white">8 to 20 characters</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                requirements.complexity ? 'bg-pink-500 border-pink-500' : 'border-gray-500'
              }`}>
                {requirements.complexity && <Check className="w-3 h-3 text-white" />}
              </div>
              <span className="text-sm text-white">Letters, numbers and special characters</span>
            </div>
          </div>
        </div>

        {/* Create Password button */}
        <Button
          type="button"
          onClick={handlePasswordSubmit}
          disabled={isLoading}
          className="h-11 sm:h-12 w-full transform rounded-full bg-[linear-gradient(105deg,#FE39F0_0%,#EE003F_100%)] text-base sm:text-lg font-bold text-white transition-all duration-200 hover:scale-[1.02] hover:from-pink-600 hover:to-pink-500 disabled:transform-none disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? 'CREATING...' : 'CREATE PASSWORD'}
        </Button>
      </div>
    </div>
  );
};

export default CreatePassword;
