"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { AnimatedSearchBar } from "@/components/shared/animated-search-bar";
import FilterInquiries from "./FilterInquiries";
import SortBy from "./SortBy";

export const LookbookSearchBar = ({
  isOpenInquiries,
}: {
  isOpenInquiries?: boolean;
}) => {
  return (
    <motion.div
      className="container mx-auto px-4 pt-16 md:px-0"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      <div className="flex flex-col items-stretch gap-3 md:flex-row md:items-center">
        <div className="flex-1">
          <AnimatedSearchBar
            placeholder={
              isOpenInquiries ? "Search Inquiries" : "Search Reviews"
            }
            inputClassName="bg-[#FFFDF9] border-[#E7E4DF] rounded-none h-12 flex-1 w-full"
            animate={false}
          />
        </div>

        {isOpenInquiries ? <FilterInquiries /> : <SortBy />}
      </div>
    </motion.div>
  );
};

export default LookbookSearchBar;
