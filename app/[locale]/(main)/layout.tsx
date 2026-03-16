import type { ReactNode } from "react";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar/navbar";
// import { GuestClickGate } from "@/components/auth/guest-click-gate"

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      {/* <GuestClickGate /> */}
      <main>{children}</main>
      <Footer />
    </>
  );
}
