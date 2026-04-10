// components/newsletter-content.tsx (Client Component)
"use client";

import { useAuth } from "@/hooks";
import { motion, Variants } from "framer-motion";
import { RippleButton } from "@/components/ui/ripple-button";
import { useRouter } from "next/navigation";
// import { Input } from "@/components/ui/input";
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
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const copy = {
    line1: "Measurement Consultation",
    line2: "Your confidence.",
    description:
      "Our AI stylist will walk you through taking your body measurements step by step. No guesswork — just accurate numbers in about 5 minutes.",
    button: isAuthenticated ? "Measurement Consultation" : "Get Started",
  };

  const handleCtaClick = (e: React.FormEvent) => {
    e.preventDefault();
    if (isAuthenticated) {
      router.push("/consultation");
      return;
    }
    router.push("auth/login?redirect=/consultation");
  };

  return (
    <motion.div
      className="text-center"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <motion.h2
        className="text-muted font-logo mb-6 text-3xl leading-[120%] font-normal tracking-wider md:text-4xl lg:text-[48px]"
        variants={containerVariants}
      >
        <motion.span className="block" variants={lineVariants}>
          {copy.line1}
        </motion.span>
        <motion.span className="block" variants={lineVariants}>
          {copy.line2}
        </motion.span>
      </motion.h2>

      <motion.p
        className="text-primary-foreground text-md mx-auto mb-10 max-w-xl font-light tracking-widest md:text-sm"
        variants={itemVariants}
      >
        {copy.description}
      </motion.p>

      <motion.form
        className="mx-auto flex max-w-md flex-col gap-4 sm:flex-row"
        variants={itemVariants}
        onSubmit={handleCtaClick}
      >
        {/* <Input 
          type="email" 
          placeholder="Enter your email"
          className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-none px-6 py-6"
        /> */}
        <RippleButton
          type="submit"
          rippleColor="#000000"
          duration="700ms"
          className="group mx-auto cursor-pointer rounded-full border-0 bg-white px-8 py-4 text-sm font-medium tracking-[0.15em] text-black uppercase transition-all duration-300 hover:bg-white/90"
        >
          {copy.button}
        </RippleButton>
      </motion.form>
    </motion.div>
  );
}
