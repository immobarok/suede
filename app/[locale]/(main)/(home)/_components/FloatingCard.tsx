"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export interface FloatingCardProps {
  image: string;
  brand: string;
  name: string;
  price: number;
  originalPrice: number;
  rotation: number;
  xOffset: number;
  yOffset: number;
  delay: number;
  centerOnMobile?: boolean;
}

const FloatingCard = ({
  image,
  brand,
  name,
  price,
  originalPrice,
  rotation,
  xOffset,
  yOffset,
  delay,
  centerOnMobile = false,
}: FloatingCardProps) => {
  return (
    <motion.div
      className={`absolute w-56 max-w-[calc(100vw-2rem)] bg-white p-3 shadow-xl sm:w-64 md:w-70 md:p-4 ${centerOnMobile ? "-translate-x-1/2" : ""}`}
      style={{
        rotate: rotation,
        left: centerOnMobile ? `calc(50% + ${xOffset}px)` : xOffset,
        top: yOffset,
      }}
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      whileHover={{
        scale: 1.02,
        rotate: rotation - 2,
        transition: { duration: 0.3 },
      }}
    >
      <div className="relative mb-0 md:mb-4 aspect-4/5 overflow-hidden bg-[#f5f5f5]">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 224px, 280px"
        />
      </div>

      <div className="space-y-1">
        <p className="font-sans text-[10px] tracking-wide text-[#8a8a8a]">
          {brand}
        </p>
        <h4 className="font-serif text-[13px] leading-tight text-[#1a1a1a]">
          {name}
        </h4>
        <div className="flex items-center gap-2 pt-1">
          <span className="font-sans text-[13px] font-medium text-[#1a1a1a]">
            ${price}
          </span>
          <span className="font-sans text-[11px] text-[#8a8a8a] line-through">
            ${originalPrice}
          </span>
        </div>
        <p className="font-sans text-[10px] text-[#8a8a8a]">Size M</p>
      </div>

      <div className="mt-4 border-t border-[#e5e5e5] pt-3">
        <button className="w-full font-sans text-[10px] tracking-[1.5px] text-[#1a1a1a] uppercase transition-colors hover:text-[#A67B5B]">
          Buy Now
        </button>
      </div>
    </motion.div>
  );
};

export default FloatingCard;
