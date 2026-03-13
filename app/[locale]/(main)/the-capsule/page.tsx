import type { Metadata } from "next";
import { AnimatedSectionHeader } from "@/components/ui/section-header";
import { BrandCardGrid } from "./_components/BrandCardGrid";

export const metadata: Metadata = {
  title: "The Capsule",
  description:
    "Browse The Capsule brand directory featuring curated minority-owned fashion brands on SUEDE.",
};

const page = () => {
  return (
    <main>
      <section className="bg-[#F5F5F0] px-4 py-24">
        <AnimatedSectionHeader
          topText="BRAND DIRECTORY"
          middleText="The Capsule"
          bottomText="A curated collection of minority-owned fashion brands, each vetted for quality, ethics, and design excellence."
        />
      </section>
      <BrandCardGrid />
    </main>
  );
};

export default page;
