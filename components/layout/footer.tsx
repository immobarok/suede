import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useTranslations } from "next-intl";
import { Logo } from "./navbar/Logo";

// Data for navigation links
export function Footer() {
  const t = useTranslations("Footer");

  // Data for navigation links
  const platformLinks = [
    { label: t("capsule"), href: "#" },
    { label: t("lookbook"), href: "#" },
    { label: t("collective"), href: "#" },
    { label: t("consign"), href: "#" },
  ];

  const companyLinks = [
    { label: t("about"), href: "#" },
    { label: t("brandPartner"), href: "#" },
    { label: t("privacy"), href: "#" },
  ];

  return (
    <footer className="text-primary-foreground bg-[#111111] py-16 text-sm font-light">
      <div className="container mx-auto px-6 md:px-0">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8 lg:gap-16">
          {/* Brand Section (Left) */}
          <div className="flex flex-col gap-6 md:col-span-4">
            <Logo />
            <p className="text-primary-foreground/70 max-w-xs leading-relaxed">
              {t("tagline")}
            </p>
          </div>

          {/* Links Section (Middle) */}
          <div className="grid grid-cols-2 gap-8 md:col-span-4">
            {/* Column 1 */}
            <div className="flex flex-col gap-4">
              <h3 className="mb-2 text-xs font-semibold tracking-widest text-primary-foreground uppercase">
                {t("platform")}
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
              <h3 className="mb-2 text-xs font-semibold tracking-widest text-primary-foreground uppercase">
                {t("company")}
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
            <h3 className="mb-2 text-xs font-semibold tracking-widest text-primary-foreground uppercase">
              {t("newsletterTitle")}
            </h3>
            <p className="text-primary-foreground/70 mb-2 leading-relaxed">
              {t("newsletterTagline")}
            </p>
            <form className="flex w-full max-w-sm items-center">
              <div className="relative flex w-full">
                <Input
                  type="email"
                  placeholder={t("emailPlaceholder")}
                  className="h-12 rounded-none border-none bg-[#222222] text-white placeholder:text-zinc-600 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                <Button
                  type="submit"
                  className="h-12 cursor-pointer rounded-none bg-[#C9A96E] px-6 text-xs font-semibold tracking-wider whitespace-nowrap text-black uppercase hover:bg-[#C9A96E]/80"
                >
                  {t("joinWaitlist")}
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Separator */}
        <Separator className="my-12 bg-zinc-800" />

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 text-xs text-primary-foreground md:flex-row">
          <p>© 2026 SUEDE. {t("allRightsReserved")}</p>
          <div className="flex gap-6">
            <Link href="#" className="transition-colors hover:text-white">
              {t("privacy")}
            </Link>
            <Link href="#" className="transition-colors hover:text-white">
              {t("terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
