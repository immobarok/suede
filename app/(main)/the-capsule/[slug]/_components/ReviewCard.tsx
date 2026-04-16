"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ThumbsUp, MessageCircle } from "lucide-react";
import { ReviewCardProps } from "@/types";

export function ReviewCard({
  name,
  handle,
  title,
  size,
  rating,
  image,
  excerpt,
  avatar,
  height = "5'5",
  bust = "33",
  waist = "29",
  hips = "40",
  likes = 48,
  comments = 48,
  photoCount = 2,
  index = 0,
}: ReviewCardProps) {
  // console.log(UserImage)
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
      className="bg-[#FFFDF9]"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 overflow-hidden rounded-full bg-neutral-200">
            {avatar ? (
              <Image src={avatar} alt={name} fill className="object-cover" />
            ) : (
              <div className="h-full w-full bg-neutral-300" />
            )}
          </div>
          <div>
            <div className="text-[20px] font-medium text-black">{name}</div>
            <div className="text-[11px] text-black/50">{handle}</div>
          </div>
        </div>
        <div className="text-[16px] text-black">
          H: {height}/ B:{bust}/ W: {waist}/ H: {hips}&apos;
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-[1fr_1.2fr] gap-5 px-5 pb-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-[20px] text-black">{title}</span>
            <span className="text-[20px] text-black">Size: {size}</span>
          </div>

          <p className="mt-1 text-[16px] leading-[1.6] text-black/70">
            {excerpt}
          </p>

          <button className="text-accent-foreground/70 mt-auto cursor-pointer pt-4 text-end text-[16px] underline underline-offset-2 hover:text-black">
            See Full Review
          </button>
        </div>

        <div className="relative aspect-4/5 w-full overflow-hidden bg-neutral-100">
          <Image src={image} alt={title} fill className="object-cover" />
          {photoCount > 1 && (
            <div className="absolute right-2 bottom-2 flex items-center gap-1 rounded bg-white/90 px-2 py-1 text-[10px] font-medium text-black shadow-sm">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
              +{photoCount - 1}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-neutral-200 px-5 py-3">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-[11px] text-neutral-600">
            <ThumbsUp className="h-3.5 w-3.5" />
            <span>{likes}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-neutral-600">
            <MessageCircle className="h-3.5 w-3.5" />
            <span>{comments}</span>
          </div>
        </div>
        <div className="text-[14px] font-medium tracking-[0.2em] text-black">
          NADI
        </div>
        <div className="flex items-center gap-1.5 text-[12px] text-black">
          <svg
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
          <span>{rating}</span>
        </div>
      </div>
    </motion.div>
  );
}
