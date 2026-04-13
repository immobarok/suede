"use client";

import Link from "next/link";
import { toast } from "sonner";
import { User, Bell, Star, MessageSquare, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/hooks/use-user";
import { usePathname } from "next/navigation";
import { SearchComponent } from "./search";
import Icon from "@/components/Icon";

interface AuthSectionProps {
  navTextColor: string;
  navHoverColor: string;
  navActiveColor: string;
  isSearchOpen: boolean;
  setIsSearchOpen: (value: boolean) => void;
  searchValue: string;
  setSearchValue: (value: string) => void;
  translations: Record<string, string>;
}

export function AuthSection({
  navTextColor,
  navHoverColor,
  isSearchOpen,
  setIsSearchOpen,
  searchValue,
  setSearchValue,
  translations: t,
}: AuthSectionProps) {
  const { user, isLoading, isAuthenticated, profileAvatarUrl } = useAuth();
  const pathname = usePathname();
  console.log(profileAvatarUrl);

  // Determine active tab from current pathname
  const activeTab = pathname === "auth/register" ? "register" : "signin";

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    toast.success(t.signedOutSuccess);
    window.location.reload();
  };

  if (isLoading) {
    return <LoadingSpinner size="sm" />;
  }

  return (
    <div className="hidden items-center gap-4 md:flex">
      <SearchComponent
        isSearchOpen={isSearchOpen}
        setIsSearchOpen={setIsSearchOpen}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        navTextColor={navTextColor}
        navHoverColor={navHoverColor}
      />

      {isAuthenticated ? (
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <Button className="group flex h-10 w-10 items-center justify-center rounded-full bg-black transition-all duration-300 hover:scale-105 hover:bg-black/90">
                    <Icon
                      src="/icons/plus.svg"
                      className="text-white transition-transform duration-300 group-hover:rotate-90"
                    />
                    {/* <Plus className="h-5 w-5 text-white transition-transform duration-300 group-hover:rotate-90" /> */}
                  </Button>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent>{t.tooltipUser}</TooltipContent>
            </Tooltip>

            <DropdownMenuContent
              className="w-56 rounded-none border-gray-200 bg-white p-0 text-black shadow-lg"
              align="end"
              forceMount
            >
              <DropdownMenuItem
                asChild
                className="rounded-none px-4 py-3 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black"
              >
                <Link
                  href="/reviews"
                  className="flex cursor-pointer items-center gap-3"
                >
                  <Star className="h-4 w-4" />
                  <span className="font-medium">{t.leaveReview}</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                asChild
                className="rounded-none px-4 py-3 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black"
              >
                <Link
                  href="/inquiry"
                  className="flex cursor-pointer items-center gap-3"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span className="font-medium">{t.writeInquiry}</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <Button className="relative flex h-9.75 w-9.75 items-center justify-center rounded-full border-2 border-white bg-black p-0 outline-none hover:bg-black/90 focus:ring-0 focus-visible:border-white focus-visible:ring-0 active:bg-black">
                    <Avatar className="h-9.25 w-9.25">
                      <AvatarImage
                        src={
                          profileAvatarUrl || user?.user_metadata?.avatar_url
                        }
                        alt={user?.email || ""}
                      />
                      <AvatarFallback className="bg-[#3E3E3E] text-white">
                        {user?.email?.[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent>{t.tooltipUser}</TooltipContent>
            </Tooltip>

            <DropdownMenuContent
              className="w-56 rounded-none border-gray-200 bg-white p-0 text-black shadow-lg"
              align="end"
              forceMount
            >
              <DropdownMenuItem
                asChild
                className="rounded-none px-4 py-3 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black"
              >
                <Link
                  href="/profile"
                  className="flex cursor-pointer items-center gap-3"
                >
                  <User className="h-4 w-4" />
                  <span className="font-medium">{t.profile}</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                asChild
                className="rounded-none px-4 py-3 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black"
              >
                <Link
                  href="/notifications"
                  className="flex cursor-pointer items-center gap-3"
                >
                  <Bell className="h-4 w-4" />
                  <span className="font-medium">{t.notification}</span>
                </Link>
              </DropdownMenuItem>
              <div className="mx-0 h-px bg-gray-100" />
              <DropdownMenuItem
                className="flex cursor-pointer items-center gap-3 rounded-none px-4 py-3 text-red-600 hover:bg-red-50 hover:text-red-700 focus:bg-red-50 focus:text-red-700"
                onClick={handleSignOut}
              >
                <LogOut className="h-4 w-4" />
                <span className="font-medium">{t.signOut}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        /* --- PILL AUTH BUTTONS with animated sliding border --- */
        <div className="relative flex h-9.75 items-center rounded-full border-2 border-white bg-black">
          {/* Sign In tab */}
          <Link
            href="login"
            className="relative flex h-full items-center px-7 text-[15px] font-medium text-white transition-colors duration-200"
          >
            {activeTab === "signin" && (
              <motion.span
                layoutId="auth-pill-border"
                className="absolute inset-0 z-0 rounded-full border-r-2 border-white bg-[#3E3E3E]"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10">{t.signIn}</span>
          </Link>

          {/* Create Account tab */}
          <Link
            href="register"
            className="relative flex h-full items-center px-4 text-[15px] font-medium whitespace-nowrap text-white transition-colors duration-200"
          >
            {activeTab === "register" && (
              <motion.span
                layoutId="auth-pill-border"
                className="absolute inset-0 z-0 rounded-full border-l-2 border-white bg-[#3E3E3E]"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10">{t.createAccount}</span>
          </Link>
        </div>
      )}
    </div>
  );
}
