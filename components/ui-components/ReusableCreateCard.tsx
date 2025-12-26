'use client';

import { ReactNode } from 'react';
import { Card } from '@/components/ui/card';
import LinkBackButton from '@/components/ui-components/LinkBackButton';
import { BreadCrumbs } from '@/components/ui-components/BreadCrumbs';

interface ReusableCreateCardProps {
  title: string;
  backHref: string;
  children: ReactNode;
  className?: string;
}

export function ReusableCreateCard({
  title,
  backHref,
  children,
  className = ''
}: ReusableCreateCardProps) {
  return (
    <Card className={`w-full p-5 sm:overflow-auto mb-5 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3 sm:gap-0">
        <div className="flex items-center gap-4">
          <LinkBackButton href={backHref} />
          <h1 className="text-gray-700 dark:text-zinc-200 font-bold text-xl">
            Create {title}
          </h1>
        </div>
       
        <div className="sm:flex-shrink-0 self-start">
          <BreadCrumbs 
            className="block underline hover:no-underline text-sm sm:text-base" 
          />
        </div>
      </div>

      <div className="-mx-5 border-b border-gray-200 dark:border-gray-800 my-3" />

      <div className="m-5 pt-4">
        {children}
      </div>
    </Card>
  );
}
