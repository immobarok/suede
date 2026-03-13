"use client";

import { motion } from "framer-motion";

const ConsignSellAction = () => {
  return (
    <motion.div
      className="container mx-auto flex justify-end px-4 md:px-0 pt-6"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      <button
        type="button"
        className="bg-primary hover:bg-primary/90 h-10 cursor-pointer px-6 text-xs tracking-wide text-white transition-colors"
      >
        SELL YOUR PIECE
      </button>
    </motion.div>
  );
};

export default ConsignSellAction;
