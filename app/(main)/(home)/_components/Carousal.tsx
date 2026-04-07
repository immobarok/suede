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
  Variants,
} from "framer-motion";
import { ArrowLeft, ArrowRight, Icon, MoveLeft, MoveRight } from "lucide-react";
import Image from "next/image";

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


const DEFAULT_BRANDS: Brand[] = [
  {
    id: 1,
    name: "MEJI MEJI",
    src: "https://i.ibb.co/tpd2fMgh/c46b97c48bbaecc3dbdaabe604d42fd16ca7f99a.png",
  },

  {
    id: 2,
    name: "NADI",
    src: "https://i.ibb.co/Q3phd8gR/630dcef786cdfbe83bd6b096aea91afcdadf271a.png",
  },
  {
    id: 3,
    name: "TOFECOL",
    src: "https://i.ibb.co/hFT0mX6L/image-42.png",
  },
  {
    id: 4,
    name: "STARFISH MRKT",
    src: "https://i.ibb.co/t0FJFN2/image-45.png",
  },
  {
    id: 5,
    name: "BUBON",
    src: "https://i.ibb.co/BKvLD7qR/image-43.png",
  },

];

const CONFIG = {
  visibleCards: 5,
  centerScale: 1,
  sideScale: 0.88,
  farScale: 0.78,
  centerOffset: 0,
  sideOffset: 320,
  farOffset: 640,
  centerYOffset: -60,
  sideYOffset: 10,
  farYOffset: 70,
  centerAnchor: "50%",
  springStiffness: 300,
  springDamping: 30,
  swipeThreshold: 50,
  autoPlayInterval: 5000,
} as const;


const useTextScramble = (
  text: string,
  isActive: boolean,
  duration: number = 400,
) => {
  const [displayText, setDisplayText] = useState(text);
  const frameRef = useRef<number | null>(null);
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
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

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


const scaleIn:Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 0.8, 
    scale: 1,
    transition: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }
  }
};

const cardVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? CONFIG.sideOffset * 1.5 : -CONFIG.sideOffset * 1.5,
    opacity: 0,
    scale: CONFIG.sideScale * 0.8,
    rotateY: direction > 0 ? 45 : -45,
  }),
  center: {
    x: CONFIG.centerOffset,
    y: CONFIG.centerYOffset,
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
    y: CONFIG.sideYOffset,
    opacity: 1,
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
    y: CONFIG.farYOffset,
    opacity: 1,
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
  const [transitionKey, setTransitionKey] = useState(0);

  useEffect(() => {
    if (isActive) {
      setTransitionKey((k) => k + 1);
    }
  }, [isActive, brand.id]);

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
        {/* Image Container */}
        <div className="relative mt-6 aspect-[4/5] w-[280px] md:w-[380px] lg:w-[420px] py-12">
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

          <div className="relative h-full w-full">
            <Image
              src={brand.src}
              alt={`${brand.name} brand showcase`}
              fill
              priority={isActive}
              className="rounded-lg object-contain"
              sizes="(max-width: 768px) 280px, (max-width: 1024px) 380px, 420px"
              onLoad={() => setIsLoaded(true)}
              onError={() => setHasError(true)}
              draggable={false}
            />

          </div>
        </div>

        <div className="relative text-center text-[#000] max-w-[160px]">
          <h3 className="text-md font-normal font-cormorant uppercase md:text-[24px]">
            {brand.name}
          </h3>
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
    <div className="relative w-full">
      {direction === "left" ? (
        <Image src="/Arrow 1.svg" alt="Arrow 1" width={279} height={8} className="w-full transition-transform group-hover:translate-x-1"/>
      ) : (
        <Image src="/Arrow 2.svg" alt="Arrow 2" width={279} height={8} className="w-full transition-transform group-hover:-translate-x-1"/>
      )}
    </div>
  </motion.button>
);

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
        <header className="mx-auto mb-20 flex flex-col items-center max-w-6xl">
          {/* Top Logo */}
          <motion.div 
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            className="flex justify-center mb-6"
          >
            <Image
              src="/vector-logo.svg"
              alt="Vector logo"
              width={120}
              height={40}
              className="opacity-80"
            />
          </motion.div>

          <div className="flex w-full items-center justify-between">
            <NavigationButton direction="left" onClick={() => navigate(-1)} />

            <div className="text-center">
              <h2 className="text-md md:text-[24px] font-normal font-cormorant leading-[28.8px] uppercase">
                BROWSE CAPSULE BRANDS
              </h2>
              <motion.p
                key={activeIndex}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-mono text-xs text-neutral-600 mt-1"
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
          </div>
        </header>

        {/* Carousel Stage */}
        <div className="relative flex min-h-[550px] flex-1 touch-pan-y items-center justify-center">
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.1}
            onDragEnd={handleDragEnd}
            onDragStart={handleDragStart}
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
      </div>
    </section>
  );
};

export default ProfessionalCarousel;
