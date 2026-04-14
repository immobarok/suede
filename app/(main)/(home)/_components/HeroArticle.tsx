"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";

const fadeInUp:Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }
  }
};

const staggerContainer:Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

type HeroArticleProps = {
  title?: string;
  subtext?: string;
};

export default function HeroArticle({ title, subtext }: HeroArticleProps) {
  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="container mx-auto w-full px-4 md:px-0 text-white/90"
    >
      <div className="flex w-full items-start justify-between gap-8">
        {/* Left Content */}
        <motion.div 
          variants={fadeInUp}
          className="flex max-w-[380px] flex-col gap-2"
        >
          <motion.p 
            variants={fadeInUp}
            className="text-md md:text-[24px] font-normal font-cormorant leading-[28.8px] uppercase"
          >
            {title || "The Trust Layer For Fashion"}
          </motion.p>
          <motion.span 
            variants={fadeInUp}
            className="text-sm md:text-[14px] text-white/70 text-end"
          >
            EST2026
          </motion.span>
        </motion.div>

        {/* Right Content */}
        <motion.div 
          variants={fadeInUp}
          className="flex max-w-[380px] flex-col items-end gap-4 text-right"
        >
          <motion.p 
            variants={fadeInUp}
            className="text-md md:text-[24px] font-normal font-cormorant leading-[28.8px] uppercase"
          >
            {subtext || "Start your shopping journey with confidence"}
          </motion.p>
          
          <motion.div 
            variants={staggerContainer}
            className="flex flex-col items-end gap-2"
          >
            <motion.div variants={fadeInUp}>
              <Link
                href="/the-lookbook"
                className="text-md md:text-[24px] font-normal font-cormorant leading-[28.8px] uppercase underline underline-offset-4 hover:text-white transition-colors duration-300"
              >
                Explore Reviews
              </Link>
            </motion.div>
            
            <motion.div variants={fadeInUp}>
              <Link
                href="/the-collective"
                className="text-md md:text-[24px] font-normal font-cormorant leading-[28.8px] uppercase underline underline-offset-4 hover:text-white transition-colors duration-300"
              >
                Discover Brands
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}