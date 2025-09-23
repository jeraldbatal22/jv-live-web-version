import ComingSoon from '@/components/common/coming-soon';
import MainLayout from '@/components/layout/main-content';
import React from 'react';

const ChatsPage = () => {
  return (
    <MainLayout>
      <div className="flex w-full flex-col gap-6 px-6">
        <ComingSoon />
      </div>
    </MainLayout>
  );
};

export default ChatsPage;
