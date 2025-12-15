'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { AvatarContainer } from './ui-components/AvatarContainer';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { ChevronRight } from 'lucide-react';
import { CustomTrigger } from './custom-trigger';

export function SiteHeader() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 py-3 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <CustomTrigger/>
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">Documents</h1>
        {/* <Button
                variant="outline"
                className="flex h-9 min-w-9 cursor-pointer rounded-full border-zinc-200 p-0 text-xl text-zinc-950 dark:border-zinc-800 dark:text-white md:min-h-10 md:min-w-10"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              >
                {theme === 'light' ? (
                  <Moon className="h-4 w-4 stroke-2" />
                ) : (
                  <Sun className="h-5 w-5 stroke-2" />
                )}
              </Button> */}
        <div className="ml-auto flex items-center gap-2">
          <Link href={'/dashboard/settings'}>
            <AvatarContainer
              src={'https://github.com/evilrabbit.png'}
              name={'Admin'}
            />
          </Link>
          {/* <Button variant="ghost" asChild size="sm" className="hidden sm:flex">
            <a
              href="https://github.com/shadcn-ui/ui/tree/main/apps/v4/app/(examples)/dashboard"
              rel="noopener noreferrer"
              target="_blank"
              className="dark:text-foreground"
            >
              GitHub
            </a>
          </Button> */}
        </div>
      </div>
    </header>
  );
}
