// src/middleware/rtkQueryErrorLogger.ts
import { isRejectedWithValue } from '@reduxjs/toolkit';
import type { Middleware } from '@reduxjs/toolkit';
import { toast } from 'sonner';

export const rtkQueryErrorLogger: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const options = (action.meta as any)?.arg?.extraOptions || {};
    const showToast = options.showToast; // ✅ default true

    if (showToast) {
      toast.error('Error', {
        richColors: true,
        position: 'top-center',
        description:
          (action.payload as any)?.data?.message || 'Something went wrong',
      });
    }
    return (action.payload as any)?.data?.message || 'Something went wrong';
  }

  return next(action);
};
