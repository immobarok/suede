"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";
import { Heart, Leaf, ShieldCheck, Sparkles } from "lucide-react";

const values = [
  {
    icon: ShieldCheck,
    title: "Trust First",
    description:
      "Every review is matched to a real body profile. No brand sponsorships. No paid placements. Only honest accounts of how clothes actually wear.",
  },
  {
    icon: Heart,
    title: "Radical Inclusivity",
    description:
      "Fashion has spent decades designing for a narrow sliver of bodies. We built SUEDE so every size, shape, and proportion can find clothes that feel made for them.",
  },
  {
    icon: Leaf,
    title: "Wear More, Return Less",
    description:
      "40% of online fashion purchases are returned. Fit is the top reason. When shoppers buy right the first time, the environmental cost of fashion drops significantly.",
  },
  {
    icon: Sparkles,
    title: "Quiet Luxury, Loud Honesty",
    description:
      "We curate for quality and longevity. We celebrate the slow wardrobe. And we pair that with the most transparent fit information in the industry.",
  },
];

export function ValuesSection() {
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

  const headerVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const cardVariants: Variants = {
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

  const iconVariants: Variants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section
      ref={containerRef}
      className="overflow-hidden bg-[#FAFAF9] py-8 md:py-16 md:pb-32"
    >
      <div className="container mx-auto max-w-6xl px-6 md:px-12 lg:px-24">
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-16 text-center md:mb-24"
        >
          <motion.p
            variants={headerVariants}
            className="font-darker mb-6 text-[11px] tracking-[0.3em] text-[#8A8A8A] uppercase"
          >
            What We Stand For
          </motion.p>
          <motion.h2
            variants={headerVariants}
            className="font-cormorant text-3xl font-normal tracking-[0.02em] text-[#1A1A1A] md:text-4xl"
          >
            Our Values
          </motion.h2>
        </motion.div>

        {/* Values Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 gap-x-16 gap-y-12 md:grid-cols-2 md:gap-y-16"
        >
          {values.map((value, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="group flex gap-6"
            >
              {/* Icon */}
              <motion.div
                variants={iconVariants}
                whileHover={{ scale: 1.1 }}
                className="shrink-0"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EFEFED] transition-colors duration-300 group-hover:bg-[#E0E0DE]">
                  <value.icon className="h-5 w-5 stroke-[1.5] text-[#1A1A1A]" />
                </div>
              </motion.div>

              {/* Content */}
              <div className="pt-1">
                <h3 className="font-cormorant mb-3 text-xl font-normal tracking-wide text-[#1A1A1A] md:text-2xl">
                  {value.title}
                </h3>
                <p className="font-darker max-w-md text-[14px] leading-[1.7] tracking-wide text-[#666666]">
                  {value.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
