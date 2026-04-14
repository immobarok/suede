"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef, useEffect, useState } from "react";

function AnimatedCounter({
  value,
  duration = 2,
}: {
  value: number;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const incrementTime = (duration / end) * 1000;

      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === end) clearInterval(timer);
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [isInView, value, duration]);

  return <span ref={ref}>{count}</span>;
}

type MissionContent = {
  title?: string;
  body?: string;
  metadata?: {
    problemPercentage?: number;
    problemDescription?: string;
    solutionPercentage?: number;
    solutionTitle?: string;
    solutionDescription?: string;
    matchScoreDescription?: string;
  };
};

export function MissionSection({ content }: { content?: MissionContent }) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const lineRevealVariants: Variants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const solutionCardVariants: Variants = {
    hidden: { opacity: 0, x: 60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1,
        ease: [0.25, 0.1, 0.25, 1],
        delay: 0.4,
      },
    },
  };

  return (
    <section
      ref={containerRef}
      className="overflow-hidden bg-[#FAFAF9] py-24 md:py-32"
    >
      <div className="container mx-auto px-6 md:px-0">
        {/* Mission Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-24 text-center md:mb-32"
        >
          <motion.p
            variants={fadeUpVariants}
            className="font-darker mb-8 text-[11px] tracking-[0.3em] text-[#8A8A8A] uppercase"
          >
            Our Mission
          </motion.p>

          <motion.h2
            variants={fadeUpVariants}
            className="font-cormorant mx-auto max-w-4xl text-2xl leading-[1.4] font-normal tracking-[0.02em] text-[#1A1A1A] uppercase md:text-3xl lg:text-4xl"
          >
            {content?.title ||
              "To make every fashion purchase feel like it was made for you — because the reviews came from someone exactly like you."}
          </motion.h2>

          {/* Decorative Line */}
          <motion.div
            variants={lineRevealVariants}
            className="mx-auto mt-12 h-px w-16 origin-center bg-[#1A1A1A]/20"
          />
        </motion.div>

        {/* Problem & Solution Grid */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-24">
          {/* The Problem */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="lg:pr-12"
          >
            <motion.p
              variants={fadeUpVariants}
              className="font-darker mb-6 text-[11px] tracking-[0.25em] text-[#8A8A8A] uppercase"
            >
              The Problem
            </motion.p>

            <motion.h3
              variants={fadeUpVariants}
              className="font-cormorant mb-6 text-4xl leading-[1.15] font-normal text-[#1A1A1A] md:text-5xl lg:text-[56px]"
            >
              <span className="inline-block">
                <AnimatedCounter
                  value={content?.metadata?.problemPercentage || 70}
                />
                %
              </span>{" "}
              of online clothing returns are due to poor fit
            </motion.h3>

            <motion.p
              variants={fadeUpVariants}
              className="font-darker max-w-md text-[15px] leading-relaxed tracking-wide text-[#8A8A8A]"
            >
              {content?.metadata?.problemDescription ||
                "Size charts lie. Model photos mislead. Traditional reviews tell you nothing about how a garment will look and feel on your specific body. Until now."}
            </motion.p>
          </motion.div>

          {/* The Solution */}
          <motion.div
            variants={solutionCardVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="relative bg-[#E8E8E6] p-8 md:p-12"
          >
            <div className="max-w-lg">
              <p className="font-darker mb-4 text-[11px] tracking-[0.25em] text-[#8A8A8A] uppercase">
                The Solution
              </p>

              <h4 className="font-cormorant mb-4 text-2xl font-normal text-[#1A1A1A] md:text-3xl">
                {content?.metadata?.solutionTitle || "Measurement Match Score"}
              </h4>

              <p className="font-darker mb-8 text-[14px] leading-relaxed tracking-wide text-black/70">
                {content?.metadata?.solutionDescription ||
                  "SUEDE compares your measurements with real reviewers to generate a Match Score, telling you exactly how relevant each review is to your body. No more guessing if a 4-star review is helpful or not — you can see at a glance if the reviewer's body is similar to yours, and prioritize reviews from people who are your true fit twins."}
              </p>

              {/* Match Score Visual */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="flex items-center gap-5 bg-white p-6 shadow-sm"
              >
                <div className="relative">
                  <svg className="h-16 w-16 -rotate-90 transform">
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      fill="none"
                      stroke="#E8E8E6"
                      strokeWidth="3"
                    />
                    <motion.circle
                      cx="32"
                      cy="32"
                      r="28"
                      fill="none"
                      stroke="#1A1A1A"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeDasharray={176}
                      initial={{ strokeDashoffset: 176 }}
                      whileInView={{ strokeDashoffset: 14 }}
                      viewport={{ once: true }}
                      transition={{ duration: 2, ease: "easeOut", delay: 1 }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-darker text-lg font-medium text-[#1A1A1A]">
                      <AnimatedCounter
                        value={content?.metadata?.solutionPercentage || 92}
                      />
                      %
                    </span>
                  </div>
                </div>

                <div>
                  <p className="font-darker mb-1 text-[13px] font-medium text-[#1A1A1A]">
                    Match Score
                  </p>
                  <p className="font-darker text-[12px] leading-tight text-[#8A8A8A]">
                    {content?.metadata?.matchScoreDescription ||
                      "Reviewer has nearly identical body measurements"}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Decorative corner accent */}
            <div className="absolute top-0 right-0 -mt-12 -mr-12 h-24 w-24 rotate-45 transform bg-[#1A1A1A]/5" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
