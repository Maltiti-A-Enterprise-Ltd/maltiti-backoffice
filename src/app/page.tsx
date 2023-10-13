'use client';
import Login from '@/app/components/login';
import ProtectAuth from '@/app/components/ProtectAuth';

function Home() {
  return (
    <main>
      <Login />
    </main>
  );
}

export default ProtectAuth(Home);
