import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import SidebarApp from './sidebar-app';

const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
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
