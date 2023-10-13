'use client';
import { useEffect } from 'react';
import { redirect } from 'next/navigation';

export default function PrivateRoute(Component: any) {
  return function PrivateRoute(props: any) {
    const token = JSON.parse(localStorage.getItem('token')!);

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
