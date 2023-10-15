'use client';
import { useEffect } from 'react';
import { redirect } from 'next/navigation';
import { useAppSelector } from '@/app/redux/hooks';

export default function PrivateRoute(Component: any) {
  return function PrivateRoute(props: any) {
    const token = useAppSelector(state => state.authentication.token);

    useEffect(() => {
      if (!token) {
        redirect('/');
      }
    });

    if (!token) {
      return null;
    }
    return <Component {...props} />;
  };
}
