import type { Metadata } from "next";
import { AnimatedSectionHeader } from "@/components/ui/section-header";
import { AnimatedSearchBar } from "@/components/shared/AnimatedSearchBar";
import ConsignFilterRow from "./_components/ConsignFilterRow";
import ConsignProductGrid from "./_components/ConsignProductGrid";
import ConsignSellAction from "./_components/ConsignSellAction";

export const metadata: Metadata = {
  title: "The Consign",
  description:
    "Shop curated secondhand fashion on The Consign with verified seller profiles and fit-aware browsing.",
};

const page = () => {
  return (
    <main className="space-y-2.5 bg-[#F5F5F0]">
      <section className="px-4 pt-24 pb-0">
        <AnimatedSectionHeader
          topText="market place"
          middleText="The Consign"
          bottomText="Shop curated secondhand from The Collective. Every seller has a verified profile with measurements — so you know exactly how it fits."
        />
      </section>
      <ConsignSellAction />
      <div className="container mx-auto px-4 pt-3 md:px-0">
        <AnimatedSearchBar
          placeholder="Search by item or brand"
          inputClassName="bg-[#F9F8F6] border-[#E7E4DF]"
        />
      </div>
      <ConsignFilterRow />
      <ConsignProductGrid />
    </main>
  );
};

export default page;
