'use client';

import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { OTPInput } from '@/components/ui/otp-input';
import { CreateAccountFormData } from '@/lib/validations/auth';
// import { useRouter } from 'next/navigation';

interface VerifyEmailOtpProps {
  onHandleChangeTab: () => void;
}

const VerifyEmailOtp = ({ onHandleChangeTab }: VerifyEmailOtpProps) => {
  const { setValue, trigger, formState: { errors } } = useFormContext<CreateAccountFormData>();
  // const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [otpValue, setOtpValue] = useState('');

  const handleOtpSubmit = async () => {
    setIsLoading(true);
    try {
      const isValid = await trigger('otp');
      if (!isValid) {
        return;
      }
      // TODO: Implement actual OTP verification logic
      console.log('OTP data:', { otp: otpValue });
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onHandleChangeTab();
      // router.push('/');
    } catch (error) {
      console.error('OTP verification error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (value: string) => {
    setOtpValue(value);
    setValue('otp', value);
  };

  const handleResendOtp = () => {
    // TODO: Implement resend OTP logic
    console.log('Resending OTP...');
  };

  return (
    <div className="space-y-5">
      <div className="space-y-2 text-start">
        <h1 className="text-xl font-bold text-white uppercase sm:text-3xl">
          WE SENT AN EMAIL!
        </h1>
        <p className="text-xs text-gray-400 sm:text-base">
          Check your inbox to verify your email address. Just click the link,
          and you`ll be ready to start streaming!
        </p>
      </div>

      <div className="space-y-6">
        {/* OTP Input field */}
        <div className="space-y-2">
          <OTPInput
            length={6}
            value={otpValue}
            onChange={handleOtpChange}
            autoFocus
            className="grid grid-cols-6 gap-2 sm:gap-3"
          />
          {errors.otp && (
            <p className="text-center text-xs sm:text-sm text-red-400">
              {errors.otp.message}
            </p>
          )}
        </div>

        {/* Resend OTP */}
        <div className="text-center">
          <p className="text-xs sm:text-sm text-gray-400">
            Didn&apos;t receive the code?{' '}
            <Button
              type="button"
              variant="link"
              onClick={handleResendOtp}
              className="h-auto p-0 font-medium text-green-400 underline transition-colors hover:text-green-300"
            >
              Resend OTP
            </Button>
          </p>
        </div>

        {/* Verify button */}
        <Button
          type="button"
          onClick={handleOtpSubmit}
          disabled={isLoading || otpValue.length !== 6}
          className="h-12 w-full transform rounded-lg bg-[linear-gradient(105deg,#FE39F0_0%,#EE003F_100%)] text-lg font-bold text-white transition-all duration-200 hover:scale-[1.02] hover:from-pink-600 hover:to-pink-500 disabled:transform-none disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? 'VERIFYING...' : 'VERIFY'}
        </Button>
      </div>
    </div>
  );
};

export default VerifyEmailOtp;
