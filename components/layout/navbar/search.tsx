"use client";

import { useRef, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SearchProps {
  isSearchOpen: boolean;
  setIsSearchOpen: (value: boolean) => void;
  searchValue: string;
  setSearchValue: (value: string) => void;
  navTextColor: string;
  navHoverColor: string;
  tooltip: string;
}

export function SearchComponent({
  isSearchOpen,
  setIsSearchOpen,
  searchValue,
  setSearchValue,
  navTextColor,
  navHoverColor,
  tooltip,
}: SearchProps) {
  const searchContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isSearchOpen) return;

    const handleOutsideClick = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      if (!searchContainerRef.current?.contains(target)) {
        setIsSearchOpen(false);
        setSearchValue("");
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsSearchOpen(false);
        setSearchValue("");
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isSearchOpen, setIsSearchOpen, setSearchValue]);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          ref={searchContainerRef}
          className="border-border flex items-center gap-2 border-r pr-4 text-sm"
        >
          <button
            className={`h-8 w-8 rounded-full ${navTextColor} ${navHoverColor}`}
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            aria-label="Toggle search"
          >
            <Search className="h-4 w-4" />
          </button>
          {isSearchOpen && (
            <Input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search"
              autoFocus
              className="h-8 w-36 rounded-md border-[#2A2A2A] bg-[#1A1A1A] text-xs text-white placeholder:text-white/60 md:w-44"
            />
          )}
        </div>
      </TooltipTrigger>
      <TooltipContent>{tooltip}</TooltipContent>
    </Tooltip>
  );
}
