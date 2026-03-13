"use client";

import * as React from "react";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { useSearchParams } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useQueryModal } from "@/hooks";

const SortItem = ({ label, value }: { label: string; value: string }) => {
  const { open } = useQueryModal("sort", value);

  return (
    <DropdownMenuRadioItem value={value} onClick={open}>
      {label}
    </DropdownMenuRadioItem>
  );
};

const FilterInquiries = () => {
  const searchParams = useSearchParams();
  const currentSort = searchParams.get("sort") || "date_added";

  const sortOptions = [
    { label: "DATE ADDED (DEFAULT)", value: "date_added" },
    { label: "MOST HELPFUL", value: "most_helpful" },
  ];

  const currentLabel =
    sortOptions.find((option) => option.value === currentSort)?.label ||
    "Sort By";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="hover:text-primary group flex cursor-pointer items-center gap-2 text-sm font-medium transition-colors duration-300 outline-none">
          <SlidersHorizontal className="h-4 w-4" />
          <span className="relative inline-flex overflow-hidden py-1">
            <div className="flex translate-y-0 items-center gap-1 transition duration-500 group-hover:-translate-y-[175%]">
              Sort By: {currentLabel}
              <ChevronDown className="h-3 w-3 opacity-50" />
            </div>
            <div className="absolute top-0 left-0 flex h-full w-full translate-y-[175%] items-center gap-1 transition duration-500 group-hover:translate-y-0">
              Sort By: {currentLabel}
              <ChevronDown className="h-3 w-3 opacity-50" />
            </div>
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        <DropdownMenuRadioGroup value={currentSort}>
          {sortOptions.map((option) => (
            <SortItem
              key={option.value}
              label={option.label}
              value={option.value}
            />
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FilterInquiries;
