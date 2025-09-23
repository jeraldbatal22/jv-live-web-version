'use client';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const NotFoundPage = () => {
  const router = useRouter();
  return (
    <div className="flex min-h-dvh items-center justify-center pt-4">
      <div className="w-full max-w-md flex-1 space-y-10">
        <div className="flex items-start justify-between">
          <Link
            href="/"
            className="flex items-center text-green-400 transition-colors hover:text-green-300"
          >
            <ArrowLeft className="h-6 w-6" />
          </Link>
        </div>

        {/* Logo */}
        <div className="flex justify-center">
          <Image
            src="/assets/images/logo.png"
            alt="logo"
            height={150}
            width={150}
            className="h-[100px] w-[100px] md:h-[150px] md:w-[150px]"
          />
        </div>

        <div className="space-y-2 text-center">
          <h1 className="text-4xl font-bold tracking-wider text-white uppercase sm:text-4xl">
            404
          </h1>
          <h1 className="text-3xl font-bold tracking-wider text-white uppercase sm:text-4xl">
            PAGE NOT FOUND.
          </h1>
          <p className="text-sm text-gray-400 sm:text-base">
            It seems this page is empty or the content hasn’t gone live. Check
            back later or explore other streams!
          </p>
        </div>
        <Button
          onClick={() => router.push('/home')}
          type="button"
          className="h-12 w-full transform rounded-lg bg-[linear-gradient(105deg,#FE39F0_0%,#EE003F_100%)] text-lg font-bold text-white transition-all duration-200 hover:scale-[1.02] hover:from-pink-600 hover:to-pink-500 disabled:transform-none disabled:cursor-not-allowed disabled:opacity-50"
        >
          BACK TO HOME
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
