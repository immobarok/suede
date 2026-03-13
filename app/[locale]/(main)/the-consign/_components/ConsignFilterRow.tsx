"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const categories = [
  { label: "ALL", value: "all" },
  { label: "DRESSES", value: "dresses" },
  { label: "TOPS", value: "tops" },
  { label: "BOTTOMS", value: "bottoms" },
  { label: "OUTERWEAR", value: "outerwear" },
  { label: "ACCESSORIES", value: "accessories" },
];

const sortOptions = [
  { label: "NEWEST FIRST", value: "newest" },
  { label: "PRICE: LOW TO HIGH", value: "price_low_high" },
  { label: "PRICE: HIGH TO LOW", value: "price_high_low" },
];

const ConsignFilterRow = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentCategory = searchParams.get("category") || "all";
  const currentSort = searchParams.get("sort") || "newest";

  const setParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const currentSortLabel =
    sortOptions.find((option) => option.value === currentSort)?.label ||
    "NEWEST FIRST";

  return (
    <motion.div
      className="container mx-auto flex items-center justify-between px-4 pt-3 pb-10 md:px-0"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      <div className="flex items-center gap-2">
        {categories.map((category) => {
          const isActive = currentCategory === category.value;

          return (
            <button
              key={category.value}
              type="button"
              onClick={() => setParam("category", category.value)}
              className={
                isActive
                  ? "h-8 bg-[#1A1A1A] px-4 text-[10px] tracking-wide text-white"
                  : "h-8 bg-[#EFEDE9] px-4 text-[10px] tracking-wide text-[#8A8A82] transition-colors hover:text-primary"
              }
            >
              {category.label}
            </button>
          );
        })}
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="group flex h-8 items-center gap-2 bg-[#FFFFFF] px-4 text-[12px] font-medium tracking-wide text-[#8A8A82] transition-colors hover:text-primary"
          >
            <span className="relative inline-flex overflow-hidden py-1">
              <span className="flex translate-y-0 items-center gap-1 transition duration-500 group-hover:-translate-y-[175%]">
                {currentSortLabel}
                <ChevronDown className="h-3 w-3" />
              </span>
              <span className="absolute top-0 left-0 flex h-full w-full translate-y-[175%] items-center gap-1 transition duration-500 group-hover:translate-y-0">
                {currentSortLabel}
                <ChevronDown className="h-3 w-3" />
              </span>
            </span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuRadioGroup
            value={currentSort}
            onValueChange={(value) => setParam("sort", value)}
          >
            {sortOptions.map((option) => (
              <DropdownMenuRadioItem key={option.value} value={option.value}>
                {option.label}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </motion.div>
  );
};

export default ConsignFilterRow;
