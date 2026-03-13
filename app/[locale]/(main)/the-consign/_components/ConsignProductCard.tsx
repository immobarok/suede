"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Card } from "@/components/ui/card";

type ConsignProductCardProps = {
  imageUrl: string;
  brandName: string;
  productName: string;
  price: string;
  originalPrice?: string;
  sizeLabel: string;
  index?: number;
};

const ConsignProductCard = ({
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
        animate="rest"
        whileHover="hover"
        className="h-full"
        variants={{
          rest: {
            y: 0,
            boxShadow: "0 2px 8px rgba(17, 24, 39, 0.04)",
          },
          hover: {
            y: -6,
            boxShadow: "0 16px 36px rgba(17, 24, 39, 0.14)",
          },
        }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <Card className="h-full gap-0 rounded-none bg-white p-0 ring-0">
          <div className="relative aspect-5/4 overflow-hidden bg-[#F7F6F4]">
            <motion.div
              variants={{
                rest: { scale: 1, y: 0, filter: "brightness(1)" },
                hover: { scale: 1.03, y: -4, filter: "brightness(1.03)" },
              }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
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

            <motion.div
              variants={{ rest: { opacity: 0.08 }, hover: { opacity: 0.18 } }}
              transition={{ duration: 0.4 }}
              className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/15 via-transparent to-white/10"
            />
          </div>

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
              <button
                type="button"
                className="bg-primary font-darker hover:bg-primary/90 h-11 w-full cursor-pointer text-base tracking-[0.06em] text-white transition-colors"
              >
                BUY NOW
              </button>
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
