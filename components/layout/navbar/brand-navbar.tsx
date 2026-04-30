"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { useState } from "react";
import { BrandMobileMenu } from "./brand-mobile-menu";

export function BrandNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 z-50 w-full bg-white/80 backdrop-blur-md px-6 py-4 md:py-8">
        <div className="container mx-auto relative flex items-center justify-end">
          {/* Logo removed from here and moved to the page content */}

          {/* Hamburger Menu on the right */}
          <div className="absolute right-0 flex items-center">
            <button 
              onClick={() => setIsOpen(true)}
              className="p-2 text-black hover:opacity-70 transition-opacity"
              aria-label="Menu"
            >
              <Menu size={28} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      <BrandMobileMenu 
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </>
  );
}
