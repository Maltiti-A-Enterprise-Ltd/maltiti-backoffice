'use client';
import React, { ReactNode } from 'react'; // Import React and ReactNode

import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import HeaderStats from '../components/Headers/HeaderStats';
import FooterAdmin from '../components/Footer';
import PrivateRoute from '@/app/components/PrivateRoute';

function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64">
        <Navbar />
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          {children}
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}

export default PrivateRoute(DashboardLayout);
