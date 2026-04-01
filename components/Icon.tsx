"use client";

import type {
  CSSProperties,
  MouseEvent,
  MouseEventHandler,
  ReactNode,
} from "react";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { ReactSVG } from "react-svg";
import { cn } from "@/lib/utils";

interface IconProps {
  src: string;
  className?: string;
  style?: CSSProperties;
  onClick?: MouseEventHandler<SVGSVGElement>;
  "aria-label"?: string;
  "aria-hidden"?: boolean;
  role?: string;
  fallback?: ReactNode;
}

const Icon = memo<IconProps>(
  ({
    src,
    className,
    style,
    onClick,
    "aria-label": ariaLabel,
    "aria-hidden": ariaHidden,
    role = onClick ? "button" : "img",
    fallback,
  }) => {
    const svgRef = useRef<SVGSVGElement | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    // Handle click with proper event delegation
    const handleClick = useCallback(
      (e: MouseEvent<HTMLSpanElement>) => {
        if (onClick && svgRef.current?.contains(e.target as Node)) {
          Object.defineProperty(e, "currentTarget", {
            value: svgRef.current,
            writable: false,
          });
          onClick(e as unknown as MouseEvent<SVGSVGElement>);
        }
      },
      [onClick]
    );

    // Cleanup refs on unmount
    useEffect(() => {
      return () => {
        svgRef.current = null;
      };
    }, [src]);

    if (hasError && fallback) {
      return (
        <span className={className} style={style}>
          {fallback}
        </span>
      );
    }

    return (
      <span
        className={cn(
          "inline-flex items-center justify-center",
          onClick && "cursor-pointer",
          !isLoaded && "animate-pulse bg-stone-200/20",
          className
        )}
        style={style}
        onClick={handleClick}
        role={role}
        aria-label={ariaLabel}
        aria-hidden={ariaHidden}
        tabIndex={onClick ? 0 : undefined}
        onKeyDown={
          onClick
            ? (e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleClick(e as unknown as MouseEvent<HTMLSpanElement>);
                }
              }
            : undefined
        }
      >
        <ReactSVG
          src={src}
          loading={() => <span className="w-full h-full" />}
          wrapper="span"
          className="w-full h-full"
          beforeInjection={(svg:any) => {
            // Store ref for event delegation
            svgRef.current = svg;

            // Apply classes safely
            if (className) {
              const classes = className.split(" ").filter(Boolean);
              svg.classList.add(...classes);
            }

            // Apply styles safely
            if (style) {
              Object.entries(style).forEach(([key, value]) => {
                svg.style.setProperty(key, String(value));
              });
            }

            // Accessibility attributes on SVG itself
            if (ariaLabel) {
              svg.setAttribute("aria-label", ariaLabel);
            }
            if (role && !svg.getAttribute("role")) {
              svg.setAttribute("role", role);
            }
          }}
          afterInjection={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
        />
      </span>
    );
  }
);

Icon.displayName = "Icon";

export default Icon;
