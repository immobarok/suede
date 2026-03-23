"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";

type ConsignProductCardProps = {
  slug: string;
  imageUrl: string;
  brandName: string;
  productName: string;
  price: string;
  originalPrice?: string;
  sizeLabel: string;
  index?: number;
};

const ConsignProductCard = ({
  slug,
  imageUrl,
  brandName,
  productName,
  price,
  originalPrice,
  sizeLabel,
  index = 0,
}: ConsignProductCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.8,
        delay: index * 0.12,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="h-full"
    >
      <motion.div
        initial="rest"
        whileHover="hover"
        animate="rest"
        className="group h-full"
      >
        <Card className="h-full gap-0 overflow-hidden rounded-none border-none bg-white p-0 ring-0 transition-shadow duration-500 hover:shadow-2xl">
          {/* --- IMAGE SECTION WITH FROSTED GLASS REVEAL --- */}
          <div className="relative aspect-5/4 overflow-hidden bg-[#F7F6F4]">
            {/* The Image (starts slightly blurred and zoomed) */}
            <motion.div
              variants={{
                rest: { scale: 1.1, filter: "blur(2px)" },
                hover: { scale: 1, filter: "blur(0px)" },
              }}
              transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={imageUrl}
                alt={productName}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </motion.div>

            {/* THE TRANSPARENT GLASS CURTAINS (PORDA) */}
            <div className="pointer-events-none absolute inset-0 z-20 flex">
              {/* Left Transparent Panel */}
              <motion.div
                variants={{
                  rest: { x: 0 },
                  hover: { x: "-100%" },
                }}
                transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
                className="relative h-full w-1/2 border-r border-white/20 bg-white/10"
              >
                <span className="absolute top-1/2 right-4 -translate-y-1/2 rotate-90 text-[10px] font-bold tracking-[0.5em] text-white/40 uppercase">
                  Suede
                </span>
              </motion.div>

              {/* Right Transparent Panel */}
              <motion.div
                variants={{
                  rest: { x: 0 },
                  hover: { x: "100%" },
                }}
                transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
                className="relative h-full w-1/2 border-l border-white/20 bg-white/10"
              >
                <span className="absolute top-1/2 left-4 -translate-y-1/2 -rotate-90 text-[10px] font-bold tracking-[0.5em] text-white/40 uppercase">
                  Archive
                </span>
              </motion.div>
            </div>

            {/* Subtle light glint that passes over the glass on hover */}
            <motion.div
              variants={{
                rest: { x: "-150%", opacity: 0 },
                hover: { x: "150%", opacity: 1 },
              }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="pointer-events-none absolute inset-0 z-30 skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            />
          </div>

          {/* --- CONTENT SECTION (Original Styles) --- */}
          <div className="space-y-2 p-4">
            <p className="font-darker text-[14px] text-[#8A8A82]">
              {brandName}
            </p>
            <h3 className="font-darker text-lg text-[#2B2B2A]">
              {productName}
            </h3>

            <div className="flex items-center gap-2">
              <span className="font-darker text-2xl text-[#1A1A1A]">
                {price}
              </span>
              {originalPrice && (
                <span className="font-darker text-[16px] text-[#8A8A82] line-through">
                  {originalPrice}
                </span>
              )}
            </div>

            <p className="font-darker text-[14.52px] text-[#8A8A82]">
              {sizeLabel}
            </p>

            <div className="space-y-2 pt-2">
              <Link
                href={`/the-consign/buy/${slug}`}
                className="bg-primary font-darker flex h-11 w-full items-center justify-center text-base tracking-[0.06em] text-white transition-colors hover:bg-[#3d0b13]"
              >
                BUY NOW
              </Link>
              <button
                type="button"
                className="font-darker h-11 w-full cursor-pointer border border-[#E7E4DF] bg-transparent text-base tracking-[0.06em] text-[#4F4F4D] transition-colors hover:bg-[#F7F6F4]"
              >
                LEAVE AN OFFER
              </button>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default ConsignProductCard;
