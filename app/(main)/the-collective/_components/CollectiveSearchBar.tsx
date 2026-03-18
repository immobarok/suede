"use client";

import { motion } from "framer-motion";
import { ChevronDown, Filter, SlidersHorizontal } from "lucide-react";
import { AnimatedSearchBar } from "@/components/shared/animated-search-bar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const CollectiveSearchBar = () => {
  return (
    <motion.div
      className="container mx-auto flex flex-col md:flex-row items-stretch md:items-center gap-3 px-4 md:px-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex-1">
        <AnimatedSearchBar
          placeholder="Search Members"
          inputClassName="bg-white border-[#E7E4DF] rounded-none h-12"
          animate={false} // Disable individual animation since parent handles it
        />
      </div>
      
      <div className="flex items-center gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex h-12 items-center gap-2 bg-white border border-[#E7E4DF] px-6 text-[13px] text-[#8A8A82] font-medium transition-colors hover:bg-[#F9F8F6] whitespace-nowrap">
              Sort by <ChevronDown className="h-4 w-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 rounded-none border-[#E7E4DF]">
            <DropdownMenuRadioGroup value="recent">
              <DropdownMenuRadioItem value="recent" className="font-darker">Recent</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="popular" className="font-darker">Popular</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="match" className="font-darker">Best Match</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <button className="flex h-12 items-center gap-2 bg-white border border-[#E7E4DF] px-6 text-[13px] text-[#8A8A82] font-medium transition-colors hover:bg-[#F9F8F6] whitespace-nowrap">
          <SlidersHorizontal className="h-4 w-4" /> Filter
        </button>
      </div>
    </motion.div>
  );
};
