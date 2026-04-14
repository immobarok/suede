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

async function getAboutContent() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/about`,
      {
        cache: "no-store",
      },
    );
    if (!res.ok) throw new Error("Failed to fetch");
    return await res.json();
  } catch (error) {
    console.error("Error fetching about content:", error);
    return {};
  }
}

const page = async () => {
  const content = await getAboutContent();

  const heroContent = content.about_hero?.[0];
  const missionContent = content.mission?.[0];
  const storyContent = content.story?.[0];
  const valuesContent = content.values || [];
  const quoteContent = content.quote?.[0];

  return (
    <main className="min-h-screen bg-[#F5F5F0]">
      {/* Hero Section */}
      <HeroSection content={heroContent} />
      <MissionSection content={missionContent} />
      <StorySection content={storyContent} />
      <ValuesSection content={valuesContent} />
      <QuoteSection content={quoteContent} />
    </main>
  );
};

export default page;
