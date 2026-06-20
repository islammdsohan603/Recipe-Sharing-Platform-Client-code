import DashboardSidebar from '@/component/dashboard/DashboardSidebar';
import React from 'react';

const DashBoardLayout = ({ children }) => {
  return (
    <div className="bg-white/50">
      <div className="flex min-h-screen w-11/12 max-w-7xl mx-auto">
        <DashboardSidebar />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};

export default DashBoardLayout;
