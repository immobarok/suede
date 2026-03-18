"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/use-user";

import { MainNav } from "./main-nav";
import { AuthSection } from "./auth-section";
import { MobileMenu } from "./mobile";

interface NavbarClientProps {
  logoSlot: ReactNode;
}

export function NavbarClient({ logoSlot }: NavbarClientProps) {
  const { isAuthenticated } = useAuth();
  const pathname = usePathname();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const isHome = pathname === "/";
  const navTextColor = isHome ? "text-white" : "text-[#1A1A1A]";
  const navActiveColor = "text-[#4F0E19]";
  const navHoverColor = isHome ? "hover:text-white/80" : "hover:text-primary";

  const labels = {
    capsule: "The Capsule",
    lookbook: "The Lookbook",
    collective: "The Collective",
    consign: "The Consign",
    profile: "Profile",
    measurements: "My Measurements",
    favorites: "Favorites",
    listings: "My Listings",
    signOut: "Sign out",
    signedOutSuccess: "Signed out successfully",
    signIn: "Sign in",
    createAccount: "Create Account",
    user: "User",
    tooltipHome: "Go to Home",
    tooltipCapsule: "The Capsule collection",
    tooltipLookbook: "The Lookbook",
    tooltipCollective: "The Collective",
    tooltipConsign: "The Consign",
    tooltipUser: "User Settings",
    tooltipLanguage: "Switch language",
    tooltipSignIn: "Sign in to your account",
    tooltipRegister: "Create a new account",
  };

  const navItems = [
    {
      href: "/the-capsule",
      label: labels.capsule,
      tooltip: labels.tooltipCapsule,
    },
    {
      href: "/the-lookbook",
      label: labels.lookbook,
      tooltip: labels.tooltipLookbook,
    },
    {
      href: "/the-collective",
      label: labels.collective,
      tooltip: labels.tooltipCollective,
    },
    {
      href: "/the-consign",
      label: labels.consign,
      tooltip: labels.tooltipConsign,
    },
  ];

  const translations = {
    tooltipUser: labels.tooltipUser,
    tooltipLanguage: labels.tooltipLanguage,
    tooltipSignIn: labels.tooltipSignIn,
    tooltipRegister: labels.tooltipRegister,
    signedOutSuccess: labels.signedOutSuccess,
    user: labels.user,
    profile: labels.profile,
    measurements: labels.measurements,
    favorites: labels.favorites,
    listings: labels.listings,
    signOut: labels.signOut,
    signIn: labels.signIn,
    createAccount: labels.createAccount,
    capsule: labels.capsule,
    lookbook: labels.lookbook,
    collective: labels.collective,
    consign: labels.consign,
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
