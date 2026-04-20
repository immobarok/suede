"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type ValuesMetadata = {
  stats?: Array<{
    value?: string;
    description?: string;
  }>;
};

type ValueItem = {
  metadata?: ValuesMetadata;
};

type ValuesContent = ValueItem[];

function AnimatedNumber({
  target,
  suffix = "",
  prefix = "",
  startAnimation,
  duration = 1200,
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  startAnimation: boolean;
  duration?: number;
}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!startAnimation) return;

    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const next = Math.round(target * eased);
      setValue(next);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [startAnimation, target, duration]);

  return (
    <span>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}

function AnimatedRange({
  min,
  max,
  startAnimation,
}: {
  min: number;
  max: number;
  startAnimation: boolean;
}) {
  return (
    <span>
      $
      <AnimatedNumber target={min} startAnimation={startAnimation} />
      {" - $"}
      <AnimatedNumber target={max} startAnimation={startAnimation} />
    </span>
  );
}

const defaultStats = [
  {
    value: "25%",
    description: "chance of online apparel orders being returned to the seller",
  },
  {
    value: "$21 - $46",
    description: "lost per returned product",
  },
  {
    value: "38%",
    description:
      "of consumers return clothing they purchased online due to poor fit",
  },
];

export function ValuesSection({ content }: { content?: ValuesContent }) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const incomingStats = content?.[0]?.metadata?.stats;
  const stats = incomingStats?.length ? incomingStats : defaultStats;

  return (
    <section ref={sectionRef} className="bg-[#EBEBEA] py-14 md:py-20">
      <div className="container mx-auto px-6 md:px-10 lg:px-0">
        <div className="grid grid-cols-1 gap-12 text-center md:grid-cols-3 md:gap-8">
          {stats.slice(0, 3).map((stat, index) => (
            <motion.div
              key={`${stat.value}-${index}`}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{
                duration: 0.65,
                delay: 0.12 * index,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="mx-auto max-w-[320px]"
            >
              <h3 className="font-cormorant text-[54px] leading-none font-normal tracking-[0.01em] text-black/65 md:text-[58px]">
                {(() => {
                  const value = stat.value || "";
                  const percentMatch = value.match(/^(\d+)%$/);
                  const rangeMatch = value.match(/^\$(\d+)\s*-\s*\$(\d+)$/);

                  if (percentMatch) {
                    return (
                      <AnimatedNumber
                        target={Number(percentMatch[1])}
                        suffix="%"
                        startAnimation={isInView}
                      />
                    );
                  }

                  if (rangeMatch) {
                    return (
                      <AnimatedRange
                        min={Number(rangeMatch[1])}
                        max={Number(rangeMatch[2])}
                        startAnimation={isInView}
                      />
                    );
                  }

                  return value;
                })()}
              </h3>

              <p className="font-darker mx-auto mt-6 max-w-[280px] text-[18px] leading-[1.45] text-black/85 md:text-[21px]">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
