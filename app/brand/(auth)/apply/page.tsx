"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function BrandApplyPage() {
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
            <h1 className="text-4xl md:text-6xl leading-tight text-black">
              Tell us about your <br />
              <span className="italic font-cormorant uppercase font-bold tracking-tight">Brand.</span>
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

        {/* Right Section: Form */}
        <div className="bg-[#FFFFFF] border border-black/5 rounded-sm p-8 md:p-12 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
          <form className="space-y-8">
            <div className="space-y-2">
              <Label htmlFor="brandName" className="text-[10px] tracking-widest uppercase font-bold text-black/40">
                Brand Name
              </Label>
              <Input 
                id="brandName" 
                placeholder="e.g. Kikiola Kanbi" 
                className="border-0 border-b border-black/10 rounded-none px-0 focus-visible:ring-0 focus-visible:border-black transition-all"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="website" className="text-[10px] tracking-widest uppercase font-bold text-black/40">
                Website
              </Label>
              <Input 
                id="website" 
                placeholder="https://" 
                className="border-0 border-b border-black/10 rounded-none px-0 focus-visible:ring-0 focus-visible:border-black transition-all"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <Label htmlFor="applicantName" className="text-[10px] tracking-widest uppercase font-bold text-black/40">
                  Applicant Name
                </Label>
                <Input 
                  id="applicantName" 
                  className="border-0 border-b border-black/10 rounded-none px-0 focus-visible:ring-0 focus-visible:border-black transition-all"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role" className="text-[10px] tracking-widest uppercase font-bold text-black/40">
                  Applicant Role
                </Label>
                <select 
                  id="role"
                  className="w-full bg-transparent border-0 border-b border-black/10 rounded-none px-0 py-2 text-sm focus:outline-none focus:border-black transition-all appearance-none cursor-pointer"
                >
                  <option>Brand Owner</option>
                  <option>Brand PR</option>
                  <option>Brand Operations</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="year" className="text-[10px] tracking-widest uppercase font-bold text-black/40">
                Founding Year
              </Label>
              <Input 
                id="year" 
                placeholder="2019"
                className="border-0 border-b border-black/10 rounded-none px-0 focus-visible:ring-0 focus-visible:border-black transition-all"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="why" className="text-[10px] tracking-widest uppercase font-bold text-black/40">
                Why should your brand be in the capsule?
              </Label>
              <textarea 
                id="why" 
                placeholder="Tell us about your point of view, your craft, the customer you build for."
                className="w-full min-h-[120px] bg-transparent border border-black/10 rounded-none p-4 text-sm focus:outline-none focus:border-black transition-all resize-none"
              />
              <p className="text-[11px] text-black/40 italic">
                A few sentences is plenty. We value clarity over polish.
              </p>
            </div>

            <div className="pt-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <p className="text-[11px] text-black/40 max-w-[240px]">
                By submitting you agree to be contacted by our editorial team.
              </p>
              <Button className="bg-black text-white hover:bg-black/90 rounded-none px-10 h-12 uppercase text-[12px] tracking-widest font-bold transition-all">
                Submit application
              </Button>
            </div>
          </form>
        </div>
      </div>

      <div className="mt-20 pt-8 border-t border-black/5 flex justify-center">
        <p className="text-[13px] text-black/60">
          Already apart of the capsule - {" "}
          <Link href="/brand/signin" className="text-black font-bold hover:underline">Sign in</Link>
          {" "}or{" "}
          <Link href="#" className="text-black font-bold hover:underline">Claim your Brand</Link>
        </p>
      </div>
    </div>
  );
}
