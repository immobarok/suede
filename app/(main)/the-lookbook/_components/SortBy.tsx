"use client";

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

const SortBy = () => {
  const searchParams = useSearchParams();
  const currentSort = searchParams.get("sort") || "date_added";

  const sortOptions = [
    { label: "DATE", value: "date_added" },
    { label: "BRAND A → Z", value: "brand_a_z" },
    { label: "HIGHEST RATING", value: "highest_rating" },
    { label: "LOWEST RATING", value: "lowest_rating" },
  ];

  const currentLabel =
    sortOptions.find((opt) => opt.value === currentSort)?.label || "Sort By";

  return (
    <div className="flex w-full flex-col items-stretch justify-end gap-3 md:w-auto md:flex-row md:items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex h-12 items-center justify-between gap-2 border border-[#E7E4DF] bg-white px-6 text-[13px] font-medium whitespace-nowrap text-[#8A8A82] uppercase transition-colors hover:bg-[#F9F8F6] md:justify-start">
            Sort by: {currentLabel} <ChevronDown className="h-4 w-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          sideOffset={6}
          className="w-48 max-w-[calc(100vw-2rem)] rounded-none border-[#E7E4DF]"
        >
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

      <button className="flex h-12 items-center justify-center gap-2 border border-[#E7E4DF] bg-white px-6 text-[13px] font-medium whitespace-nowrap text-[#8A8A82] uppercase transition-colors hover:bg-[#F9F8F6] md:justify-start">
        <SlidersHorizontal className="h-4 w-4" /> Filter
      </button>
    </div>
  );
};

export default SortBy;
