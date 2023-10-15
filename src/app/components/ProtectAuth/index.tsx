'use client';
import { useEffect } from 'react';
import { redirect } from 'next/navigation';

export default function ProtectAuth(Component: any) {
  return function ProtectAuth(props: any) {
    const token =
      window !== undefined ? JSON.parse(localStorage.getItem('token')!) : '';

    useEffect(() => {
      if (token) {
        redirect('/dashboard');
      }
    });

    if (token) {
      return null;
    }
    return <Component {...props} />;
  };
}
