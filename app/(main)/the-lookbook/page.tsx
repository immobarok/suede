import type { Metadata } from "next";
import Image from "next/image";
import { AnimatedSectionHeader } from "@/components/ui/section-header";
import { LookBookGrid } from "./_components/LookbookGrid";
import LookbookSearchBar from "./_components/LookbookSearchBar";
import Inqueries from "./_components/inqueries";
import LookbookTabsSortRow from "./_components/LookbookTabsSortRow";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export async function generateMetadata(props: {
  searchParams: SearchParams;
}): Promise<Metadata> {
  const searchParams = await props.searchParams;
  const view = searchParams.view;
  const isInquiriesView = view === "open-inquiries";

  return {
    title: isInquiriesView ? "The Lookbook Inquiries" : "The Lookbook",
    description: isInquiriesView
      ? "Track and manage open lookbook inquiries on SUEDE."
      : "Explore The Lookbook with real reviews and fit-aware ranking from the SUEDE community.",
  };
}

const page = async (props: { searchParams: SearchParams }) => {
  const searchParams = await props.searchParams;
  const view = searchParams.view;
  const isOpenInquiries = view === "open-inquiries";

  return (
    <main className="relative overflow-hidden">
      <Image
        src="https://i.ibb.co/nsvQbBSQ/41ddd7debba1acf170f27b180927b8514ffaebd3.jpg"
        alt="Background"
        fill
        className="object-cover opacity-25 grayscale"
        priority
      />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-white/20 to-white/10" />

      <div className="relative z-10">
        <section className="px-4 py-24">
          <AnimatedSectionHeader
            topText="Discovery feed"
            middleText="The Lookbook"
            bottomText="Real reviews from real bodies. Ranked by your measurement match."
          />
        </section>
        <LookbookSearchBar isOpenInquiries={isOpenInquiries} />
        <LookbookTabsSortRow isOpenInquiries={isOpenInquiries} />
        {isOpenInquiries ? <Inqueries /> : <LookBookGrid />}
      </div>
    </main>
  );
};

export default page;
