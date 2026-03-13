import type { Metadata } from "next";
import Hero from "./_components/Hero";
import { NewsletterSection } from "./_components/Newsletter";
import { PreLovedSection } from "./_components/TheConsign";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Shop curated fashion, discover community looks, and browse premium secondhand collections on SUEDE.",
};

const page = () => {
  return (
    <>
      <main>
        <Hero />
        <PreLovedSection />
        <NewsletterSection />
      </main>
    </>
  );
};

export default page;
