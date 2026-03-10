import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useTranslations } from "next-intl"

// Data for navigation links
export function Footer() {
  const t = useTranslations("Footer")
  
  // Data for navigation links
  const platformLinks = [
    { label: t("capsule"), href: "#" },
    { label: t("lookbook"), href: "#" },
    { label: t("collective"), href: "#" },
    { label: t("consign"), href: "#" },
  ]

  const companyLinks = [
    { label: t("about"), href: "#" },
    { label: t("brandPartner"), href: "#" },
    { label: t("privacy"), href: "#" },
  ]

  return (
    <footer className="bg-[#111111] text-zinc-400 py-16 text-sm font-light">
      <div className="container mx-auto px-6 md:px-0">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 lg:gap-16">
          
          {/* Brand Section (Left) */}
          <div className="md:col-span-4 flex flex-col gap-6">
            <h2 className="text-muted-foreground text-2xl font-serif tracking-[40%] uppercase font-logo">
              SUEDE
            </h2>
            <p className="leading-relaxed max-w-xs text-accent/70">
              {t("tagline")}
            </p>
          </div>

          {/* Links Section (Middle) */}
          <div className="md:col-span-4 grid grid-cols-2 gap-8">
            {/* Column 1 */}
            <div className="flex flex-col gap-4">
              <h3 className="text-zinc-600 text-xs font-semibold tracking-widest uppercase mb-2">
                {t("platform")}
              </h3>
              <ul className="flex flex-col gap-3">
                {platformLinks.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-accent/70 hover:text-accent transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-4">
              <h3 className="text-zinc-600 text-xs font-semibold tracking-widest uppercase mb-2">
                {t("company")}
              </h3>
              <ul className="flex flex-col gap-3">
                {companyLinks.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-accent/70 hover:text-accent transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter Section (Right) */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <h3 className="text-zinc-600 text-xs font-semibold tracking-widest uppercase mb-2">
              {t("newsletterTitle")}
            </h3>
            <p className="mb-2 leading-relaxed text-accent/70">
              {t("newsletterTagline")}
            </p>
            <form className="flex w-full max-w-sm items-center">
              <div className="relative w-full flex">
                <Input 
                  type="email" 
                  placeholder={t("emailPlaceholder")} 
                  className="bg-[#222222] border-none text-white placeholder:text-zinc-600 rounded-none h-12 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                <Button 
                  type="submit" 
                  className="bg-[#C9A96E] hover:bg-[#C9A96E]/80 cursor-pointer text-black font-semibold rounded-none h-12 px-6 uppercase tracking-wider text-xs whitespace-nowrap"
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
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-zinc-600 gap-4">
          <p>© 2026 SUEDE. {t("allRightsReserved")}</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition-colors">
              {t("privacy")}
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              {t("terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}