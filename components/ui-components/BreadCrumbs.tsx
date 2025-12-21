'use client';

import { useParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import React from 'react';
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbList, 
  BreadcrumbPage, 
  BreadcrumbSeparator 
} from '@/components/ui/breadcrumb';

export function BreadCrumbs() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  //console.log('Segments:', segments); 
  if (segments.length < 2 || segments[0] !== 'dashboard') return null;

  const crumbs: { label: string; href?: string }[] = [
    { label: 'Dashboard', href: '/dashboard' }
  ];

  const resource = segments[1];
  const resourceName = resource.charAt(0).toUpperCase() + resource.slice(1);
  crumbs.push({ label: resourceName, href: `/dashboard/${resource}` });

  if (segments[2] === 'create') {
    crumbs.push({ label: 'Create' });
  } else if (segments[2] === 'edit') {
    const id = segments[3];
    crumbs.push({ label: `${id}`, href: `/dashboard/${resource}/${id}` });
    crumbs.push({ label: 'Edit' });
  } else if (segments.length === 3 && segments[2] !== 'edit' && segments[2] !== 'create') {
    const id = segments[2];
    crumbs.push({ label: `Detail of ${id}` });
  }


  return (
    <Breadcrumb>
      <BreadcrumbList>
        {crumbs.map((crumb, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              {crumb.href ? (
                <BreadcrumbLink asChild>
                  <Link href={crumb.href}>{crumb.label}</Link>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
            {index < crumbs.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
