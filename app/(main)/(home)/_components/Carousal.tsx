"use client";

import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  PanInfo,
} from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface Brand {
  id: number;
  name: string;
  src: string;
  description?: string;
}

interface CarouselProps {
  brands?: Brand[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  className?: string;
}

interface CardPosition {
  index: number;
  offset: number;
  scale: number;
  zIndex: number;
  blur: number;
  opacity: number;
}

// ============================================================================
// CONFIGURATION
// ============================================================================

const DEFAULT_BRANDS: Brand[] = [
  {
    id: 1,
    name: "MEJI MEJI",
    src: "https://i.ibb.co.com/YBCQStfF/Adobe-Express-file.png",
  },
  {
    id: 2,
    name: "NADI",
    src: "https://i.ibb.co.com/YBCQStfF/Adobe-Express-file.png",
  },
  {
    id: 3,
    name: "TOFECOL",
    src: "https://i.ibb.co.com/YBCQStfF/Adobe-Express-file.png",
  },
  {
    id: 4,
    name: "STARFISH MRKT",
    src: "https://i.ibb.co.com/YBCQStfF/Adobe-Express-file.png",
  },
  {
    id: 5,
    name: "BUBON",
    src: "https://i.ibb.co.com/YBCQStfF/Adobe-Express-file.png",
  },
];

const CONFIG = {
  visibleCards: 5,
  centerScale: 1,
  sideScale: 0.8,
  farScale: 0.65,
  centerOffset: 0,
  sideOffset: 320,
  farOffset: 640,
  centerAnchor: "50%",
  springStiffness: 300,
  springDamping: 30,
  swipeThreshold: 50,
  autoPlayInterval: 5000,
} as const;

// ============================================================================
// UTILITY HOOKS
// ============================================================================

/**
 * Custom hook for text scramble effect
 */
const useTextScramble = (
  text: string,
  isActive: boolean,
  duration: number = 400,
) => {
  const [displayText, setDisplayText] = useState(text);
  const frameRef = useRef<number>();
  const chars = useMemo(() => "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", []);

  useEffect(() => {
    if (!isActive) {
      setDisplayText(text);
      return;
    }

    let iteration = 0;
    const totalIterations = text.length;
    const interval = duration / totalIterations;

    const scramble = () => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join(""),
      );

      if (iteration < totalIterations) {
        iteration += 1 / 3;
        frameRef.current = window.setTimeout(
          scramble,
          interval,
        ) as unknown as number;
      }
    };

    scramble();

    return () => {
      if (frameRef.current) clearTimeout(frameRef.current);
    };
  }, [text, isActive, duration, chars]);

  return displayText;
};

/**
 * Custom hook for carousel navigation logic
 */
const useCarousel = (
  itemCount: number,
  autoPlay: boolean = false,
  interval: number = CONFIG.autoPlayInterval,
) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const autoPlayRef = useRef<NodeJS.Timeout>();

  const wrap = useCallback(
    (index: number) => {
      return ((index % itemCount) + itemCount) % itemCount;
    },
    [itemCount],
  );

  const navigate = useCallback(
    (newDirection: number) => {
      setDirection(newDirection);
      setActiveIndex((prev) => wrap(prev + newDirection));
    },
    [wrap],
  );

  const goTo = useCallback(
    (index: number) => {
      const diff = index - activeIndex;
      setDirection(diff > 0 ? 1 : -1);
      setActiveIndex(wrap(index));
    },
    [activeIndex, wrap],
  );

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay) return;

    autoPlayRef.current = setInterval(() => {
      navigate(1);
    }, interval);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [autoPlay, interval, navigate]);

  return {
    activeIndex,
    direction,
    navigate,
    goTo,
    wrap,
  };
};

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================

const cardVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? CONFIG.sideOffset * 1.5 : -CONFIG.sideOffset * 1.5,
    opacity: 0,
    scale: CONFIG.sideScale * 0.8,
    rotateY: direction > 0 ? 45 : -45,
  }),
  center: {
    x: CONFIG.centerOffset,
    opacity: 1,
    scale: CONFIG.centerScale,
    rotateY: 0,
    transition: {
      type: "spring",
      stiffness: CONFIG.springStiffness,
      damping: CONFIG.springDamping,
      mass: 1,
    },
  },
  side: (position: "left" | "right") => ({
    x: position === "left" ? -CONFIG.sideOffset : CONFIG.sideOffset,
    opacity: 0.6,
    scale: CONFIG.sideScale,
    rotateY: position === "left" ? 15 : -15,
    transition: {
      type: "spring",
      stiffness: CONFIG.springStiffness,
      damping: CONFIG.springDamping,
    },
  }),
  far: (position: "left" | "right") => ({
    x: position === "left" ? -CONFIG.farOffset : CONFIG.farOffset,
    opacity: 0.35,
    scale: CONFIG.farScale,
    rotateY: position === "left" ? 20 : -20,
    transition: {
      type: "spring",
      stiffness: CONFIG.springStiffness,
      damping: CONFIG.springDamping,
    },
  }),
  exit: (direction: number) => ({
    x: direction > 0 ? -CONFIG.sideOffset * 1.5 : CONFIG.sideOffset * 1.5,
    opacity: 0,
    scale: CONFIG.sideScale * 0.8,
    rotateY: direction > 0 ? -45 : 45,
    transition: { duration: 0.3 },
  }),
};

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

interface CarouselCardProps {
  brand: Brand;
  position: "farLeft" | "left" | "center" | "right" | "farRight";
  direction: number;
  isActive: boolean;
}

const CarouselCard: React.FC<CarouselCardProps> = ({
  brand,
  position,
  direction,
  isActive,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const scrambledName = useTextScramble(brand.name, isActive);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const getVariant = () => {
    if (shouldReduceMotion) return "center";
    if (position === "center") return "center";
    if (position === "left") return "side";
    if (position === "right") return "side";
    if (position === "farLeft") return "far";
    if (position === "farRight") return "far";
    return "enter";
  };

  const getCustom = () => {
    if (position === "left") return "left";
    if (position === "right") return "right";
    if (position === "farLeft") return "left";
    if (position === "farRight") return "right";
    return direction;
  };

  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: CONFIG.centerAnchor, top: "50%" }}
    >
      <motion.div
        layout
        custom={getCustom()}
        variants={cardVariants}
        initial={false}
        animate={getVariant()}
        className="flex flex-col items-center"
        style={{
          zIndex: position === "center" ? 20 : 10,
          willChange: "transform, opacity",
        }}
      >
      {/* Image Container (static) */}
      <div className="relative aspect-[3/4] w-[280px] md:w-[380px] lg:w-[420px]">
        {/* Loading Skeleton */}
        {!isLoaded && !hasError && (
          <div className="absolute inset-0 animate-pulse rounded-lg bg-neutral-800" />
        )}

        {/* Error State */}
        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-neutral-800 text-neutral-500">
            <span className="text-sm">Failed to load</span>
          </div>
        )}

        <Image
          src={brand.src}
          alt={`${brand.name} brand showcase`}
          fill
          priority={isActive}
          className={`rounded-lg object-contain transition-all duration-500 ${
            isActive
              ? "opacity-100 drop-shadow-[0_30px_60px_rgba(255,255,255,0.2)]"
              : "opacity-100"
          } ${isLoaded ? "" : "opacity-0"} `}
          sizes="(max-width: 768px) 280px, (max-width: 1024px) 380px, 420px"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          draggable={false}
        />
      </div>

      {/* Brand Label with Scramble Effect */}
      <div className="relative mt-8 h-12 overflow-hidden text-center">
        <AnimatePresence mode="wait">
          {isActive && (
            <motion.div
              key={brand.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="flex flex-col items-center"
            >
              <h3 className="text-sm font-bold tracking-[0.3em] text-neutral-900 uppercase md:text-base">
                {scrambledName}
              </h3>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "48px" }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="mt-2 h-[2px] bg-gradient-to-r from-transparent via-neutral-400 to-transparent"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      </motion.div>
    </div>
  );
};

