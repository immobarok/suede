import type { Metadata } from "next";
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
      <Image
        src="https://i.ibb.co.com/nsvQbBSQ/41ddd7debba1acf170f27b180927b8514ffaebd3.jpg"
        alt="Background"
        fill
        className="object-cover opacity-25 grayscale"
        priority
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/20 to-white/10" />

      <div className="relative z-10">
        <section className="px-4 py-24">
          <AnimatedSectionHeader
            topText="BRAND DIRECTORY"
            middleText="The Capsule"
            bottomText="A curated collection of minority-owned fashion brands, each vetted for quality, ethics, and design excellence."
          />
        </section>
        <BrandCardGrid />
        <ReviewModal slug="nadi-by-dani" />
      </div>
    </main>
  );
};

export default page;
