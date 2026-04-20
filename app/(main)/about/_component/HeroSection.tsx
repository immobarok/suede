"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type HeroContent = {
  title?: string;
  body?: string;
  publicUrl?: string;
};

export function HeroSection({ content }: { content?: HeroContent }) {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={
            content?.publicUrl ||
            "https://i.ibb.co.com/JWpSj3rb/Image-With-Fallback-4.png"
          }
          alt={content?.title || "Luxury fashion closet"}
          fill
          className="object-cover"
          priority
          quality={90}
        />
        {/* Dark Gradient Overlay - heavier on left for text readability */}
        <div className="absolute inset-0 bg-linear-to-t from-[#121212] via-transparent to-transparent" />
        <div className="absolute inset-0 bg-linear-to-l from-[#121212] via-transparent to-transparent" />
        <div className="absolute inset-0 bg-linear-to-r from-[#121212] via-black/20 to-transparent" />
      </div>

      <div className="relative z-10 flex h-full items-center">
        <div className="container mx-auto px-5 md:px-12 lg:px-0">
          <div className="grid items-center gap-10 md:grid-cols-[1.2fr_0.8fr] md:gap-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex items-start gap-5 md:gap-8"
            >
              <div className="mt-2 h-42.5 w-0.5 bg-white/55 md:h-50" />

              <div>
                <p className="font-darker mb-5 text-[13px] tracking-[0.12em] text-white/75 uppercase md:mb-6">
                  About Us
                </p>

                <h1 className="font-cormorant whitespace-pre-line text-[42px] font-normal text-white uppercase md:text-[64px] lg:text-[64px]">
                  {content?.title || "THE TRUST\nLAYER FOR\nFASHION"}
                </h1>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="font-darker max-w-sm text-right text-[20px] leading-[1.45] tracking-[0.01em] text-white/90 md:ml-auto"
            >
              {content?.body || (
                <>
                  A fashion discovery and review platform that uses{" "}
                  <span className="font-semibold italic">body measurements</span>{" "}
                  to help you shop with confidence.
                </>
              )}
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
