"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type StoryContent = {
  title?: string;
  body?: string;
};

export function StorySection({ content }: { content?: StoryContent }) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-120px" });

  return (
    <section ref={sectionRef} className="bg-[#0B0B0D] py-20 md:py-28">
      <div className="container mx-auto px-6 md:px-10 lg:px-0">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.35fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.75, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex h-full flex-col"
          >
            <div className="mb-8 flex items-center gap-5">
              <span className="h-px w-9 bg-white/60" />
              <p
                className="text-center text-[24px] leading-normal font-normal text-white uppercase"
                style={{ fontFamily: "Glacial Indifference" }}
              >
                II - Our Origin
              </p>
            </div>

            <h2
              className="mb-16 text-[32px] leading-normal font-normal text-white"
              style={{ fontFamily: "Glacial Indifference" }}
            >
              {content?.title || (
                <>
                  A name with <span className="font-semibold italic">two meanings.</span>
                </>
              )}
            </h2>

            <p
              className="max-w-md text-[23px] leading-[152.825%] font-normal text-[rgba(255,255,255,0.70)]"
              style={{ fontFamily: "Glacial Indifference" }}
            >
              Before it was Suede, it was a series of questions asked in a digital
              shopping cart - will this actually fit me? Is it worth the price? Can I
              really trust the brand?
            </p>

            <div className="mt-12 h-px w-full bg-white/20" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.75, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            className="space-y-8 text-[23px] leading-[152.825%] font-normal text-[rgba(255,255,255,0.70)]"
            style={{ fontFamily: "Glacial Indifference" }}
          >
            <p>
              {content?.body || (
                <>
                  The internet has made fashion{" "}
                  <span className="font-semibold italic text-white/95">
                    infinitely more accessible and infinitely harder to buy well.
                  </span>{" "}
                  We are surrounded by imagery and short on evidence. Reviews are
                  anonymous, sizing charts lie, and the person modeling the dress almost
                  never looks like the person considering it.
                </>
              )}
            </p>

            <p>
              Suede began as a direct answer to that gap. A platform built on a simple
              premise: reviews should come from{" "}
              <span className="font-semibold italic text-white/95">
                people who share your measurements.
              </span>{" "}
              Because fit is often the first question, and every question after it
              depends on getting that one right.
            </p>

            <p>
              Today, Suede is built around four rooms - The Capsule, a curated directory
              of brands worth knowing; The Lookbook, a discovery feed of
              measurement-matched reviews; The Collective, a community powered by
              Suede&apos;s proprietary Match algorithm; and The Consign, peer-to-peer
              resale for pieces passed on.
            </p>

            <p>
              Join the community, and instantly experience the{" "}
              <span className="font-semibold italic text-white/95">
                power of Suede.
              </span>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
