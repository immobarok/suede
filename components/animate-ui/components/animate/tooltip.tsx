"use client";

import * as React from "react";

import {
  TooltipProvider as TooltipProviderPrimitive,
  Tooltip,
  TooltipTrigger,
  TooltipPositioner,
  TooltipPopup,
  TooltipArrow,
  type TooltipProviderProps as TooltipProviderPrimitiveProps,
  type TooltipPositionerProps,
  type TooltipPopupProps,
} from "@/components/animate-ui/primitives/base/tooltip";
import { cn } from "@/lib/utils";

type TooltipProviderProps = TooltipProviderPrimitiveProps & {
  openDelay?: number;
  delay?: number;
};

function TooltipProvider({
  openDelay,
  delay,
  ...props
}: TooltipProviderProps) {
  const resolvedDelay = delay ?? openDelay ?? 0;
  return <TooltipProviderPrimitive delay={resolvedDelay} {...props} />;
}

type TooltipContentProps = TooltipPositionerProps &
  TooltipPopupProps & {
    hidden?: boolean;
  };

function TooltipContent({
  className,
  sideOffset = 4,
  children,
  hidden,
  style,
  ...props
}: TooltipContentProps) {
  if (hidden) return null;

  return (
    <TooltipPositioner sideOffset={sideOffset} className="z-50" {...props}>
      <TooltipPopup
        className={cn(
          "bg-primary text-primary-foreground w-fit origin-(--transform-origin) rounded-md px-3 py-1.5 text-xs text-balance",
          className,
        )}
        style={style}
      >
        {children}
        <TooltipArrow className="bg-primary fill-primary z-50 size-2.5 data-[side='bottom']:-top-[4px] data-[side='right']:-left-[4px] data-[side='left']:-right-[4px] data-[side='inline-start']:-right-[4px] data-[side='inline-end']:-left-[4px] rotate-45 rounded-[2px]" />
      </TooltipPopup>
    </TooltipPositioner>
  );
}

export { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger };
