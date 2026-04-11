import type { Metadata } from "next";
import { HeroSection } from "./_component/HeroSection";
import { MissionSection } from "./_component/MissionSection";
import { StorySection } from "./_component/StorySection";
import { ValuesSection } from "./_component/ValuesSection";
import { QuoteSection } from "./_component/QuoteSection";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about SUEDE, our mission, and how we curate fashion for a better fit experience.",
};

const page = () => {
  return (
    <main className="min-h-screen bg-[#F5F5F0]">
      {/* Hero Section */}
      <HeroSection />
      <MissionSection />
      <StorySection />
      <ValuesSection />
      <QuoteSection />
    </main>
  );
};

export default page;
