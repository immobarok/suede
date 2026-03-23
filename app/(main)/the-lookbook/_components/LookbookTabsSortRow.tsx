"use client";

import { motion } from "framer-motion";
import ReviewsButton from "./ReviewsButton";
import OpenInquiriesButton from "./OpenInquiriesButton";

type LookbookTabsSortRowProps = {
  isOpenInquiries: boolean;
};

const LookbookTabsSortRow = ({ isOpenInquiries }: LookbookTabsSortRowProps) => {
  return (
    <div className="container mx-auto flex flex-col gap-4 px-4 pt-5 pb-0">
      <motion.div
        className="flex items-center gap-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{
          duration: 0.8,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        <ReviewsButton />
        <OpenInquiriesButton />
      </motion.div>
    </div>
  );
};

export default LookbookTabsSortRow;
