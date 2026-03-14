"use client";

import Link from "next/link";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import {
  Menu,
  User,
  Ruler,
  ShoppingBag,
  LogOut,
  Heart,
  Search,
} from "lucide-react";
import { useAuth } from "@/hooks/use-user";
import { createClient } from "@/lib/supabase/client";
import MotionDrawer from "@/components/motion-drawer";
import { useEffect, useRef, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { usePathname } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";

export function Navbar() {
  const t = useTranslations("Navbar");
  const { user, isLoading, isAuthenticated } = useAuth();
  const pathname = usePathname();
  const locale = useLocale();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const searchContainerRef = useRef<HTMLDivElement | null>(null);

  const isHome = pathname === "/";
  const navTextColor = isHome ? "text-white" : "text-[#1A1A1A]";
  const navActiveColor = isHome ? "text-white" : "text-[#1A1A1A]";
  const navHoverColor = isHome ? "hover:text-white/80" : "hover:text-primary";

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    toast.success(t("signedOutSuccess"));
    window.location.reload();
  };

  useEffect(() => {
    if (!isSearchOpen) {
      return;
    }

    const handleOutsideClick = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      if (!searchContainerRef.current?.contains(target)) {
        setIsSearchOpen(false);
        setSearchValue("");
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsSearchOpen(false);
        setSearchValue("");
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isSearchOpen]);

  return (
    <header className="fixed top-0 z-50 w-full px-4 md:px-0">
      <div className="container mx-auto flex h-16 items-center justify-between">
        {/* Logo */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href="/" className="flex items-center gap-2">
              <span
                className={`${navTextColor} font-logo font-serif text-2xl tracking-[40%] uppercase`}
              >
                SUEDE
              </span>
            </Link>
          </TooltipTrigger>
          <TooltipContent>{t("tooltipHome")}</TooltipContent>
        </Tooltip>

        <nav className="hidden items-center gap-6 md:flex">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/the-capsule"
                className={`font-darker text-[16px] uppercase ${navTextColor} ${navHoverColor} transition-colors`}
              >
                {t("capsule")}
              </Link>
            </TooltipTrigger>
            <TooltipContent>{t("tooltipCapsule")}</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/the-lookbook"
                className={`font-darker text-[16px] uppercase ${navTextColor} ${navHoverColor} transition-colors`}
              >
                {t("lookbook")}
              </Link>
            </TooltipTrigger>
            <TooltipContent>{t("tooltipLookbook")}</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/the-collective"
                className={`font-darker text-[16px] uppercase ${navTextColor} ${navHoverColor} transition-colors`}
              >
                {t("collective")}
              </Link>
            </TooltipTrigger>
            <TooltipContent>{t("tooltipCollective")}</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/the-consign"
                className={`font-darker text-[16px] uppercase ${navTextColor} ${navHoverColor} transition-colors`}
              >
                {t("consign")}
              </Link>
            </TooltipTrigger>
            <TooltipContent>{t("tooltipConsign")}</TooltipContent>
          </Tooltip>
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {isLoading ? (
            <LoadingSpinner size="sm" />
          ) : isAuthenticated ? (
            <DropdownMenu>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-9 w-9 rounded-full"
                    >
                      <Avatar className="h-9 w-9">
                        <AvatarImage
                          src={user?.user_metadata?.avatar_url}
                          alt={user?.email || ""}
                        />
                        <AvatarFallback>
                          {user?.email?.[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent>{t("tooltipUser")}</TooltipContent>
              </Tooltip>

              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-darker uppercase">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm leading-none font-medium">
                      {user?.user_metadata?.full_name || t("user")}
                    </p>
                    <p className="text-muted-foreground text-xs leading-none">
                      {user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    {t("profile")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile/measurements" className="cursor-pointer">
                    <Ruler className="mr-2 h-4 w-4" />
                    {t("measurements")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/favorites" className="cursor-pointer">
                    <Heart className="mr-2 h-4 w-4" />
                    {t("favorites")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/my-listings" className="cursor-pointer">
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    {t("listings")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer text-red-600 focus:text-red-600"
                  onClick={handleSignOut}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  {t("signOut")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden items-center gap-2 md:flex">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    ref={searchContainerRef}
                    className="border-border flex items-center gap-2 border-r pr-4 text-sm"
                  >
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className={`h-8 w-8 hover:bg-primary rounded-full ${navTextColor} ${navHoverColor}`}
                      onClick={() => setIsSearchOpen((prev) => !prev)}
                      aria-label="Toggle search"
                    >
                      <Search className="h-4 w-4" />
                    </Button>
                    {isSearchOpen && (
                      <Input
                        value={searchValue}
                        onChange={(event) => setSearchValue(event.target.value)}
                        placeholder="Search"
                        autoFocus
                        className="h-8 w-36 rounded-md border-[#2A2A2A] bg-[#1A1A1A] text-xs text-white placeholder:text-white/60 md:w-44"
                      />
                    )}
                    <Link
                      href={`/en${pathname === "/" ? "" : pathname}`}
                      className={`transition-colors ${locale === "en" ? `${navActiveColor} font-semibold underline underline-offset-4` : `${navTextColor} ${navHoverColor}`}`}
                    >
                      EN
                    </Link>
                    <span className={`mx-1 ${navTextColor}`}>/</span>
                    <Link
                      href={`/fr${pathname === "/" ? "" : pathname}`}
                      className={`transition-colors ${locale === "fr" ? `${navActiveColor} font-semibold underline underline-offset-4` : `${navTextColor} ${navHoverColor}`}`}
                    >
                      FR
                    </Link>
                  </div>
                </TooltipTrigger>
                <TooltipContent>{t("tooltipLanguage")}</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={"link"}
                    asChild
                    className="font-darker-grotesque text-lg font-medium"
                  >
                    <Link href="/auth/login">{t("signIn")}</Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{t("tooltipSignIn")}</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    asChild
                    className="h-10.5 rounded-none text-[16px] uppercase"
                  >
                    <Link href="/auth/register">{t("createAccount")}</Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{t("tooltipRegister")}</TooltipContent>
              </Tooltip>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <Button
            size="icon"
            className="md:hidden"
            onClick={() => setIsDrawerOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Mobile Menu Drawer */}
          <MotionDrawer
            isOpen={isDrawerOpen}
            onToggle={setIsDrawerOpen}
            direction="right"
            showToggleButton={false}
            showCloseButton={true}
            width={300}
            backgroundColor="white"
            contentClassName="border-l border-border"
            className="md:hidden"
          >
            <nav className="flex flex-col gap-6">
              <Link
                href="/the-capsule"
                className="text-foreground hover:text-primary text-xl font-medium transition-colors"
                onClick={() => setIsDrawerOpen(false)}
              >
                {t("capsule")}
              </Link>
              <Link
                href="/the-lookbook"
                className="text-foreground hover:text-primary text-xl font-medium transition-colors"
                onClick={() => setIsDrawerOpen(false)}
              >
                {t("lookbook")}
              </Link>
              <Link
                href="/the-collective"
                className="text-foreground hover:text-primary text-xl font-medium transition-colors"
                onClick={() => setIsDrawerOpen(false)}
              >
                {t("collective")}
              </Link>
              <Link
                href="/the-consign"
                className="text-foreground hover:text-primary text-xl font-medium transition-colors"
                onClick={() => setIsDrawerOpen(false)}
              >
                {t("consign")}
              </Link>

              {!isAuthenticated && (
                <div className="mt-4 flex flex-col gap-3">
                  <Button
                    asChild
                    variant="outline"
                    className="text-md h-12 rounded-none font-medium"
                    onClick={() => setIsDrawerOpen(false)}
                  >
                    <Link href="/auth/login">{t("signIn")}</Link>
                  </Button>
                  <Button
                    asChild
                    className="h-12 rounded-none uppercase"
                    onClick={() => setIsDrawerOpen(false)}
                  >
                    <Link href="/auth/register">{t("createAccount")}</Link>
                  </Button>
                </div>
              )}

              {/* Language Switcher for Mobile */}
              <div className="border-border mt-6 flex items-center border-t pt-6 text-sm">
                <Link
                  href={`/en${pathname === "/" ? "" : pathname}`}
                  className={`text-lg transition-colors ${locale === "en" ? "text-primary font-semibold" : "text-muted-foreground hover:text-primary"}`}
                  onClick={() => setIsDrawerOpen(false)}
                >
                  EN
                </Link>
                <span className="text-muted-foreground mx-3">/</span>
                <Link
                  href={`/fr${pathname === "/" ? "" : pathname}`}
                  className={`text-lg transition-colors ${locale === "fr" ? "text-primary font-semibold" : "text-muted-foreground hover:text-primary"}`}
                  onClick={() => setIsDrawerOpen(false)}
                >
                  FR
                </Link>
              </div>
            </nav>
          </MotionDrawer>
        </div>
      </div>
    </header>
  );
}
