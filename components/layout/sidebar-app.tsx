'use client';

import { Button } from '@/components/ui/button';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { ChevronRight, MenuIcon, Search, LogInIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { Label } from '../ui/label';

const menuItems = [
  { title: 'Feed', url: '/', icon: '/assets/icons/svg/feed-icon.svg' },
  { title: 'Home', url: '/home', icon: '/assets/icons/svg/home-icon.svg' },
  { title: 'Live', url: '/live', icon: '/assets/icons/svg/add-icon.svg' },
  { title: 'Chats', url: '/chats', icon: '/assets/icons/svg/chat-icon.svg' },
  {
    title: 'Profile',
    url: '/profile',
    icon: '/assets/icons/svg/profile-icon.svg',
  },
];

const SidebarApp = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [activeMenu, setActiveMenu] = useState(pathname);
  const { toggleSidebar, open } = useSidebar();

  const handleNavigateMenu = (e: any, selectedMenu: any) => {
    e.preventDefault();
    router.push(selectedMenu.url);
    setActiveMenu(selectedMenu.url);
  };

  return (
    <Sidebar
      collapsible="icon"
      className="relative border-r border-gray-600 bg-[#251E25] text-white group-data-[collapsible=icon]:w-[70px]"
      side="left"
    >
      <SidebarHeader className={cn('pt-5', open && 'pb-10')}>
        {/* Collapse Button */}
        {open && (
          <div className="absolute top-8 -right-0 z-50">
            <Button
              onClick={toggleSidebar}
              variant="ghost"
              size="sm"
              className="h-12 w-12 cursor-pointer rounded-l-full border border-r-0 border-gray-600 bg-[linear-gradient(105deg,#57A7FF_0%,#04FF00_100%)] text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              <ChevronRight
                className={cn(
                  '!h-[26px] !w-[26px] transition-transform',
                  open && 'rotate-180'
                )}
              />
            </Button>
          </div>
        )}
        {open ? (
          <div className="flex items-center gap-3">
            {/* T.Movie Logo */}
            <Image
              src="/assets/images/logo.png"
              alt="logo"
              width={50}
              height={50}
            />
            <div className="flex flex-col">
              <Label className="text-sm">Welcome back!</Label>
              <Label className="text-lg">Guest</Label>
            </div>
          </div>
        ) : (
          <Button
            onClick={toggleSidebar}
            variant="ghost"
            className="!mr-2 cursor-pointer hover:bg-transparent hover:text-[linear-gradient(105deg,#FE39F0_0%,#EE003F_100%)]"
          >
            <MenuIcon className="!h-[26px] !w-[26px] text-[linear-gradient(105deg,#57A7FF_0%,#04FF00_100%)]" />
          </Button>
          // <SidebarTrigger className="!w-32" />
        )}
      </SidebarHeader>
      <SidebarContent className="">
        {open && (
          <div className="mb-6 px-6">
            <div className="relative">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-green-500" />
              <input
                type="text"
                placeholder="Search"
                className="w-full rounded-lg bg-[#302930] px-10 py-2 text-white focus:outline-none"
              />
            </div>
          </div>
        )}
        {/* Menu Section */}
        <SidebarGroup className="space-y-4 p-0">
          <SidebarGroupContent>
            <SidebarMenu className={cn(!open && 'space-y-3 mt-5', 'px-0')}>
              {menuItems.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  className={cn('flex items-center justify-center')}
                >
                  <SidebarMenuButton
                    asChild
                    className="group-data-[collapsible=icon]:!pl-0 hover:group-data-[collapsible=icon]:!bg-transparent"
                  >
                    <Link
                      href=""
                      onClick={(e) => handleNavigateMenu(e, item)}
                      className={cn(
                        'gap-3 px-5 !py-6 text-[1.2rem] transition-colors hover:text-[linear-gradient(105deg,#FE39F0_0%,#EE003F_100%)]',
                        activeMenu === item.url
                          ? 'text-[linear-gradient(105deg,#FE39F0_0%,#EE003F_100%)]'
                          : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                      )}
                    >
                      {activeMenu === item.url && open && (
                        <div className="absolute top-0 bottom-0 left-0 w-2 rounded-r-full bg-[linear-gradient(105deg,#FE39F0_0%,#EE003F_100%)]" />
                      )}
                      <Image
                        src={item.icon}
                        alt={item.title}
                        height={26}
                        width={26}
                      />
                      <span
                        className={cn(
                          'hover:text-[linear-gradient(105deg,#FE39F0_0%,#EE003F_100%)]',
                          'text-lg font-medium',
                          'group-data-[collapsible=icon]:hidden'
                        )}
                      >
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        {/* Call to Action Section */}
        {open ? (
          <Button
            variant="ghost"
            onClick={() => router.push('/login')}
            className="flex w-full items-center gap-2 rounded-lg bg-[linear-gradient(105deg,#FE39F0_0%,#EE003F_100%)] py-6 font-medium text-white hover:bg-pink-400"
            size="sm"
          >
            <LogInIcon className="h-4 w-4" />
            <span className="group-data-[collapsible=icon]:hidden">Login</span>
          </Button>
        ) : (
          <Button
            onClick={() => router.push('/login')}
            className="flex w-full items-center gap-2 rounded-lg bg-[linear-gradient(105deg,#FE39F0_0%,#EE003F_100%)] font-medium text-white hover:bg-[linear-gradient(105deg,#FE39F0_0%,#EE003F_100%)]"
            size="sm"
          >
            <LogInIcon className="h-4 w-4" />
          </Button>
        )}
      </SidebarFooter>
    </Sidebar>
  );
};

export default SidebarApp;
