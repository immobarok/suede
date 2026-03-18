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
    <div className="hidden items-center gap-1 md:flex">
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
                <Button className="relative h-9 items-center gap-1 rounded-full bg-transparent px-2 hover:bg-transparent active:bg-transparent">
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
                <p className="text-sm leading-none font-medium">
                  {user?.user_metadata?.full_name || t.user}
                </p>
                <p className="text-muted-foreground text-xs leading-none">
                  {user?.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              asChild
              className="hover:text-white focus:text-white"
            >
              <Link href="/profile" className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                {t.profile}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              asChild
              className="hover:text-white focus:text-white"
            >
              <Link href="/profile/measurements" className="cursor-pointer">
                <Ruler className="mr-2 h-4 w-4" />
                {t.measurements}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              asChild
              className="hover:text-white focus:text-white"
            >
              <Link href="/favorites" className="cursor-pointer">
                <Heart className="mr-2 h-4 w-4" />
                {t.favorites}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              asChild
              className="hover:text-white focus:text-white"
            >
              <Link href="/my-listings" className="cursor-pointer">
                <ShoppingBag className="mr-2 h-4 w-4" />
                {t.listings}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer text-red-600 hover:text-white focus:text-white"
              onClick={handleSignOut}
            >
              <LogOut className="mr-2 h-4 w-4" />
              {t.signOut}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="link"
                asChild
                className="font-darker-grotesque text-lg font-medium"
              >
                <Link href="/auth/login">{t.signIn}</Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>{t.tooltipSignIn}</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                asChild
                className="h-10.5 rounded-none text-[16px] uppercase"
              >
                <Link href="/auth/register">{t.createAccount}</Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>{t.tooltipRegister}</TooltipContent>
          </Tooltip>
        </>
      )}
    </div>
  );
}
