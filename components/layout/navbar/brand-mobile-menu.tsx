"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import MotionDrawer from "@/components/shared/motion-drawer";
import { LogoSmall } from "./LogoSmall";

interface BrandMobileMenuProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export function BrandMobileMenu({
  isOpen,
  setIsOpen,
}: BrandMobileMenuProps) {
  const brandLinks = [
    { href: "#", label: "Brand Owner" },
    { href: "#", label: "Brand PR" },
    { href: "#", label: "Brand Operations" },
    { href: "#", label: "Other" },
  ];

  return (
    <MotionDrawer
      isOpen={isOpen}
      onToggle={setIsOpen}
      direction="right"
      showToggleButton={false}
      showCloseButton={false}
      width={320}
      backgroundColor="#ffffff"
      contentClassName="border-l border-black/10 shadow-2xl"
    >
      <div className="flex flex-col h-full min-h-[500px] overflow-x-hidden">
        {/* Close button and Logo */}
        <div className="flex items-center justify-between mb-16">
          <LogoSmall />
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 text-black hover:bg-black/5 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Links with explicit visibility test */}
        <div className="flex flex-col space-y-10">
          <p className="text-[10px] uppercase font-bold text-black/40 tracking-[0.3em]">
            Select Your Role
          </p>
          <nav className="flex flex-col space-y-6">
            {brandLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block text-black hover:text-[#4F0E19] text-2xl font-serif italic transition-all transform hover:translate-x-2 pr-4 py-2"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Footer info */}
        <div className="mt-auto pt-10 border-t border-black/5">
          <Button 
            asChild
            className="w-full bg-black text-white hover:bg-black/90 rounded-none h-14 uppercase text-[12px] tracking-widest font-bold shadow-lg"
            onClick={() => setIsOpen(false)}
          >
            <Link href="/auth/login">Sign In</Link>
          </Button>
          <div className="mt-8 flex justify-center">
            <p className="text-[9px] text-black/30 uppercase tracking-[0.4em] font-medium">
              Suede Collective
            </p>
          </div>
        </div>
      </div>
    </MotionDrawer>
  );
}
