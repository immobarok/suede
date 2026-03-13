import type { Metadata } from "next";
import "../globals.css";
import { Toaster } from "sonner";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { TooltipProvider } from "@/components/ui/tooltip";
import { getSiteOrigin } from "@/lib/site-url";

import { Cormorant_Garamond, Darker_Grotesque } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
});

const darkerGrotesque = Darker_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-darker-grotesque",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const isFrench = locale === "fr";
  const siteTitle = isFrench
    ? "SUEDE | Marketplace de mode curate"
    : "SUEDE | Curated Fashion Marketplace";
  const siteDescription = isFrench
    ? "Explorez des marques curatees, de la seconde main premium et des looks verifies par la communaute sur SUEDE."
    : "Discover curated brands, premium secondhand fashion, and community-verified looks on SUEDE.";

  return {
    metadataBase: new URL(getSiteOrigin()),
    icons: {
      icon: [
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/icon", type: "image/png" },
      ],
      shortcut: "/favicon.svg",
      apple: [{ url: "/apple-icon", type: "image/png" }],
    },
    title: {
      default: siteTitle,
      template: "%s | SUEDE",
    },
    description: siteDescription,
    applicationName: "SUEDE",
    keywords: [
      "SUEDE",
      "fashion marketplace",
      "secondhand fashion",
      "designer resale",
      "lookbook",
      "brand directory",
    ],
    alternates: {
      languages: {
        en: "/en",
        fr: "/fr",
      },
    },
    openGraph: {
      type: "website",
      title: siteTitle,
      description: siteDescription,
      siteName: "SUEDE",
      locale: isFrench ? "fr_FR" : "en_US",
      url: `/${locale}`,
    },
    twitter: {
      card: "summary_large_image",
      title: siteTitle,
      description: siteDescription,
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${cormorant.variable} ${darkerGrotesque.variable}`}
    >
      <body className="antialiased">
        <TooltipProvider>
          <NextIntlClientProvider messages={messages}>
            {children}
            <Toaster richColors />
          </NextIntlClientProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
