import { createApi } from '@reduxjs/toolkit/query/react';
import { I_USER } from '@/types/user';
import { baseQueryWithErrorHandler } from '@/lib/api';
import { LoginFormData } from '@/lib/validations/auth';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithErrorHandler,
  endpoints: (builder) => ({
    login: builder.mutation<void, LoginFormData>({
      query: (body) => ({
        url: 'auth/signin',
        method: 'POST',
        body,
      }),
      extraOptions: { showToast: true }, // ✅ opt-in toasts
      // transformResponse: (response: { data: any }, meta, arg) => console.log(response.data),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),
    me: builder.query<I_USER, void>({
      query: () => '/auth/me',
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useMeQuery } = authApi;
