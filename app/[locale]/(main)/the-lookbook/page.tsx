import type { Metadata } from "next";
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

  return (
    <main className="bg-[#F5F5F0]">
      <section className="px-4 pt-24 pb-0">
        <AnimatedSectionHeader
          topText="Discovery feed"
          middleText="The Lookbook"
          bottomText="Real reviews from real bodies. Ranked by your measurement match."
        />
      </section>
      <LookbookSearchBar />
      <LookbookTabsSortRow isOpenInquiries={view === "open-inquiries"} />
      {view === "open-inquiries" ? <Inqueries /> : <LookBookGrid />}
    </main>
  );
};

export default page;
