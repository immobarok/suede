"use client";

import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export function QuoteSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  const textVariants:Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const lineVariants: Variants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 1.5,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.5,
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="relative flex h-[60vh] min-h-125 w-full items-center justify-center overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 -top-[10%] h-[120%] w-full"
      >
        <Image
          src="https://i.ibb.co.com/JfXZ5K3/Section-2x.png"
          alt="Diverse women in fashion"
          fill
          className="object-cover"
          quality={90}
          priority
        />
      </motion.div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Optional subtle gradient for text legibility */}
      <div className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-black/30" />

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 mx-auto max-w-4xl px-6 text-center md:px-12"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative"
        >
          {/* Decorative line above */}
          <motion.div
            variants={lineVariants}
            className="mx-auto mb-8 h-px w-12 origin-center bg-white/40"
          />

          {/* Quote */}
          <motion.h2
            variants={textVariants}
            className="font-cormorant text-2xl leading-normal font-normal tracking-wide text-white italic md:text-3xl lg:text-4xl"
          >
            &ldquo;Fashion should feel effortless. Fit is where effortless
            begins.&rdquo;
          </motion.h2>

          {/* Decorative line below */}
          <motion.div
            variants={lineVariants}
            className="mx-auto mt-8 h-px w-12 origin-center bg-white/40"
          />
        </motion.div>
      </motion.div>

      {/* Bottom fade for smooth transition to next section */}
      <div className="absolute right-0 bottom-0 left-0 h-24 bg-linear-to-t from-[#000000] to-transparent" />
    </section>
  );
}
