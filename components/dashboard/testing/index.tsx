import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar/>
      <SidebarInset>
        <SiteHeader />
         <main>
        {children}
      </main>

      </SidebarInset>
     
    </SidebarProvider>
  )
}