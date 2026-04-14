"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  BookOpen,
  CircleUser,
  LayoutDashboard,
  LifeBuoy,
  Settings,
  BarChart3,
  ClipboardList,
  MessageSquare,
  PackageSearch,
  Users,
  FileDown,
  Mailbox,
} from "lucide-react";

import { cn } from "@/lib/utils";
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

const primaryNav = [
  {
    label: "Overview",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Growth Panel",
    href: "/admin/growth",
    icon: BarChart3,
  },
  {
    label: "Review Activity",
    href: "/admin/reviews",
    icon: ClipboardList,
  },
  {
    label: "Inquiry Activity",
    href: "/admin/inquiries",
    icon: MessageSquare,
  },
  {
    label: "Brand Management",
    href: "/admin/brands",
    icon: PackageSearch,
  },
  {
    label: "Brand Contact",
    href: "/admin/brand-contacts",
    icon: Mailbox,
  },
  {
    label: "Platform Feedback",
    href: "/admin/feedback",
    icon: MessageSquare,
  },
  {
    label: "Member Directory",
    href: "/admin/members",
    icon: Users,
  },
  {
    label: "Data Export",
    href: "/admin/exports",
    icon: FileDown,
  },

  {
    label: "Content Management",
    href: "/admin/about",
    icon: BookOpen,
  },
];

const secondaryNav = [
  {
    label: "Team",
    href: "/admin/team",
    icon: CircleUser,
    disabled: true,
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: Settings,
    disabled: true,
  },
  {
    label: "Support",
    href: "/admin/support",
    icon: LifeBuoy,
    disabled: true,
  },
];

type AdminShellProps = {
  children: React.ReactNode;
};

export default function AdminShell({ children }: AdminShellProps) {
  const pathname = usePathname();
  const headerTitle =
    pathname === "/admin/growth"
      ? "Growth Panel"
      : pathname === "/admin/reviews"
        ? "Review Activity"
        : pathname === "/admin/inquiries"
          ? "Inquiry Activity"
          : pathname === "/admin/brands"
            ? "Brand Management"
            : pathname === "/admin/brand-contacts"
              ? "Brand Contact Requests"
              : pathname === "/admin/feedback"
                ? "Platform Feedback"
                : pathname === "/admin/members"
                  ? "Member Directory"
                  : pathname === "/admin/exports"
                    ? "Data Export"
                    : pathname === "/admin/spec"
                      ? "Admin Spec"
                      : pathname === "/admin/about"
                        ? "Content Management"
                        : "Overview";
  const headerKicker =
    pathname === "/admin/growth"
      ? "Insights"
      : pathname === "/admin/reviews"
        ? "Activity"
        : pathname === "/admin/inquiries"
          ? "Activity"
          : pathname === "/admin/brands"
            ? "Directory"
            : pathname === "/admin/brand-contacts"
              ? "Inbound"
              : pathname === "/admin/feedback"
                ? "Suggestions"
                : pathname === "/admin/members"
                  ? "Directory"
                  : pathname === "/admin/exports"
                    ? "Downloads"
                    : pathname === "/admin/spec"
                      ? "Documentation"
                      : pathname === "/admin/about"
                        ? "Content Management"
                        : "Admin Dashboard";

  return (
    <SidebarProvider defaultOpen>
      <Sidebar
        variant="inset"
        collapsible="icon"
        className="border-sidebar-border"
      >
        <SidebarHeader className="gap-3">
          <div className="flex items-center gap-3 px-2 py-1">
            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex size-9 items-center justify-center rounded-full">
              <span className="font-cormorant text-lg">S</span>
            </div>
            <div className="group-data-[collapsible=icon]:hidden">
              <p className="text-sm font-semibold tracking-wide">SUEDE</p>
              <p className="text-sidebar-foreground/60 text-xs">
                Admin Console
              </p>
            </div>
          </div>
          <SidebarSeparator />
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup className="px-0">
            <SidebarGroupLabel>Workspace</SidebarGroupLabel>
            <SidebarMenu>
              {primaryNav.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.label}
                    >
                      <Link href={item.href} className="font-medium">
                        <item.icon />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>

          <SidebarGroup className="px-0">
            <SidebarGroupLabel>Operations</SidebarGroupLabel>
            <SidebarMenu>
              {secondaryNav.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.label}
                    className={cn(
                      item.disabled &&
                        "hover:text-sidebar-foreground/60 pointer-events-none opacity-60 hover:bg-transparent",
                    )}
                  >
                    <Link
                      href={item.disabled ? "#" : item.href}
                      aria-disabled={item.disabled}
                      className="font-medium"
                      tabIndex={item.disabled ? -1 : 0}
                    >
                      <item.icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="gap-3">
          <SidebarSeparator />
          <div className="flex items-center gap-3 px-2 pt-1 pb-2">
            <div className="bg-sidebar-accent text-sidebar-accent-foreground flex size-9 items-center justify-center rounded-full">
              <CircleUser className="size-4" />
            </div>
            <div className="group-data-[collapsible=icon]:hidden">
              <p className="text-sm font-medium">Seeded Admin</p>
              <p className="text-sidebar-foreground/60 text-xs">
                admin@local.suede
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon-sm"
              className="ml-auto group-data-[collapsible=icon]:hidden"
              aria-label="Notifications"
            >
              <Bell className="size-4" />
            </Button>
          </div>

          <form action="/admin/logout" method="post" className="px-2 pb-2">
            <Button
              type="submit"
              variant="outline"
              className="w-full justify-start gap-2"
            >
              <span>Logout</span>
            </Button>
          </form>
        </SidebarFooter>
      </Sidebar>
      <SidebarRail />
      <SidebarInset className="bg-background min-h-svh">
        <header className="border-border bg-background/95 flex items-center gap-3 border-b px-4 py-3 backdrop-blur md:px-6">
          <SidebarTrigger className="md:hidden" />
          <div className="flex-1">
            <p className="text-muted-foreground text-[10px] font-semibold tracking-wider uppercase">
              {headerKicker}
            </p>
            <h1 className="font-cormorant text-2xl md:text-3xl">
              {headerTitle}
            </h1>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link href="/">View Site</Link>
          </Button>
        </header>
        <div className="px-4 py-6 md:px-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
