"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function BrandSignInPage() {
  return (
    <div className="container mx-auto px-6 lg:px-0 pb-12 md:pb-20 lg:pb-24">
      {/* Top Centered Logo */}
      <div className="flex justify-center mb-16 md:mb-24">
        <Link href="/">
          <Image
            src="/Logo_black.svg"
            alt="Logo"
            width={160}
            height={60}
            className="h-12 md:h-16 w-auto object-contain"
            priority
          />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        {/* Left Section: Information */}
        <div className="space-y-8 max-w-xl">
          <div className="space-y-4">
            <span className="text-[10px] tracking-[0.2em] font-semibold text-primary uppercase">
              Apply
            </span>
            <h1 className="text-4xl font-cormorant font-semibold  md:text-[48px] leading-[1.2] text-black">
              "A Quieter Place to be <span className="italic uppercase font-bold tracking-tighter">Discovered</span> and to 
Listen Back." <br />
            </h1>
          </div>

          <p className="text-lg text-black/60 leading-relaxed font-light">
            We read every application. There is no fee, no subscription, no tracker — 
            just a brief written exchange with our editors.
          </p>

          <div className="space-y-4 pt-8 border-t border-black/10">
            <ul className="space-y-4 text-sm text-black/70">
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-black/20" />
                Reviewed within 2-3 days
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-black/20" />
                No paid placement, ever
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-black/20" />
                Equal access for all brands in The Capsule
              </li>
            </ul>
          </div>
        </div>

        {/* Right Section: Sign In Form */}
        <div className="bg-[#FFFFFF] border border-black/5 rounded-sm p-8 md:p-12 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] tracking-[0.2em] font-bold text-black/40 uppercase">
                Sign In
              </span>
              <h1 className="text-4xl font-cormorant text-black leading-tight">
                Welcome back.
              </h1>
              <p className="text-black/60 text-sm font-light">
                Sign in to manage your brand presence.
              </p>
            </div>

            <form className="space-y-6 pt-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[10px] tracking-widest uppercase font-bold text-black/40">
                  Email
                </Label>
                <Input 
                  id="email" 
                  type="email"
                  placeholder="you@brand.com" 
                  className="border-0 border-b border-black/10 rounded-none px-0 focus-visible:ring-0 focus-visible:border-black transition-all"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password" className="text-[10px] tracking-widest uppercase font-bold text-black/40">
                    Password
                  </Label>
                </div>
                <Input 
                  id="password" 
                  type="password"
                  className="border-0 border-b border-black/10 rounded-none px-0 focus-visible:ring-0 focus-visible:border-black transition-all"
                />
                  <Link href="#" className="text-[11px] text-end items-end justify-end flex text-black/40 hover:text-black transition-colors">
                    Forgot Password?
                  </Link>
              </div>

              <Button className="w-full bg-black text-white hover:bg-black/90 rounded-none h-14 uppercase text-[12px] tracking-widest font-bold transition-all mt-4">
                Sign in
              </Button>

              <div className="relative flex items-center py-4">
                <div className="flex-grow border-t border-black/5"></div>
                <span className="flex-shrink mx-4 text-[10px] font-bold text-black/20 uppercase tracking-widest">Or</span>
                <div className="flex-grow border-t border-black/5"></div>
              </div>

              <div className="space-y-3">
                <Button variant="outline" className="w-full rounded-none h-12 border-black/10 hover:bg-black/5 flex items-center justify-center gap-3 font-medium text-sm">
                  <Image src="/google.svg" alt="Google" width={18} height={18} />
                  Continue with Google
                </Button>
                <Button variant="outline" className="w-full rounded-none h-12 border-black/10 hover:bg-black/5 flex items-center justify-center gap-3 font-medium text-sm">
                  <Image src="/apple.svg" alt="Apple" width={22} height={22} className="dark:invert" />
                  Continue with Apple
                </Button>
              </div>
            </form>
            
          </div>
        </div>
        
      </div>
      <div className="text-end mt-4">
              <p className="text-[12px] text-black/40">New here? <Link href="#" className="text-black font-bold hover:underline">Apply to The Capsule</Link></p>
            </div>
    </div>
  );
}
