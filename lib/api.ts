import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { toast } from 'sonner';
import { getCookie } from './cookies';

const baseQuery = fetchBaseQuery({
  // baseUrl: 'https://develop.api.exsena.com.ph',
  // baseUrl: 'https://easy-mart-clone.vercel.app',
  baseUrl: 'https://nest-backend-hfys.onrender.com',
  prepareHeaders: (headers, { getState }) => {
    // Try to get token from Redux state first
    const state = getState() as any;
    const tokenFromState =
      state?.auth?.accessToken || state?.auth?.login?.data?.accessToken;

    // If not in state, try to get from cookies
    const tokenFromCookie = getCookie<string>('accessToken');

    // Use token from state first, then fallback to cookie
    const token = tokenFromState || tokenFromCookie;

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

export const baseQueryWithErrorHandler: typeof baseQuery = async (
  args,
  api,
  extraOptions
) => {
  const result = await baseQuery(args, api, extraOptions);
  console.log(result, args, api.getState(), extraOptions);

  if (result.error) {
    const { status, data } = result.error as any;
    if ((extraOptions as any)?.showToast) {
      toast.error('Error', {
        richColors: true,
        position: 'top-center',
        description: data?.message || 'Something went wrong',
      });
    }

    if (status === 400) {
      console.log(api, 'first');
      api.dispatch({ type: 'auth/logout' });
    }

    result.error = {
      status,
      ...data,
    };
  }

  return result;
};
