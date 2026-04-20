"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

type FounderContent = {
  title?: string;
  body?: string;
  publicUrl?: string;
  metadata?: {
    label?: string;
    name?: string;
    role?: string;
    tagline?: string;
    intro?: string;
    paragraphs?: string[];
  };
};

const fallbackParagraphs = [
  "I'm Kikiola \u2014 ex-McKinsey, cybersecurity professional by day, fashion girl the rest of the time. I love finding a good piece, but I don't love the hours it takes to find one, or the gamble that comes after \u2014 the sizing chart that doesn't line up with the garment, the product photos that doesn't line up with reality, the reviews that simply don't exist... or if they do, they don't have any sizing context.",
  "Somewhere along the way the math stopped working. Brands want full price and give you nothing in return \u2014 no transparency on fit, no real information on quality, just a campaign shot and a size guide written by AI. The cost of being wrong got too high, and scrolling TikTok for an hour to crowdsource a size wasn't a lifestyle I wanted.",
  "Suede is my answer. A place to find brands worth knowing, and to read reviews from people who actually share my measurements. I built it to fix one of my biggest pain points as a shopper \u2014 and, honestly, to find out where you shop, how you shop there, and what's worth the spend. Call it enabling my bad habits. I call it maximizing my time.",
];

export function QuoteSection({ content }: { content?: FounderContent }) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-120px" });

  const paragraphs = content?.metadata?.paragraphs?.length
    ? content.metadata.paragraphs
    : content?.body
      ? content.body
          .split("\n\n")
          .map((p) => p.trim())
          .filter(Boolean)
      : fallbackParagraphs;

  return (
    <section ref={sectionRef} className="overflow-hidden bg-[#EBEBEA] py-16 md:py-24">
      <div className="container mx-auto px-6 md:px-10 lg:px-0">
        <div className="grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
            transition={{ duration: 0.75, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative mx-auto aspect-[3/5] w-full max-w-[420px] overflow-hidden rounded-[44px]"
          >
            <Image
              src={
                content?.publicUrl ||
                "https://i.ibb.co.com/jk0Sfx0K/8520be63cec8b29ec3fdf51c1496350000607e2e.png"
              }
              alt={content?.metadata?.name || content?.title || "Founder portrait"}
              fill
              className="object-cover"
              quality={90}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 24 }}
            transition={{ duration: 0.75, delay: 0.12, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="mb-8 flex items-center gap-5">
              <span className="h-px w-9 bg-black/65" />
              <p
                className="text-center text-[24px] leading-none font-normal text-black uppercase"
                style={{ fontFamily: "Glacial Indifference" }}
              >
                {content?.metadata?.label || "III - OUR FOUNDER"}
              </p>
            </div>

            <h2 className="font-cormorant text-[68px] leading-[0.95] font-normal text-black/95 md:text-[92px]">
              {content?.metadata?.name || content?.title || "Kikiola"}
            </h2>

            <p className="font-cormorant mt-5 text-[43px] leading-tight text-black/85 md:text-[48px]">
              {content?.metadata?.role || "Founder & CEO"}
            </p>

            <p className="font-cormorant mt-6 text-[38px] leading-tight text-black/90 md:text-[42px]">
              {content?.metadata?.tagline || "I built the platform I wanted to shop on."}
            </p>

            {content?.metadata?.intro ? (
              <p className="font-cormorant mt-8 text-[24px] leading-normal font-normal text-black">
                {content.metadata.intro}
              </p>
            ) : null}

            <div className="mt-8 space-y-7">
              {paragraphs.map((paragraph, idx) => (
                <p
                  key={`${idx}-${paragraph.slice(0, 16)}`}
                  className="font-cormorant text-[24px] leading-normal font-normal text-black"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
