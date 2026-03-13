import Hero from "./_components/Hero";
import { NewsletterSection } from "./_components/Newsletter";
import { PreLovedSection } from "./_components/TheConsign";

const page = () => {
  return (
    <>
      <main>
        <Hero />
        <NewsletterSection />

        <PreLovedSection />
      </main>
    </>
  );
}

export default page;