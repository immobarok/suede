"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type MissionContent = {
  title?: string;
  body?: string;
};

function normalizeRichText(html?: string) {
  if (!html) return "";
  return html.replace(/&nbsp;/gi, " ").replace(/\u00a0/g, " ");
}

export function MissionSection({ content }: { content?: MissionContent }) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-120px" });

  return (
    <section ref={sectionRef} className="bg-[#EBEBEA] py-20 md:py-28">
      <div className="container mx-auto px-6 md:px-10 lg:px-0">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-12"
        >
          <div className="mb-8 flex items-center gap-5">
            <span className="h-px w-9 bg-black/65" />
            <p
              className="text-center text-[24px] leading-none font-normal text-black uppercase"
              style={{ fontFamily: "Glacial Indifference" }}
            >
              I - Etymology
            </p>
          </div>

          <h2
            className="text-[32px] leading-normal font-normal text-black"
            style={{ fontFamily: "Glacial Indifference" }}
          >
            {content?.title ? (
              <span dangerouslySetInnerHTML={{ __html: content.title }} />
            ) : (
              <>
                A name with{" "}
                <span className="font-semibold italic">two meanings.</span>
              </>
            )}
          </h2>
        </motion.div>

        <div className="grid gap-12 border-t border-black/15 pt-10 lg:grid-cols-[0.9fr_1.35fr] lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{
              duration: 0.75,
              delay: 0.15,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="space-y-10"
          >
            <div>
              <h3 className="font-darker mb-2 text-[40px] text-black/85 uppercase">
                Suede
              </h3>
              <p className="font-cormorant mb-5 text-[24px] leading-normal font-normal text-black">
                / SWEID /
              </p>
              <p className="font-cormorant text-[24px] leading-normal font-normal text-black">
                <span className="italic">noun.</span> A softened leather,
                brushed to reveal its inner texture. Considered, tactile, quiet
                in its luxury.
              </p>
            </div>

            <div className="border-t border-black/15 pt-8">
              <h3 className="font-darker mb-2 text-[40px] text-black/85 uppercase">
                Swayed
              </h3>
              <p className="font-cormorant mb-5 text-[24px] leading-normal font-normal text-black">
                <span className="italic">/ SWEID /</span> - Said the same way
              </p>
              <p className="font-cormorant text-[24px] leading-normal font-normal text-black">
                <span className="italic">Verb.</span> To be moved toward
                something because of what you know, not what you were told.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{
              duration: 0.75,
              delay: 0.25,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="min-w-0 space-y-8"
          >
            {content?.body ? (
              <div
                className="font-cormorant text-[24px] leading-normal font-normal wrap-anywhere text-black [&_p]:m-0 [&_p]:mb-5 [&_p:last-child]:mb-0"
                dangerouslySetInnerHTML={{
                  __html: normalizeRichText(content.body),
                }}
              />
            ) : (
              <p className="font-cormorant text-[24px] leading-normal font-normal wrap-anywhere text-black">
                <>
                  The name holds both. A material{" "}
                  <span className="font-semibold text-black/90 italic">
                    chosen with intention
                  </span>{" "}
                  - worn by those who notice the difference, who value craft
                  over churn. And a small act of persuasion, the kind that
                  happens when you find something that actually fits.
                </>
              </p>
            )}

            {/* <p className="font-cormorant text-[24px] leading-normal font-normal wrap-anywhere text-black">
              We are in the business of being{" "}
              <span className="font-semibold text-black/90 italic">
                persuaded with data.
              </span>{" "}
              Not by a headline, not by a trend cycle, not by a stranger whose
              body is nothing like yours. By evidence. By someone you share a
              silhouette with, who bought the thing, wore it, and told the
              truth.
            </p>

            <p className="font-cormorant text-[24px] leading-normal font-normal wrap-anywhere text-black">
              To shop per suede is to be moved by{" "}
              <span className="font-semibold text-black/90 italic">
                firsthand experience
              </span>{" "}
              - toward the right thing, for the right reason.
            </p> */}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
