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
      <div className="relative z-10">
        <section className="relative flex min-h-[90vh] items-start justify-center overflow-hidden px-4 pt-46 md:pt-48">
          <div className="absolute inset-0 -z-10">
            <Image
              src="https://i.ibb.co/JWpSj3rb/Image-With-Fallback-4.png"
              alt="Background"
              fill
              className="object-cover opacity-25 grayscale"
              priority
            />
            <div className="absolute inset-0 bg-white/10" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/40 to-white" />
          </div>

          <AnimatedSectionHeader
            topText="Discovery feed"
            middleText="The Lookbook"
            bottomText="Real reviews from real bodies. Ranked by your measurement match."
          />
        </section>
        <div className="relative -mt-20 md:-mt-28">
          <LookbookSearchBar isOpenInquiries={isOpenInquiries} />
          <LookbookTabsSortRow isOpenInquiries={isOpenInquiries} />
          {isOpenInquiries ? <Inqueries /> : <LookBookGrid />}
        </div>
      </div>
    </main>
  );
};

export default page;
