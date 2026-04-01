import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
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
}): Promise<Metadata> {
  const siteTitle = "SUEDE | Curated Fashion Marketplace";
  const siteDescription =
    "Discover curated brands, premium secondhand fashion, and community-verified looks on SUEDE.";

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
    openGraph: {
      type: "website",
      title: siteTitle,
      description: siteDescription,
      siteName: "SUEDE",
      locale: "en_US",
      url: "/",
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
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${darkerGrotesque.variable}`}>
      <body className="antialiased">

        <TooltipProvider>
          {children}
          <Toaster richColors />
        </TooltipProvider>
      </body>
    </html>
  );
}
