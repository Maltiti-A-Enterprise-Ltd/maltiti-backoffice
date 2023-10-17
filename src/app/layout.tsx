import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Providers } from '@/app/redux/provider';
// import './tailwind.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import React from 'react';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Maltiti A. Enterprise Ltd Backoffice',
  description: '',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </body>
    </html>
  );
}
