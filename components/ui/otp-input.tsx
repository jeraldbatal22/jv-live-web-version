'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Input } from './input';
import { cn } from '@/lib/utils';

interface OTPInputProps {
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  className?: string;
  disabled?: boolean;
  autoFocus?: boolean;
}

const OTPInput = React.forwardRef<HTMLInputElement, OTPInputProps>(
  (
    {
      length = 6,
      value = '',
      onChange,
      onComplete,
      className,
      disabled,
      autoFocus,
      ...props
    },
    ref
  ) => {
    const [otp, setOtp] = useState<string[]>(new Array(length).fill(''));
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
      if (value) {
        const otpArray = value.split('').slice(0, length);
        const newOtp = [...otp];
        otpArray.forEach((digit, index) => {
          if (index < length) {
            newOtp[index] = digit;
          }
        });
        setOtp(newOtp);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, length]);

    const handleChange = (element: HTMLInputElement, index: number) => {
      if (disabled) return;

      const val = element.value;
      if (!/^\d*$/.test(val)) return;

      const newOtp = [...otp];
      newOtp[index] = val;
      setOtp(newOtp);

      const otpValue = newOtp.join('');
      onChange?.(otpValue);

      if (otpValue.length === length) {
        onComplete?.(otpValue);
      }

      // Focus next input
      if (val && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    };

    const handleKeyDown = (
      e: React.KeyboardEvent<HTMLInputElement>,
      index: number
    ) => {
      if (disabled) return;

      if (e.key === 'Backspace') {
        if (!otp[index] && index > 0) {
          inputRefs.current[index - 1]?.focus();
        } else {
          const newOtp = [...otp];
          newOtp[index] = '';
          setOtp(newOtp);
          onChange?.(newOtp.join(''));
        }
      } else if (e.key === 'ArrowLeft' && index > 0) {
        inputRefs.current[index - 1]?.focus();
      } else if (e.key === 'ArrowRight' && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
      if (disabled) return;

      e.preventDefault();
      const pastedData = e.clipboardData
        .getData('text')
        .replace(/\D/g, '')
        .slice(0, length);
      const newOtp = [...otp];

      for (let i = 0; i < pastedData.length && i < length; i++) {
        newOtp[i] = pastedData[i];
      }

      setOtp(newOtp);
      const otpValue = newOtp.join('');
      onChange?.(otpValue);

      if (otpValue.length === length) {
        onComplete?.(otpValue);
        inputRefs.current[length - 1]?.focus();
      } else {
        inputRefs.current[pastedData.length]?.focus();
      }
    };

    useEffect(() => {
      if (autoFocus && inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
    }, [autoFocus]);

    return (
      <div className={cn('flex gap-2', className)} {...props}>
        {otp.map((digit, index) => (
          <Input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
              if (ref) {
                if (typeof ref === 'function') {
                  ref(el);
                } else {
                  ref.current = el;
                }
              }
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e.target, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            disabled={disabled}
            className="h-12 w-12 rounded-lg border-none bg-gray-800 text-center text-lg font-semibold text-white focus:border-pink-400 focus:ring-pink-400/20"
          />
        ))}
      </div>
    );
  }
);

OTPInput.displayName = 'OTPInput';

export { OTPInput };
