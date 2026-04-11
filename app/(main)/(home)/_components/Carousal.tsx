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
  useReducedMotion,
  Variants,
  useSpring,
  useMotionValue,
} from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
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
    name: "STARFISH",
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
  sideScale: 0.85,
  farScale: 0.7,
  centerOffset: 0,
  sideOffset: 340,
  farOffset: 620,
  centerYOffset: -80,
  sideYOffset: 0,
  farYOffset: 60,
  centerAnchor: "50%",
  springStiffness: 180,
  springDamping: 25,
  swipeThreshold: 50,
  autoPlayInterval: 5000,
} as const;

const useMagneticButton = (ref: React.RefObject<HTMLButtonElement | null>) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  useEffect(() => {
    const button = ref.current;
    if (!button) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;

      x.set(distanceX * 0.3);
      y.set(distanceY * 0.3);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    button.addEventListener("mousemove", handleMouseMove);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      button.removeEventListener("mousemove", handleMouseMove);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [ref, x, y]);

  return { x: springX, y: springY };
};

const useCarousel = (
  itemCount: number,
  autoPlay: boolean = false,
  interval: number = CONFIG.autoPlayInterval,
) => {
  const [activeIndex, setActiveIndex] = useState(0); // Active index of the carousel
  const [direction, setDirection] = useState(0); // Direction of the carousel movement
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

const AnimatedLetters = ({
  text,
  isActive,
}: {
  text: string;
  isActive: boolean;
}) => {
  const letters = text.split("");

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.1,
      },
    },
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 20,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      rotateX: -90,
    },
  };

  if (!isActive) return <span>{text}</span>;

  return (
    <motion.span
      style={{ display: "inline-block", perspective: "1000px" }}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          variants={child}
          style={{
            display: "inline-block",
            transformOrigin: "bottom",
            whiteSpace: letter === " " ? "pre" : undefined,
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.span>
  );
};

const cardVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? CONFIG.sideOffset * 2 : -CONFIG.sideOffset * 2,
    opacity: 0,
    scale: CONFIG.sideScale * 0.6,
    rotateY: direction > 0 ? 60 : -60,
    z: -200,
  }),
  center: {
    x: CONFIG.centerOffset,
    y: CONFIG.centerYOffset,
    opacity: 1,
    scale: CONFIG.centerScale,
    rotateY: 0,
    z: 0,
    transition: {
      type: "spring",
      stiffness: CONFIG.springStiffness,
      damping: CONFIG.springDamping,
      mass: 1.2,
    },
  },
  side: (position: "left" | "right") => ({
    x: position === "left" ? -CONFIG.sideOffset : CONFIG.sideOffset,
    y: CONFIG.sideYOffset,
    opacity: 0.9,
    scale: CONFIG.sideScale,
    rotateY: position === "left" ? 25 : -25,
    z: -100,
    transition: {
      type: "spring",
      stiffness: CONFIG.springStiffness,
      damping: CONFIG.springDamping,
    },
  }),
  far: (position: "left" | "right") => ({
    x: position === "left" ? -CONFIG.farOffset : CONFIG.farOffset,
    y: CONFIG.farYOffset,
    opacity: 0.6,
    scale: CONFIG.farScale,
    rotateY: position === "left" ? 35 : -35,
    z: -200,
    transition: {
      type: "spring",
      stiffness: CONFIG.springStiffness,
      damping: CONFIG.springDamping,
    },
  }),
  exit: (direction: number) => ({
    x: direction > 0 ? -CONFIG.sideOffset * 2 : CONFIG.sideOffset * 2,
    opacity: 0,
    scale: CONFIG.sideScale * 0.6,
    rotateY: direction > 0 ? -60 : 60,
    z: -200,
    transition: { duration: 0.4, ease: [0.32, 0.72, 0, 1] },
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
          zIndex:
            position === "center" ? 30 : position.includes("far") ? 10 : 20,
          willChange: "transform, opacity",
        }}
      >
        {/* Clean Image Container - No background, no shadow, no floating */}
        <div className="relative mt-6 aspect-4/5 w-70 md:w-90 lg:w-105">
          {/* Shimmer Loading Effect */}
          {!isLoaded && !hasError && (
            <div className="absolute inset-0 overflow-hidden bg-neutral-800">
              <motion.div
                className="absolute inset-0 bg-linear-to-r from-transparent via-neutral-700 to-transparent"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              />
            </div>
          )}

          {/* Error State */}
          {hasError && (
            <div className="absolute inset-0 flex items-center justify-center bg-neutral-100">
              <span className="font-mono text-sm text-neutral-500">
                Failed to load
              </span>
            </div>
          )}

          <div className="relative h-full w-full">
            <Image
              src={brand.src}
              alt={`${brand.name} brand showcase`}
              fill
              priority={isActive}
              className="object-contain"
              sizes="(max-width: 768px) 280px, (max-width: 1024px) 380px, 420px"
              onLoad={() => setIsLoaded(true)}
              onError={() => setHasError(true)}
              draggable={false}
            />
          </div>
        </div>

        {/* Typography */}
        <div className="relative mt-6 max-w-70 text-center">
          <motion.div
            initial={false}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0.6, y: 5 }}
            transition={{ duration: 0.4 }}
          >
            <h3 className="font-cormorant text-lg font-light tracking-[0.2em] text-neutral-900 uppercase md:text-2xl">
              <AnimatedLetters
                text={brand.name}
                isActive={isActive && !shouldReduceMotion}
              />
            </h3>
          </motion.div>
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
        <Image
          src="/Arrow 1.svg"
          alt="Arrow 1"
          width={279}
          height={8}
          className="w-full transition-transform group-hover:translate-x-1"
        />
      ) : (
        <Image
          src="/Arrow 2.svg"
          alt="Arrow 2"
          width={279}
          height={8}
          className="w-full transition-transform group-hover:-translate-x-1"
        />
      )}
    </div>
  </motion.button>
);

