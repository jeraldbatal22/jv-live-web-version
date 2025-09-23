'use client';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const ComingSoon = () => {
  const router = useRouter();
  return (
    <div className="flex min-h-dvh items-center justify-center pt-4">
      <div className="w-full max-w-md flex-1 space-y-10">
        {/* Logo */}
        <div className="flex justify-center">
          <Image
            src="/assets/images/svg/rocket.svg"
            alt="logo"
            height={150}
            width={150}
            className="h-[100px] w-[100px] md:h-[150px] md:w-[150px]"
          />
        </div>

        <div className="space-y-2 text-center">
          <h1 className="text-4xl font-bold tracking-wider text-white uppercase sm:text-4xl">
            COMING SOON
          </h1>
          <h1 className="text-3xl font-bold tracking-wider text-white uppercase sm:text-4xl">
            WORK IN PROGRESS
          </h1>
          <p className="text-sm text-gray-400 sm:text-base">
            We`re working on something amazing just for you. Stay tuned—this
            feature will be live before you know it!
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

export default ComingSoon;
