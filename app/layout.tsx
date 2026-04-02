import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { getSiteOrigin } from "@/lib/site-url";


import { Cormorant_Garamond } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
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
        {
          url: "/favicon_16X16_W.svg",
          type: "image/svg+xml",
          sizes: "16x16",
        },
        {
          url: "/favicon_32X32_W.svg",
          type: "image/svg+xml",
          sizes: "32x32",
        },
        {
          url: "/favicon_48X48_W.svg",
          type: "image/svg+xml",
          sizes: "48x48",
        },
      ],
      shortcut: "/favicon_32X32_W.svg",
      apple: [{ url: "/apple.svg", type: "image/svg+xml" }],
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
    <html lang="en" className={`${cormorant.variable}`}>
      <body className="font-sans antialiased">

        <TooltipProvider>
          {children}
          <Toaster richColors />
        </TooltipProvider>
      </body>
    </html>
  );
}
