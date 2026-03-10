// components/newsletter-content.tsx (Client Component)
"use client";

import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

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

const itemVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

const lineVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 40,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

export function NewsletterContent() {
  const t = useTranslations("Newsletter");

  return (
    <motion.div
      className="text-center"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <motion.h2 
        className="text-accent text-3xl md:text-4xl lg:text-[48px] font-logo leading-[120%] mb-6 tracking-wider font-normal"
        variants={containerVariants}
      >
        <motion.span 
          className="block"
          variants={lineVariants}
        >
          {t("line1")}
        </motion.span>
        <motion.span 
          className="block"
          variants={lineVariants}
        >
          {t("line2")}
        </motion.span>
      </motion.h2>

      <motion.p 
        className="text-accent/80 text-sm md:text-sm max-w-md mx-auto mb-10 font-light tracking-[0.1em]"
        variants={itemVariants}
      >
        {t("description")}
      </motion.p>

      <motion.form 
        className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
        variants={itemVariants}
        onSubmit={(e) => e.preventDefault()}
      >
        {/* <Input 
          type="email" 
          placeholder="Enter your email"
          className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-none px-6 py-6"
        /> */}
        <Button 
          type="submit"
          className="bg-primary mx-auto hover:bg-primary/80 text-white px-8 py-6 text-sm tracking-[0.15em] uppercase font-medium rounded-none group transition-all duration-300 cursor-pointer"
        >
          {t("button")}
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </motion.form>
    </motion.div>
  );
}