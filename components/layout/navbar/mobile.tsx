"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import MotionDrawer from "@/components/shared/motion-drawer";

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  isAuthenticated: boolean;
  translations: Record<string, string>;
  showOnDesktop?: boolean;
}

export function MobileMenu({
  isOpen,
  setIsOpen,
  isAuthenticated,
  translations: t,
  showOnDesktop = false,
}: MobileMenuProps) {
  const navItems = [
    { href: "/the-capsule", label: t.capsule },
    { href: "/the-lookbook", label: t.lookbook },
    { href: "/the-collective", label: t.collective },
    { href: "/the-consign", label: t.consign },
  ];

  return (
    <>
      <Button
        size="icon"
        className={`${showOnDesktop ? "flex" : "md:hidden"} bg-transparent hover:bg-transparent active:bg-transparent shadow-none`}
        onClick={() => setIsOpen(true)}
      >
        <Menu className="h-6! w-6! text-black" />
      </Button>

      <MotionDrawer
        isOpen={isOpen}
        onToggle={setIsOpen}
        direction="right"
        showToggleButton={false}
        showCloseButton={true}
        width={300}
        backgroundColor="white"
        contentClassName="border-l border-border"
        className={showOnDesktop ? "" : "md:hidden"}
      >
        <nav className="flex flex-col gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-black hover:text-primary text-xl font-medium transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}

          {!isAuthenticated && (
            <div className="mt-4 flex flex-col gap-3">
              <Button
                asChild
                variant="outline"
                className="text-md h-12 rounded-none font-medium"
                onClick={() => setIsOpen(false)}
              >
                <Link href="/auth/login">{t.signIn}</Link>
              </Button>
              <Button
                asChild
                className="h-12 rounded-none uppercase"
                onClick={() => setIsOpen(false)}
              >
                <Link href="/auth/register">{t.createAccount}</Link>
              </Button>
            </div>
          )}
        </nav>
      </MotionDrawer>
    </>
  );
}
