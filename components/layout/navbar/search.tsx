"use client";

import { useRef, useEffect } from "react";
import { ChevronDown, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-user";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
}

export function SearchComponent({
  isSearchOpen,
  setIsSearchOpen,
  searchValue,
  setSearchValue,
  navTextColor,
  navHoverColor,
}: SearchProps) {
  const searchContainerRef = useRef<HTMLDivElement | null>(null);
  const { isAuthenticated } = useAuth();

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
    <div ref={searchContainerRef} className="flex items-center gap-8 text-sm">

      <div className="flex items-center gap-2">
        <button
          className={`h-8 w-8 rounded-full ${navTextColor} ${navHoverColor}`}
          onClick={() => setIsSearchOpen(!isSearchOpen)}
          aria-label="Toggle search"
        >
          <Search className="h-[22px] w-[22px]" />
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
    </div>
  );
}
