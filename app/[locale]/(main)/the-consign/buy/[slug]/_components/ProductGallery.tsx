"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface ProductGalleryProps {
  mainImage: string;
  thumbnails: string[];
  productName: string;
}

export default function ProductGallery({
  mainImage,
  thumbnails,
  productName,
}: ProductGalleryProps) {
  const [activeImage, setActiveImage] = useState(mainImage);

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square w-full overflow-hidden bg-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeImage}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeOut" as any }}
            className="absolute inset-0 h-full w-full"
          >
            <Image
              src={activeImage}
              alt={productName}
              fill
              className="object-cover hover:scale-115 transition-transform duration-500 ease-out"
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-3">
        {thumbnails.map((thumb, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 0.98 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "relative aspect-square overflow-hidden bg-white cursor-pointer transition-all",
              activeImage === thumb ? "ring-1 ring-primary ring-offset-2" : "border border-[#E7E4DF]"
            )}
            onClick={() => setActiveImage(thumb)}
          >
            <Image
              src={thumb}
              alt={`${productName} thumbnail ${idx + 1}`}
              fill
              className="object-cover"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
