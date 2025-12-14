"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { routes } from '@/components/routes';
import Link from "next/link";
import { useCallback } from "react";
import { usePathname } from 'next/navigation';
import { Sprout } from 'lucide-react'

export function AppSidebar() {
    const pathname = usePathname();
    const activeRoute = useCallback(
    (routeName: string) => {
        return pathname?.includes(routeName);
    },
    [pathname]
    );
  return (
    <Sidebar collapsible="icon">
        <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
                <Link href="/">
                <Sprout className="mr-2 h-4 w-4" />
                <span className="text-base font-semibold">{process.env.NEXT_PUBLIC_APP_NAME || 'Dashboard'}</span>
                </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          {/* <SidebarGroupLabel>Application</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu>
              {routes.map((route) => (
                <SidebarMenuItem className="items-center" key={route.name}>
                  <SidebarMenuButton asChild className={`${activeRoute(route.path) ? 'bg-[#f4f4f5]' : ''}`}>
                    <Link href={route.path}>
                    <div className={`text mr-1 mt-1.5`}>
                      {route.icon}
                    </div>
                    <p className={`mr-auto text-sm`}>{route.name}</p>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}