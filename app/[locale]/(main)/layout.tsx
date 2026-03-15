import type { ReactNode } from 'react'
import { Navbar } from "@/components/layout/navbar"
import { Footer } from '@/components/layout/footer'
// import { GuestClickGate } from "@/components/auth/guest-click-gate"

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      {/* <GuestClickGate /> */}
      <main>{children}</main>
      <Footer/>
    </>
  )
}
