'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { useAuthProfile } from '@/lib/api/auth';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuthProfile();
  const router = useRouter();
  const pathname = usePathname();

  const [mounted, setMounted] = useState(false);
  const [hasRedirected, setHasRedirected] = useState(false);


  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle redirect when unauthenticated
  useEffect(() => {
    if (!mounted || isLoading || hasRedirected || user) return;

    setHasRedirected(true);

    const returnUrl = pathname && pathname !== '/signin' ? pathname : '/dashboard/main';
    const redirectTo = `/signin?returnUrl=${encodeURIComponent(returnUrl)}`;

    router.push(redirectTo);
  }, [mounted, isLoading, hasRedirected, user, pathname, router]);

 
  if (!mounted || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-lg text-muted-foreground">Authenticating...</p>
        </div>
      </div>
    );
  }


  if (user) {
    return <>{children}</>;
  }


  return null;
}