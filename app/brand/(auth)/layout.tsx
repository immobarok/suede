import type { ReactNode } from "react";
import { Footer } from "@/components/layout/footer";
import { BrandNavbar } from "@/components/layout/navbar/brand-navbar";

export default function BrandApplyLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <BrandNavbar />
      <main className="flex-grow pt-24 md:pt-32">
        {children}
      </main>
      <Footer />
    </div>
  );
}