const ProgressIndicator = ({
  total,
  current,
  onSelect,
}: {
  total: number;
  current: number;
  onSelect: (index: number) => void;
}) => {
  return (
    <div className="mt-12 flex items-center justify-center gap-2">
      {Array.from({ length: total }).map((_, index) => (
        <motion.button
          key={index}
          onClick={() => onSelect(index)}
          className="relative h-1 overflow-hidden rounded-full bg-neutral-200"
          style={{ width: index === current ? 32 : 8 }}
          whileHover={{ scale: 1.2 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <motion.div
            className="absolute inset-0 bg-neutral-900"
            initial={false}
            animate={{
              scaleX: index === current ? 1 : 0,
              opacity: index === current ? 1 : 0.3,
            }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ originX: 0 }}
          />
          {index === current && (
            <motion.div
              className="absolute inset-0 bg-neutral-600"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: [0, 1] }}
              transition={{ duration: 5, ease: "linear" }}
              style={{ originX: 0 }}
            />
          )}
        </motion.button>
      ))}
    </div>
  );
};

const ProfessionalCarousel: React.FC<CarouselProps> = ({
  brands = DEFAULT_BRANDS,
  autoPlay = true,
  autoPlayInterval = CONFIG.autoPlayInterval,
  className = "",
}) => {
  const { activeIndex, direction, navigate, goTo, wrap } = useCarousel(
    brands.length,
    autoPlay,
    autoPlayInterval,
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const visibleIndices = useMemo(() => {
    return [
      wrap(activeIndex - 2),
      wrap(activeIndex - 1),
      activeIndex,
      wrap(activeIndex + 1),
      wrap(activeIndex + 2),
    ];
  }, [activeIndex, wrap]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") navigate(-1);
      else if (e.key === "ArrowRight") navigate(1);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);

  if (brands.length === 0) {
    return (
      <div className="flex h-150 items-center justify-center bg-neutral-900 text-neutral-500">
        No brands to display
      </div>
    );
  }

  return (
    <section
      ref={containerRef}
      className={`relative flex min-h-225 flex-col overflow-hidden py-24 select-none ${className}`}
      aria-roledescription="carousel"
      aria-label="Brand showcase carousel"
    >
      <div className="absolute inset-0 bg-linear-to-b from-neutral-50 via-white to-neutral-100" />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <motion.div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.04]">
        <motion.div
          animate={shouldReduceMotion ? {} : { x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 60 }}
          className="flex whitespace-nowrap"
        >
          {[...brands, ...brands, ...brands].map((brand, i) => (
            <span
              key={`${brand.id}-${i}`}
              className="mx-16 text-[180px] font-black tracking-tighter text-neutral-900 md:text-[260px]"
              style={{ WebkitTextStroke: "2px rgba(0,0,0,0.1)" }}
            >
              {brand.name}
            </span>
          ))}
        </motion.div>
      </motion.div>

      <div className="relative z-20 container mx-auto px-4">
        <motion.header
          className="mx-auto mb-24 flex max-w-6xl flex-col items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="relative mb-8 flex justify-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="relative">
              <Image
                src="/vector-logo.svg"
                alt="Vector logo"
                width={120}
                height={40}
                className="relative z-10 opacity-80"
              />
            </div>
          </motion.div>

          <div className="flex w-full items-center justify-between gap-8">
            <NavigationButton direction="left" onClick={() => navigate(-1)} />

            <div className="flex-1 text-center">
              <motion.h2
                className="font-cormorant text-lg leading-tight font-light tracking-[0.3em] text-neutral-900 uppercase md:text-2xl"
                initial={{ opacity: 0, letterSpacing: "0.1em" }}
                animate={{ opacity: 1, letterSpacing: "0.3em" }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              >
                BROWSE CAPSULE BRANDS
              </motion.h2>

              <motion.div
                className="mt-4 flex items-center justify-center gap-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <span className="h-px w-12 bg-neutral-300" />
                <motion.p
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="font-mono text-xs tracking-widest text-neutral-500"
                >
                  DROP {String(activeIndex + 1).padStart(2, "0")} /{" "}
                  {String(brands.length).padStart(2, "0")}
                </motion.p>
                <span className="h-px w-12 bg-neutral-300" />
              </motion.div>
            </div>

            <NavigationButton direction="right" onClick={() => navigate(1)} />
          </div>
        </motion.header>

        <div className="relative flex min-h-150 flex-1 touch-pan-y items-center justify-center perspective-[1500px]">
          <motion.div
            className="relative h-full w-full"
            style={{ perspective: 1500 }}
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

        <ProgressIndicator
          total={brands.length}
          current={activeIndex}
          onSelect={(index) => goTo(index)}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-2 w-2 rounded-full bg-neutral-300/30"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 20}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default ProfessionalCarousel;
