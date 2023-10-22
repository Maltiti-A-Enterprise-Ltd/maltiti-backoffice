'use client';
import { useEffect } from 'react';
import { redirect } from 'next/navigation';
import { store } from '@/app/redux/store';

export default function ProtectAuth(Component: any) {
  return function ProtectAuth(props: any) {
    const token = store.getState().authentication?.token;

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
