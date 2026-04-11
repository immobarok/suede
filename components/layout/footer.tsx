"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Logo } from "./navbar/Logo";
import Image from "next/image";
import { usePathname } from "next/navigation";

// Data for navigation links
export function Footer() {
  const pathname = usePathname();

  if (pathname.startsWith("/consultation")) {
    return null;
  }

  const copy = {
    tagline:
      "The fashion trust platform. See how clothes really fit on bodies like yours.",
    platform: "Platform",
    company: "Company",
    capsule: "The Capsule",
    lookbook: "The Lookbook",
    collective: "The Collective",
    consign: "The Consign",
    about: "About",
    brandPartner: "Capsule Brand Partner",
    privacy: "Privacy",
    newsletterTitle: "Per Suede Newsletter",
    newsletterTagline:
      "Stay ahead of fit. Get curated reviews and style insights.",
    emailPlaceholder: "Your email",
    joinWaitlist: "Join The Waitlist",
    allRightsReserved: "All rights reserved.",
    terms: "Terms",
  };

  // Data for navigation links
  const platformLinks = [
    { label: copy.capsule, href: "#" },
    { label: copy.lookbook, href: "#" },
    { label: copy.collective, href: "#" },
    { label: copy.consign, href: "#" },
  ];

  const companyLinks = [
    { label: copy.about, href: "/about" },
    { label: copy.brandPartner, href: "#" },
    { label: copy.privacy, href: "#" },
  ];

  return (
    <footer className="text-primary-foreground bg-[#111111] py-16 text-sm font-light">
      <div className="container mx-auto px-6 md:px-0">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8 lg:gap-16">
          {/* Brand Section (Left) */}
          <div className="flex flex-col gap-6 md:col-span-4">
            <Image
              src="/logo-white.svg"
              alt="Suede Logo"
              width={120}
              height={40}
              className="object-contain"
            />
            <p className="text-primary-foreground/70 max-w-xs leading-relaxed">
              {copy.tagline}
            </p>
          </div>

          {/* Links Section (Middle) */}
          <div className="grid grid-cols-2 gap-8 md:col-span-4">
            {/* Column 1 */}
            <div className="flex flex-col gap-4">
              <h3 className="text-primary-foreground mb-2 text-xs font-semibold tracking-widest uppercase">
                {copy.platform}
              </h3>
              <ul className="flex flex-col gap-3">
                {platformLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-4">
              <h3 className="text-primary-foreground mb-2 text-xs font-semibold tracking-widest uppercase">
                {copy.company}
              </h3>
              <ul className="flex flex-col gap-3">
                {companyLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter Section (Right) */}
          <div className="flex flex-col gap-4 md:col-span-4">
            <h3 className="text-primary-foreground mb-2 text-xs font-semibold tracking-widest uppercase">
              {copy.newsletterTitle}
            </h3>
            <p className="text-primary-foreground/70 mb-2 leading-relaxed">
              {copy.newsletterTagline}
            </p>
            <form className="flex w-full max-w-sm items-center">
              <div className="relative flex w-full">
                <Input
                  type="email"
                  placeholder={copy.emailPlaceholder}
                  className="h-12 rounded-none border-none bg-[#222222] text-white placeholder:text-zinc-600 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                <Button
                  type="submit"
                  className="h-12 cursor-pointer rounded-none bg-[#F8F7F2] px-6 text-xs font-semibold tracking-wider whitespace-nowrap text-black uppercase hover:bg-[#ffffff]"
                >
                  {copy.joinWaitlist}
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Separator */}
        <Separator className="my-12 bg-zinc-800" />

        {/* Bottom Bar */}
        <div className="text-primary-foreground flex flex-col items-center justify-between gap-4 text-xs md:flex-row">
          <p>© 2026 SUEDE. {copy.allRightsReserved}</p>
          <div className="flex gap-6">
            <Link href="#" className="transition-colors hover:text-white">
              {copy.privacy}
            </Link>
            <Link href="#" className="transition-colors hover:text-white">
              {copy.terms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
