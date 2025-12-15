import { AppSidebar } from '@/components/app-sidebar';
import { SiteHeader } from '@/components/site-header';
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset
} from '@/components/ui/sidebar';
import Footer from '@/components/footer/FooterAdmin';
import Navbar from '@/components/navbar/NavbarAdmin';
import { routes } from '@/components/routes';
import Sidebar from '@/components/sidebar/Sidebar';
import { Toaster } from '@/components/ui/sonner';
import { getActiveRoute } from '@/utils/navigation';
import { usePathname } from 'next/navigation';
import {
  OpenContext,
  UserContext,
  UserDetailsContext
} from '@/contexts/layout';
import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';

interface Props {
  children: React.ReactNode;
  title: string;
  description: string;
}

const DashboardLayout: React.FC<Props> = (props: Props) => {
  const pathname = usePathname();
  console.log(getActiveRoute(routes, pathname));
  const [collapsed, setCollapsed] = useState(false);
  const sidebarRef = useRef(null);
  const [sidebarWidth, setSidebarWidth] = useState(0);
  useEffect(() => {
    if (!sidebarRef.current) return;
    const el = sidebarRef.current;

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setSidebarWidth(Math.round(entry.contentRect.width));
      }
    });

    ro.observe(el);
    // initial measure
    setSidebarWidth(Math.round(el.offsetWidth || 0));

    return () => ro.disconnect();
  }, []);

  const [open, setOpen] = React.useState(false);
  const user = {
    id: '1',
    name: 'John Doe',
    email: 'john@doe'
  };

  return (
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
    // <UserContext.Provider value={user}>
    //   <UserDetailsContext.Provider value={user}>
    //     <OpenContext.Provider value={{ open, setOpen }}>
    //       <div className="dark:bg-background-900 flex h-full w-full bg-white">
    //         <Toaster position="top-right"/>
    //         <Sidebar ref={sidebarRef} routes={routes} setOpen={setOpen} collapsed={collapsed} setCollapsed={setCollapsed}/>
    //         <div className="h-full w-full dark:bg-zinc-950">
    //           <main
    //             className={`flex-none w-full transition-all dark:bg-zinc-950 px-5`}
    //           >
    //               <Navbar sidebarWidth={sidebarWidth} collapsed={collapsed} brandText={getActiveRoute(routes, pathname)} />
    //             <div className="mx-auto min-h-screen p-2 !pt-[90px] md:p-2 md:!pt-[118px]">
    //               {props.children}
    //             </div>
    //             {/* <div className="p-3">
    //               <Footer />
    //             </div> */}
    //           </main>
    //         </div>
    //       </div>
    //     </OpenContext.Provider>
    //   </UserDetailsContext.Provider>
    // </UserContext.Provider>
  );
};

export default DashboardLayout;
