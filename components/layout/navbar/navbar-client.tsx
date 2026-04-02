"use client";

import type { ReactNode } from "react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/use-user";

import { Logo } from "./Logo";
import { AuthSection } from "./auth-section";
import { MobileMenu } from "./mobile";

interface NavbarClientProps {
  logoSlot: ReactNode;
}

export function NavbarClient({ logoSlot }: NavbarClientProps) {
  const { isAuthenticated } = useAuth();
  const pathname = usePathname();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const isHome = pathname === "/" || pathname === "/en" || pathname === "";

  useEffect(() => {
    setIsScrolled(false);
  }, [isHome]);

  const isHeroMode = isHome;

  // Use a more explicit background for the scrolled state
  const headerBgStyle = isHome ? "bg-transparent py-4" : "bg-transparent py-7";

  const navTextColor = isHeroMode ? "text-white" : "text-black";

  useEffect(() => {
    console.log("Navbar State:", { pathname, isHome, isScrolled, isHeroMode });
  }, [pathname, isHome, isScrolled, isHeroMode]);

  const navActiveColor = "text-[#4F0E19]";
  const navHoverColor = isHome ? "hover:text-white/80" : "hover:text-primary";

  const labels = {
    capsule: "The Capsule",
    lookbook: "The Lookbook",
    collective: "The Collective",
    consign: "The Consign",
    profile: "My Profile",
    notification: "Notification",
    leaveReview: "Leave a Review",
    writeInquiry: "Write an Inquiry",
    signOut: "Logout",
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


  const translations = {
    tooltipUser: labels.tooltipUser,
    tooltipLanguage: labels.tooltipLanguage,
    tooltipSignIn: labels.tooltipSignIn,
    tooltipRegister: labels.tooltipRegister,
    signedOutSuccess: labels.signedOutSuccess,
    user: labels.user,
    profile: labels.profile,
    notification: labels.notification,
    leaveReview: labels.leaveReview,
    writeInquiry: labels.writeInquiry,
    signOut: labels.signOut,
    signIn: labels.signIn,
    createAccount: labels.createAccount,
    capsule: labels.capsule,
    lookbook: labels.lookbook,
    collective: labels.collective,
    consign: labels.consign,
  };

  const headerBaseClass = "fixed top-0 z-50 w-full px-4 md:px-0";
  const headerMotionClass = isHome ? "transition-all duration-300" : "";

  return (
    <header className={`${headerBaseClass} ${headerMotionClass} ${headerBgStyle}`}>
      <div className="container mx-auto flex items-center justify-between">
        <div className={navTextColor}>
          <Logo isHeroMode={isHeroMode} />
        </div>

        {/* MainNav is now replaced by Hamburger on all pages/scrolled states as per minimalist request */}

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

          {/* Mobile Menu: Hide on Home, show on all other pages and devices */}
          {!isHome && (
            <MobileMenu
              isOpen={isDrawerOpen}
              setIsOpen={setIsDrawerOpen}
              isAuthenticated={isAuthenticated}
              translations={translations}
              showOnDesktop={true}
            />
          )}
        </div>
      </div>
    </header>
  );
}
