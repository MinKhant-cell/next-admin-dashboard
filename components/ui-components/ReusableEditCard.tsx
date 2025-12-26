'use client';

import { ReactNode } from 'react';
import { Card } from '@/components/ui/card';
import LinkBackButton from '@/components/ui-components/LinkBackButton';
import { BreadCrumbs } from '@/components/ui-components/BreadCrumbs';
import { Spinner } from '@/components/ui/spinner';

interface ReusableEditCardProps {
    title: string;
    backHref: string;
    children: ReactNode;
    isLoading?: boolean;
    className?: string;
    breadcrumbPath?: string;
    breadcrumbName?: string;
}

export function ReusableEditCard({
    title,
    backHref,
    children,
    isLoading,
    className = '',
    breadcrumbPath,
    breadcrumbName,
}: ReusableEditCardProps) {
    return (
        <Card className={`w-full p-5 sm:overflow-auto mb-5 ${className}`}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3 sm:gap-0">
        <div className="flex items-center gap-4">
        <LinkBackButton href={backHref} />
        <h1 className="text-gray-700 dark:text-zinc-200 font-bold text-xl">
        Edit {title}
        </h1>
        </div>
        <div className="sm:flex-shrink-0 sm:mr-5 self-start">
        <BreadCrumbs className="block sm:inline underline sm:no-underline hover:underline text-sm sm:text-base"
        pathOverride={breadcrumbPath} 
        breadcrumbName={breadcrumbName} 
        />
        </div>
        
        </div>
        
        <div className="-mx-5 border-b border-gray-200 dark:border-gray-800 my-3" />
        
        <div className="m-5 pt-4">
        {isLoading ? <Spinner /> : children}
        </div>
        </Card>
    );
}

