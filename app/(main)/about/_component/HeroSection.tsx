"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://i.ibb.co.com/C3MSFKSx/fc48437d3e8dfcfa1e04d6065f21d53ce4f6ecc7.jpg"
          alt="Luxury fashion closet"
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

      {/* Content */}
      <div className="relative z-10 flex h-full items-center">
        <div className="container mx-auto px-4 md:px-0">
          <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-darker mb-6 text-[12px] leading-[17.28px] text-white/80 uppercase"
            >
              About Suede
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-cormorant ] mb-8 leading-[70.4px] font-normal tracking-wide text-white md:text-[32px]"
            >
              FASHION. BUILT ON
              <br />
              THE TRUTH OF FIT.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="font-darker max-w-lg text-[16px] leading-relaxed tracking-wide text-white/60"
            >
              Suede is a luxury fashion trust platform that matches you with
              real reviews from people who share your exact body measurements.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-10"
            >
              <button className="font-darker text-[13px] tracking-[0.15em] text-white uppercase underline decoration-white/40 underline-offset-8 transition-all duration-300 hover:decoration-white">
                Explore The Collective
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 transform"
      >
        <div className="flex flex-col items-center gap-3">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.6 }}
            className="font-darker text-[10px] tracking-[0.2em] text-white/60 uppercase"
          >
            Scroll
          </motion.span>

          {/* Animated Line */}
          <div className="relative h-10 w-px overflow-hidden">
            <motion.div
              initial={{ height: "0%" }}
              animate={{ height: "100%" }}
              transition={{
                duration: 1.5,
                delay: 1.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute top-0 left-0 w-full bg-white/40"
            />

            {/* Moving dot */}
            <motion.div
              initial={{ top: "0%", opacity: 0 }}
              animate={{
                top: ["0%", "100%", "0%"],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                delay: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-white"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
