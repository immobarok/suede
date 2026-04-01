"use client";

import Link from "next/link";
import { toast } from "sonner";
import {
  ChevronDown,
  User,
  Ruler,
  ShoppingBag,
  LogOut,
  Heart,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
  const { user, isLoading, isAuthenticated } = useAuth();
  const pathname = usePathname();
  
  // Determine active tab from current pathname
  const activeTab = pathname === "/auth/register" ? "register" : "signin";

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
        <DropdownMenu>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <Button className="relative h-9 items-center gap-1 rounded-full bg-transparent px-2 outline-none hover:bg-transparent focus:ring-0 focus-visible:border-transparent focus-visible:ring-0 active:bg-transparent">
                  <Avatar className="h-9 w-9">
                    <AvatarImage
                      src={user?.user_metadata?.avatar_url}
                      alt={user?.email || ""}
                    />
                    <AvatarFallback>
                      {user?.email?.[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <ChevronDown className="text-muted-foreground h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent>{t.tooltipUser}</TooltipContent>
          </Tooltip>

          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-darker uppercase">
              <div className="flex flex-col space-y-1">
                <p className="text-xs leading-none font-medium text-black">
                  {user?.user_metadata?.full_name || t.user}
                </p>
                <p className="text-xs leading-none font-medium text-black">
                  {user?.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="hover:bg-primary hover:text-white focus:bg-primary focus:text-white">
              <Link href="/profile" className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                {t.profile}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="hover:bg-primary hover:text-white focus:bg-primary focus:text-white">
              <Link href="/profile/measurements" className="cursor-pointer">
                <Ruler className="mr-2 h-4 w-4" />
                {t.measurements}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="hover:bg-primary hover:text-white focus:bg-primary focus:text-white">
              <Link href="/favorites" className="cursor-pointer">
                <Heart className="mr-2 h-4 w-4" />
                {t.favorites}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="hover:bg-primary hover:text-white focus:bg-primary focus:text-white">
              <Link href="/my-listings" className="cursor-pointer">
                <ShoppingBag className="mr-2 h-4 w-4" />
                {t.listings}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer text-red-600 hover:bg-primary hover:text-white focus:bg-primary focus:text-white"
              onClick={handleSignOut}
            >
              <LogOut className="mr-2 h-4 w-4" />
              {t.signOut}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        /* --- PILL AUTH BUTTONS with animated sliding border --- */
        <div className="relative flex h-[39px] items-center rounded-full bg-black border-2 border-white">
          {/* Sign In tab */}
          <Link
            href="/auth/login"
            className="relative flex h-full items-center px-7 text-[15px] font-medium text-white transition-colors duration-200"
          >
            {activeTab === "signin" && (
              <motion.span
                layoutId="auth-pill-border"
                className="absolute inset-0 z-0 rounded-full bg-[#3E3E3E] border-r-2 border-white"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10">{t.signIn}</span>
          </Link>

          {/* Create Account tab */}
          <Link
            href="/auth/register"
            className="relative flex h-full items-center px-4 text-[15px] font-medium whitespace-nowrap text-white transition-colors duration-200"
          >
            {activeTab === "register" && (
              <motion.span
                layoutId="auth-pill-border"
                className="absolute inset-0 z-0 rounded-full bg-[#3E3E3E] border-l-2 border-white"
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