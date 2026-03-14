"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const ConsignContent = () => {
  return (
    <motion.div
      className="lg:pl-12"
      initial={{ opacity: 0, x: 0 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      <motion.p
        className="mb-6 font-sans text-[11px] tracking-[2px] text-[#8a8a8a] uppercase"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        04 The Consign
      </motion.p>

      <motion.h2
        className="mb-8 font-serif text-[70px] leading-[1.1] font-normal text-[#1a1a1a] md:text-[52px] lg:text-[58px]"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        Pre-loved pieces,
        <br />
        perfect fit
      </motion.h2>

      <motion.p
        className="mb-10 max-w-md font-sans text-[15px] leading-relaxed text-[#5a5a5a]"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        Shop curated secondhand from The Collective. Every seller has a verified
        profile with measurements - so you know exactly how it fits.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <Link href="/the-consign" className="group relative inline-flex h-12 cursor-pointer items-center justify-center overflow-hidden rounded-none bg-[#A67B5B] text-white shadow-lg">
          <span className="absolute inline-flex h-12 w-full -translate-x-full items-center justify-center bg-[#bb8b67] px-8 text-[11px] font-normal tracking-[1.5px] text-white uppercase transition duration-300 group-hover:translate-x-0">
            The consign
            <ArrowRight className="ml-2 h-4 w-4" />
          </span>
          <span className="bg-primary inline-flex h-12 translate-x-0 items-center justify-center px-8 text-[11px] font-normal tracking-[1.5px] uppercase transition group-hover:translate-x-[150%]">
            Sell Your Pieces
            <ArrowRight className="ml-2 h-4 w-4" />
          </span>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default ConsignContent;
