"use client";

import * as React from "react";
import { motion, type Transition } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface AnimatedSearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  className?: string;
  inputClassName?: string;
  iconClassName?: string;
  placeholderClassName?: string;
  animate?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  type?: "search" | "text";
}

// Define transition as const to satisfy TypeScript
const defaultTransition: Transition = {
  duration: 0.8,
  ease: [0.25, 0.1, 0.25, 1] as const, // Use 'as const' for tuple type
};

const AnimatedSearchBar = React.forwardRef<
  HTMLInputElement,
  AnimatedSearchBarProps
>(
  (
    {
      placeholder = "Search by item or brand",
      value: controlledValue,
      onChange,
      onFocus,
      onBlur,
      className,
      inputClassName,
      iconClassName,
      placeholderClassName,
      animate = true,
      disabled = false,
      autoFocus = false,
      type = "search",
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = React.useState("");
    const [isFocused, setIsFocused] = React.useState(false);

    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : internalValue;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    };

    const handleFocus = () => {
      setIsFocused(true);
      onFocus?.();
    };

    const handleBlur = () => {
      setIsFocused(false);
      onBlur?.();
    };

    const showAnimatedHint = !isFocused && value.length === 0;

    if (!animate) {
      return (
        <div className={cn("w-full", className)}>
          <div className="group relative">
            <Search
              className={cn(
                "pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-[#8A8A82]",
                iconClassName,
              )}
            />

            <Input
              ref={ref}
              type={type}
              value={value}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              disabled={disabled}
              autoFocus={autoFocus}
              className={cn(
                "h-12 rounded-none border-[#e5e5e5] bg-[#F9F8F6] pr-4 pl-10",
                "text-[#1A1A1A] placeholder:text-transparent",
                "focus:border-[#C9A96E] focus:ring-0 focus:ring-offset-0",
                "transition-colors duration-300",
                disabled && "cursor-not-allowed opacity-50",
                inputClassName,
              )}
              aria-label={placeholder}
            />

            {showAnimatedHint && (
              <span
                className={cn(
                  "pointer-events-none absolute top-1/2 left-10 -translate-y-1/2 overflow-hidden text-sm text-[#8A8A82]",
                  placeholderClassName,
                )}
              >
                <span className="block translate-y-0 transition-transform duration-500 ease-out group-hover:-translate-y-[175%]">
                  {placeholder}
                </span>
                <span className="absolute top-0 left-0 block translate-y-[175%] transition-transform duration-500 ease-out group-hover:translate-y-0">
                  {placeholder}
                </span>
              </span>
            )}
          </div>
        </div>
      );
    }

    return (
      <motion.div
        className={cn("w-full", className)}
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={defaultTransition}
      >
        <div className="group relative">
          <Search
            className={cn(
              "pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-[#8A8A82]",
              iconClassName,
            )}
          />

          <Input
            ref={ref}
            type={type}
            value={value}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={disabled}
            autoFocus={autoFocus}
            className={cn(
              "h-12 rounded-none border-[#e5e5e5] bg-[#F9F8F6] pr-4 pl-10",
              "text-[#1A1A1A] placeholder:text-transparent",
              "focus:border-[#C9A96E] focus:ring-0 focus:ring-offset-0",
              "transition-colors duration-300",
              disabled && "cursor-not-allowed opacity-50",
              inputClassName,
            )}
            aria-label={placeholder}
          />

          {showAnimatedHint && (
            <span
              className={cn(
                "pointer-events-none absolute top-1/2 left-10 -translate-y-1/2 overflow-hidden text-sm text-[#8A8A82]",
                placeholderClassName,
              )}
            >
              <span className="block translate-y-0 transition-transform duration-500 ease-out group-hover:-translate-y-[175%]">
                {placeholder}
              </span>
              <span className="absolute top-0 left-0 block translate-y-[175%] transition-transform duration-500 ease-out group-hover:translate-y-0">
                {placeholder}
              </span>
            </span>
          )}
        </div>
      </motion.div>
    );
  },
);

AnimatedSearchBar.displayName = "AnimatedSearchBar";

export { AnimatedSearchBar };
