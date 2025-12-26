'use client';

import { Separator } from '@/components/ui/separator';
import { AvatarContainer } from './ui-components/AvatarContainer';
import Link from 'next/link';
import { CustomTrigger } from './custom-trigger';
import { ThemeToggle } from './theme-toggle';

import { useRouter } from 'next/navigation'; 
import { logout, useAuthProfile } from '@/lib/api/auth';

export function SiteHeader() {
  const router = useRouter();
  const { user } = useAuthProfile();
  
  const handleLogout = async () => {
    await logout();
    router.push('/signin'); 
  };
  
  return (
    <header className="flex h-[var(--header-height)] shrink-0 items-center gap-2 py-3 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-[var(--header-height)]">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <CustomTrigger />

        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />

        {user ? (
          <>
            <Link href="/dashboard/settings">
              <AvatarContainer
                src="https://github.com/evilrabbit.png"
                name="Admin"
              />
            </Link>
            <h1 className="text-base font-medium">
              Welcome, {user.username}
            </h1>
          </>
        ) : (
          <h1 className="text-base font-medium">Documents</h1>
        )}

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />

          <div className="cursor-pointer" onClick={handleLogout}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m16 17 5-5-5-5" />
              <path d="M21 12H9" />
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
}
