import { AppSidebar } from '@/components/app-sidebar';
import { SiteHeader } from '@/components/site-header';
import {
  SidebarProvider,
  SidebarInset
} from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/sonner';
import React from 'react';
import ProtectedRoute from '../protected-routes';

interface Props {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<Props> = (props: Props) => {
  return (
    // <ProtectedRoute> </ProtectedRoute>
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SiteHeader />
        <div className="h-full w-full dark:bg-zinc-950">
          <main className="p-5">
            <Toaster position="top-right" />
            {props.children}
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
   
  );
};

export default DashboardLayout;