interface NavigationButtonProps {
  direction: "left" | "right";
  onClick: () => void;
  disabled?: boolean;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({
  direction,
  onClick,
  disabled,
}) => (
  <motion.button
    whileHover={{
      scale: disabled ? 1 : 1.15,
      x: direction === "left" ? -5 : 5,
    }}
    whileTap={{ scale: disabled ? 1 : 0.9 }}
    onClick={onClick}
    disabled={disabled}
    className={`group relative p-4 transition-colors ${disabled ? "cursor-not-allowed opacity-30" : "cursor-pointer hover:text-neutral-900"} text-neutral-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/30`}
    aria-label={direction === "left" ? "Previous brand" : "Next brand"}
  >
    <div className="relative">
      {direction === "left" ? (
        <ArrowLeft className="h-6 w-10 stroke-[1.5] transition-transform group-hover:-translate-x-1" />
      ) : (
        <ArrowRight className="h-6 w-10 stroke-[1.5] transition-transform group-hover:translate-x-1" />
      )}
    </div>
  </motion.button>
);

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const ProfessionalCarousel: React.FC<CarouselProps> = ({
  brands = DEFAULT_BRANDS,
  autoPlay = true,
  autoPlayInterval = CONFIG.autoPlayInterval,
  className = "",
}) => {
  const { activeIndex, direction, navigate, wrap } = useCarousel(
    brands.length,
    autoPlay,
    autoPlayInterval,
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isDragging, setIsDragging] = useState(false);

  // Calculate visible indices
  const visibleIndices = useMemo(() => {
    return [
      wrap(activeIndex - 2),
      wrap(activeIndex - 1),
      activeIndex,
      wrap(activeIndex + 1),
      wrap(activeIndex + 2),
    ];
  }, [activeIndex, wrap]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        navigate(-1);
      } else if (e.key === "ArrowRight") {
        navigate(1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);

  // Touch/Swipe handling
  const handleDragEnd = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      setIsDragging(false);
      if (Math.abs(info.offset.x) > CONFIG.swipeThreshold) {
        navigate(info.offset.x > 0 ? -1 : 1);
      }
    },
    [navigate],
  );

  const handleDragStart = useCallback(() => {
    setIsDragging(true);
  }, []);

  if (brands.length === 0) {
    return (
      <div className="flex h-[600px] items-center justify-center bg-neutral-900 text-neutral-500">
        No brands to display
      </div>
    );
  }

  return (
    <section
      ref={containerRef}
      className={`relative flex min-h-[800px] flex-col overflow-hidden py-24 select-none ${className}`}
      aria-roledescription="carousel"
      aria-label="Brand showcase carousel"
    >
      {/* Animated Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.03]">
        <motion.div
          animate={shouldReduceMotion ? {} : { x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
          className="flex whitespace-nowrap"
        >
          {[...brands, ...brands].map((brand, i) => (
            <span
              key={`${brand.id}-${i}`}
              className="mx-12 text-[200px] font-black tracking-tighter text-white md:text-[300px]"
            >
              {brand.name}
            </span>
          ))}
        </motion.div>
      </div>

      <div className="relative z-20 container mx-auto px-4">
        {/* Header Navigation */}
        <header className="mx-auto mb-20 flex max-w-6xl items-center justify-between border-b border-neutral-800/50 pb-8">
          <NavigationButton direction="left" onClick={() => navigate(-1)} />

          <div className="text-center">
            <h2 className="mb-2 text-[11px] font-semibold tracking-[0.4em] text-neutral-700 uppercase">
              Featured Collections
            </h2>
            <motion.p
              key={activeIndex}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-mono text-xs text-neutral-600"
            >
              <span className="text-neutral-600">DROP 01</span>
              <span className="mx-2">//</span>
              <span>{String(activeIndex + 1).padStart(2, "0")}</span>
              <span className="mx-1 text-neutral-700">/</span>
              <span className="text-neutral-700">
                {String(brands.length).padStart(2, "0")}
              </span>
            </motion.p>
          </div>

          <NavigationButton direction="right" onClick={() => navigate(1)} />
        </header>

        {/* Carousel Stage */}
        <div
          className="relative flex min-h-[550px] flex-1 touch-pan-y items-center justify-center"
          onDragEnd={handleDragEnd}
          onDragStart={handleDragStart}
        >
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.1}
            className="relative h-full w-full cursor-grab active:cursor-grabbing"
            style={{ perspective: 1200 }}
          >
            {visibleIndices.map((brandIndex, position) => {
              const brand = brands[brandIndex];
              const positionType =
                position === 0
                  ? "farLeft"
                  : position === 1
                    ? "left"
                    : position === 2
                      ? "center"
                      : position === 3
                        ? "right"
                        : "farRight";

              return (
                <CarouselCard
                  key={`${brand.id}-${brandIndex}`}
                  brand={brand}
                  position={positionType}
                  direction={direction}
                  isActive={position === 2}
                />
              );
            })}
          </motion.div>
        </div>

        {/* Instructions */}
        <p className="mt-8 text-center text-[10px] tracking-widest text-neutral-600 uppercase">
          Use arrow keys or swipe to navigate
        </p>
      </div>
    </section>
  );
};

export default ProfessionalCarousel;
