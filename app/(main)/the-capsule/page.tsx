import type { Metadata } from "next";
import { Suspense } from "react";
import { AnimatedSectionHeader } from "@/components/ui/section-header";
import { BrandCardGrid } from "./_components/BrandCardGrid";
import Image from "next/image";
import { ReviewModal } from "./_components/ReviewModal";

export const metadata: Metadata = {
  title: "The Capsule",
  description:
    "Browse The Capsule brand directory featuring curated minority-owned fashion brands on SUEDE.",
};

const page = () => {
  return (
    <main className="relative overflow-hidden">
      <div className="relative z-10">
        {/* HERO SECTION */}
        <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden px-4">
          {/* Background Image */}
          <div className="absolute inset-0 -z-10">
            <Image
              src="https://i.ibb.co/JWpSj3rb/Image-With-Fallback-4.png"
              alt="Background"
              fill
              className="object-cover opacity-25 grayscale"
              priority
            />

            {/* TOP LIGHT OVERLAY (optional keep) */}
            <div className="absolute inset-0 bg-white/10" />

            {/* 🔥 BOTTOM FADE BLEND */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/40 to-white" />
          </div>

          <AnimatedSectionHeader
            topText="BRAND DIRECTORY"
            middleText="The Capsule"
            bottomText="A curated collection of minority-owned fashion brands, each vetted for quality, ethics, and design excellence."
          />
        </section>

        <Suspense fallback={null}>
          <BrandCardGrid />
        </Suspense>

        <Suspense fallback={null}>
          <ReviewModal slug="nadi-by-dani" />
        </Suspense>
      </div>
    </main>
  );
};

export default page;
