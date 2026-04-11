"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export function StorySection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const textRevealVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const imageRevealVariants: Variants = {
    hidden: {
      clipPath: "inset(0 100% 0 0)",
      opacity: 0,
    },
    visible: {
      clipPath: "inset(0 0% 0 0)",
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.3,
      },
    },
  };

  const imageScaleVariants: Variants = {
    hidden: { scale: 1.2 },
    visible: {
      scale: 1,
      transition: {
        duration: 1.4,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.3,
      },
    },
  };

  const paragraphVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <section
      ref={containerRef}
      className="overflow-hidden bg-[#FAFAF9] py-8 md:py-16"
    >
      <div className="container mx-auto w-full px-6 md:px-0">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-24">
          {/* Right: Image */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={imageRevealVariants}
            className="relative aspect-4/3 overflow-hidden bg-[#E8E8E6] lg:aspect-5/4"
          >
            <motion.div
              variants={imageScaleVariants}
              className="absolute inset-0"
            >
              <Image
                src="https://i.ibb.co.com/BHBQ9B8H/Image-With-Fallback-3.png"
                alt="Fashion designer working in studio"
                fill
                className="object-cover"
                quality={90}
              />
            </motion.div>

            {/* Subtle overlay gradient */}
            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/10 to-transparent" />
          </motion.div>
          {/* Left: Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="max-w-xl lg:pr-8"
          >
            <motion.p
              variants={textRevealVariants}
              className="font-darker mb-8 text-[11px] tracking-[0.3em] text-[#8A8A8A] uppercase"
            >
              Our Story
            </motion.p>

            <motion.h2
              variants={textRevealVariants}
              className="font-cormorant mb-10 text-3xl leading-[1.2] font-normal text-[#1A1A1A] md:text-4xl lg:text-[42px]"
            >
              Born from a Fitting Room Frustration
            </motion.h2>

            <div className="space-y-6">
              <motion.p
                variants={paragraphVariants}
                className="font-darker text-[15px] leading-[1.8] tracking-wide text-black/50"
              >
                In 2023, SUEDE co-founder Kikiola Akanbi — a former luxury buyer
                — tracked her online returns for a year. The result:{" "}
                <span className="font-medium text-[#1A1A1A]">58%</span> of
                everything she bought came back. Not because the clothes were
                poor quality. Because they didn&apos;t fit.
              </motion.p>

              <motion.p
                variants={paragraphVariants}
                className="font-darker text-[15px] leading-[1.8] tracking-wide text-black/50"
              >
                She called her old colleague Kai Tanaka, who had spent a decade
                building recommendation systems at major tech firms. Together
                they asked a simple question: what if the reviewer was built
                like you?
              </motion.p>

              <motion.p
                variants={paragraphVariants}
                className="font-darker text-[15px] leading-[1.8] tracking-wide text-black/50"
              >
                SUEDE launched in January 2025 with 200 beta members, a
                measurement-matching algorithm, and a single conviction — that
                honest fit information, from real bodies, is the future of
                fashion retail.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
