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
      {/* Container that triggers the hover state */}
      <motion.div
        initial="rest"
        whileHover="hover"
        animate="rest"
        className="group h-full"
      >
        <Card className="h-full gap-0 rounded-none border-none bg-white p-0 ring-0 transition-shadow duration-500 hover:shadow-2xl">
          <div className="relative aspect-5/4 overflow-hidden bg-[#F7F6F4]">
            <motion.div
              variants={{
                rest: { scale: 1.15, filter: "blur(8px)" },
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
                placeholder="blur"
                blurDataURL={imageUrl}
              />
            </motion.div>

            <div className="pointer-events-none absolute inset-0 z-20 flex">
              <motion.div
                variants={{
                  rest: { x: 0 },
                  hover: { x: "-100%" },
                }}
                transition={{ duration: 0.6, ease: [0.45, 0, 0.55, 1] }}
                className="flex h-full w-1/2 items-center justify-end border-r border-white/5 bg-[#1A1A1A]/10 opacity-1"
              >
                <span className="translate-x-3 rotate-90 text-[9px] font-light tracking-[0.4em] text-white/20 uppercase">
                  Reveal
                </span>
              </motion.div>

              {/* Right Curtain */}
              <motion.div
                variants={{
                  rest: { x: 0 },
                  hover: { x: "100%" },
                }}
                transition={{ duration: 0.6, ease: [0.45, 0, 0.55, 1] }}
                className="flex h-full w-1/2 items-center justify-start border-l border-white/5 bg-[#1A1A1A]/10 opacity-1"
              >
                <span className="-translate-x-3 -rotate-90 text-[9px] font-light tracking-[0.4em] text-white/20 uppercase">
                  Archive
                </span>
              </motion.div>
            </div>

            {/* Subtle Gradient Shadow that appears on reveal */}
            <div className="absolute inset-0 z-10 bg-linear-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
          </div>

          {/* --- CONTENT SECTION (Kept original logic/colors) --- */}
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
