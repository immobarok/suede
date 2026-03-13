"use client";

import { motion } from "framer-motion";
import ReviewsButton from "./ReviewsButton";
import OpenInquiriesButton from "./OpenInquiriesButton";
import SortBy from "./SortBy";
import FilterInquiries from "./FilterInquiries";

type LookbookTabsSortRowProps = {
  isOpenInquiries: boolean;
};

const LookbookTabsSortRow = ({ isOpenInquiries }: LookbookTabsSortRowProps) => {
  return (
    <motion.div
      className="container mx-auto flex items-center justify-between px-4 pt-10"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      <div className="flex items-center gap-6">
        <ReviewsButton />
        <OpenInquiriesButton />
      </div>
      {isOpenInquiries ? <FilterInquiries /> : <SortBy />}
    </motion.div>
  );
};

export default LookbookTabsSortRow;
