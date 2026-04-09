"use client";

import { motion } from "motion/react";
import { UserPlus } from "lucide-react";
import Image from "next/image";
import { useQueryModal } from "@/hooks";
import { RippleButton } from "@/components/ui/ripple-button";

interface BrandCardProps {
  name: string;
  category: string;
  location: string;
  description: string;
  rating: number;
  ethics: number;
  reviews: number;
  followers: string;
  image: string;
  index?: number;
}

export function BrandCard({
  name,
  description,
  reviews,
  followers,
  image,
  index = 0,
}: BrandCardProps) {
  const { open } = useQueryModal("view", "review");

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="relative"
    >
      <div className="group relative isolate flex min-h-105 items-end gap-0 bg-transparent px-4 pt-0 pb-0 text-black md:px-4">
        <div className="absolute inset-0 z-0 flex items-end">
          <Image
            src={image}
            alt={name}
            fill
            className="object-contain object-bottom mix-blend-multiply transition-all duration-700 ease-in-out group-hover:scale-110"
            sizes="(max-width: 768px) 160px, 220px"
          />
        </div>

        <div className="relative z-10 flex min-h-105 flex-1 flex-col items-end justify-end gap-4 pb-0 text-end">
          <p className="font-cormorant max-w-40 text-[16px] leading-relaxed text-black">
            {description}
          </p>

          <div className="flex items-end justify-end gap-1 text-black">
            {[...Array(5)].map((_, i) => (
              <svg
                key={`star-${i}`}
                xmlns="http://www.w3.org/2000/svg"
                width="23"
                height="22"
                viewBox="0 0 23 22"
                fill="none"
              >
                <path
                  d="M11.4141 0L14.1082 8.2918H22.8267L15.7733 13.4164L18.4675 21.7082L11.4141 16.5836L4.36064 21.7082L7.05481 13.4164L0.00138474 8.2918H8.71989L11.4141 0Z"
                  fill="black"
                />
              </svg>
            ))}
          </div>

          <div className="text-[14px] text-black">{reviews} Reviews</div>
          <div className="text-[14px] text-black">{followers} Followers</div>
          <RippleButton
            onClick={open}
            className="w-fit cursor-pointer bg-black px-4 py-2 text-[11px] tracking-[0.25em] text-white uppercase border-none rounded-none"
          >
            Explore
          </RippleButton>
        </div>

        <div className="font-cormorant absolute bottom-0 left-10 flex items-center gap-1 text-[32px] text-black [text-orientation:mixed] [writing-mode:vertical-rl] md:left-20">
          <span className="rotate-180">{name}</span>
          <UserPlus className="h-5 w-5" />
        </div>
      </div>
    </motion.div>
  );
}
