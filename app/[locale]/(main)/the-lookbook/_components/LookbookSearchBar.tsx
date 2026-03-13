"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const LookbookSearchBar = () => {
  const [value, setValue] = React.useState("");
  const [isFocused, setIsFocused] = React.useState(false);

  const showAnimatedHint = !isFocused && value.length === 0;

  return (
    <motion.div
      className="container mx-auto pt-8"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      <div className="group relative">
        <Search className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-[#8A8A82]" />
        <Input
          type="search"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="border-primary/20 h-12 rounded-none bg-[#F9F8F6] pl-10"
          aria-label="Search by item or brand"
        />

        {showAnimatedHint && (
          <span className="pointer-events-none absolute top-1/2 left-10 -translate-y-1/2 overflow-hidden text-sm text-[#8A8A82]">
            <span className="block translate-y-0 transition duration-500 group-hover:-translate-y-[175%]">
              Search by item or brand
            </span>
            <span className="absolute top-0 left-0 block translate-y-[175%] transition duration-500 group-hover:translate-y-0">
              Search by item or brand
            </span>
          </span>
        )}
      </div>
    </motion.div>
  );
};

export default LookbookSearchBar;
