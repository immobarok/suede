"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useAuth } from "@/hooks/use-user";

import { MainNav } from "./main-nav";
import { AuthSection } from "./auth-section";
import { MobileMenu } from "./mobile";

interface NavbarClientProps {
  logoSlot: ReactNode;
}

export function NavbarClient({ logoSlot }: NavbarClientProps) {
  const t = useTranslations("Navbar");
  const { isAuthenticated } = useAuth();
  const pathname = usePathname();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const isHome = pathname === "/";
  const navTextColor = isHome ? "text-white" : "text-[#1A1A1A]";
  const navActiveColor = "text-[#4F0E19]";
  const navHoverColor = isHome ? "hover:text-white/80" : "hover:text-primary";

  const navItems = [
    { href: "/the-capsule", label: t("capsule"), tooltip: t("tooltipCapsule") },
    {
      href: "/the-lookbook",
      label: t("lookbook"),
      tooltip: t("tooltipLookbook"),
    },
    {
      href: "/the-collective",
      label: t("collective"),
      tooltip: t("tooltipCollective"),
    },
    { href: "/the-consign", label: t("consign"), tooltip: t("tooltipConsign") },
  ];

  const translations = {
    tooltipUser: t("tooltipUser"),
    tooltipLanguage: t("tooltipLanguage"),
    tooltipSignIn: t("tooltipSignIn"),
    tooltipRegister: t("tooltipRegister"),
    signedOutSuccess: t("signedOutSuccess"),
    user: t("user"),
    profile: t("profile"),
    measurements: t("measurements"),
    favorites: t("favorites"),
    listings: t("listings"),
    signOut: t("signOut"),
    signIn: t("signIn"),
    createAccount: t("createAccount"),
    capsule: t("capsule"),
    lookbook: t("lookbook"),
    collective: t("collective"),
    consign: t("consign"),
  };

  return (
    <header className="fixed top-0 z-50 w-full px-4 md:px-0">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <div className={navTextColor}>{logoSlot}</div>

        <MainNav
          navItems={navItems}
          navTextColor={navTextColor}
          navActiveColor={navActiveColor}
          navHoverColor={navHoverColor}
        />

        <div className="flex items-center gap-4">
          <AuthSection
            navTextColor={navTextColor}
            navHoverColor={navHoverColor}
            navActiveColor={navActiveColor}
            isSearchOpen={isSearchOpen}
            setIsSearchOpen={setIsSearchOpen}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            translations={translations}
          />

          <MobileMenu
            isOpen={isDrawerOpen}
            setIsOpen={setIsDrawerOpen}
            isAuthenticated={isAuthenticated}
            translations={translations}
          />
        </div>
      </div>
    </header>
  );
}
