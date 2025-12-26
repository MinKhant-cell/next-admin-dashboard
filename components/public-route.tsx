'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthProfile } from '@/lib/api/auth';


export default function PublicRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, isLoading } = useAuthProfile();

  useEffect(() => {
    if (!isLoading && user) {
      router.push('/dashboard/main');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-xl animate-pulse">Loading...</div>
      </div>
    );
  }

  return !user ? <>{children}</> : null;
}
