"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  MessageSquareWarning,
  Globe,
  MessageSquareText,
  LogOut,
  Bell,
  Search,
} from "lucide-react";

// import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/animate-ui/components/radix/sidebar";

const brandNav = [
  {
    label: "Dashboard",
    href: "/brand/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Reviews",
    href: "/brand/dashboard/reviews",
    icon: MessageSquareText,
  },
  {
    label: "Inquiries",
    href: "/brand/dashboard/inquiries",
    icon: MessageSquareWarning,
  },
  {
    label: "Profile",
    href: "/brand/dashboard/profile",
    icon: Globe,
  },
];

export default function BrandShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <SidebarProvider defaultOpen>
      <Sidebar
        variant="inset"
        collapsible="icon"
        className="border-sidebar-border"
      >
        <SidebarHeader className="gap-3">
          <div className="flex items-center gap-3 px-2 py-1">
            <div className="bg-black text-white flex size-9 items-center justify-center rounded-sm">
              <span className="font-serif text-lg italic">B</span>
            </div>
            <div className="group-data-[collapsible=icon]:hidden">
              <p className="text-sm font-bold tracking-tight uppercase">Brand Portal</p>
              <p className="text-black/40 text-[10px] uppercase font-medium">
                Suede Collective
              </p>
            </div>
          </div>
          <SidebarSeparator />
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup className="px-0">
            <SidebarGroupLabel className="px-4 text-[10px] uppercase font-bold text-black/40 tracking-widest">
              Management
            </SidebarGroupLabel>
            <SidebarMenu>
              {brandNav.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.label}
                    >
                      <Link href={item.href} className="font-medium text-sm">
                        <item.icon className="size-4" />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>


        </SidebarContent>

        <SidebarFooter className="gap-3">
          <SidebarSeparator />
          <div className="p-2">
            <Button variant="ghost" className="w-full justify-start gap-2 text-black/60 hover:text-red-600 hover:bg-red-50">
              <LogOut className="size-4" />
              <span className="group-data-[collapsible=icon]:hidden text-sm font-medium">Logout</span>
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarRail />
      <SidebarInset className="bg-background min-h-svh">
        <header className="border-border bg-white/80 flex items-center gap-4 border-b px-6 py-4 backdrop-blur-md sticky top-0 z-30">
          <SidebarTrigger />
          <div className="flex-1">
            <h1 className="font-serif italic text-xl md:text-2xl text-black">
              Brand Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="text-black/60">
              <Search className="size-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-black/60 relative">
              <Bell className="size-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-black rounded-full" />
            </Button>
            <div className="w-8 h-8 rounded-full bg-black/10 border border-black/5" />
          </div>
        </header>
        <div className="p-6 md:p-8">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
