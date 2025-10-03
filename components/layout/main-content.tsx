'use client';
import React, { useEffect } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import SidebarApp from './sidebar-app';
import { getCookie } from '@/lib/cookies';
import { useAppDispatch } from '@/store/hooks';
import { setLogin } from '@/features/auth/authSlice';

const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const dispatch = useAppDispatch();
  const accessToken = getCookie('accessToken');
  const refreshToken = getCookie('refreshToken');
  const loginData = getCookie('loginData');

  useEffect(() => {
    if (accessToken && loginData) {
      dispatch(setLogin({ data: { accessToken, refreshToken } }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SidebarProvider>
      <SidebarApp />
      <main className="h-dvh w-full overflow-y-auto bg-[#251E25]">
        <section className="h-full">{children}</section>
      </main>
    </SidebarProvider>
  );
};

export default MainLayout;
