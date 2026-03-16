"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedContentProps {
  children: ReactNode;
  delay?: number;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15, scale: 0.99 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as any, // Custom Quart Out
    },
  },
};

export default function AnimatedContainer({ children }: { children: ReactNode }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col"
    >
      {children}
    </motion.div>
  );
}

export function AnimatedItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}

export function AnimatedButton({ children, className, onClick, variant = "primary" }: { 
    children: ReactNode; 
    className?: string; 
    onClick?: () => void;
    variant?: "primary" | "secondary";
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.01, filter: "brightness(1.1)" }}
      whileTap={{ scale: 0.98 }}
      className={className}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}
