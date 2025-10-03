'use client';
import React, { useEffect } from 'react';
import SidebarApp from './sidebar-app';
import { getCookie } from '@/lib/cookies';
import { useAppDispatch } from '@/store/hooks';
import { setLogin } from '@/features/auth/authSlice';
import { Button } from '../ui/button';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSidebar } from '../ui/sidebar';

const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const dispatch = useAppDispatch();
  const accessToken = getCookie('accessToken');
  const refreshToken = getCookie('refreshToken');
  const loginData = getCookie('loginData');
  const { toggleSidebar } = useSidebar();

  useEffect(() => {
    if (accessToken && loginData) {
      dispatch(setLogin({ data: { accessToken, refreshToken } }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <SidebarApp />
      <main className="h-dvh w-full overflow-y-auto bg-[#251E25]">
        <div className="absolute top-0 -left-0 z-50 block md:hidden">
          <Button
            onClick={toggleSidebar}
            variant="ghost"
            size="sm"
            className="h-7 w-7 cursor-pointer rounded-r-full border border-r-0 border-gray-600 bg-[linear-gradient(105deg,#57A7FF_0%,#04FF00_100%)] text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            <ChevronRight
              className={cn('!h-[20px] !w-[20px] transition-transform')}
            />
          </Button>
        </div>
        <section className="h-full">{children}</section>
      </main>
    </>
  );
};

export default MainLayout;
