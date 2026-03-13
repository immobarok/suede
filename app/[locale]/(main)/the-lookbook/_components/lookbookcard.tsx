"use client";

import { motion } from "framer-motion";
import { Star, ThumbsUp, MessageCircle, Camera, Video } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import ButtonHoverTopSlowFlip from "@/components/ui/ButtonHoverTopSlowFlip";

interface ReviewCardProps {
  productImage: string;
  imageCount: number;
  videoCount: number;
  userName: string;
  userHandle: string;
  userAvatar: string;
  brandName: string;
  productName: string;
  rating: number;
  size: string;
  reviewText: string;
  height: string;
  weight: string;
  waist: string;
  hips: string;
  likes: number;
  comments: number;
  index?: number;
}

export function LookBookCard({
  productImage,
  imageCount,
  videoCount,
  userName,
  userHandle,
  userAvatar,
  brandName,
  productName,
  rating,
  size,
  reviewText,
  height,
  weight,
  waist,
  hips,
  likes,
  comments,
  index = 0,
}: ReviewCardProps) {
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
        <Card className="flex h-full flex-col overflow-hidden rounded-none border border-[#e5e5e5] bg-white">
          {/* Product Image Section */}
          <div className="relative aspect-4/3 overflow-hidden bg-[#f5f5f5]">
            <motion.div
              variants={{
                rest: { scale: 1, y: 0, filter: "brightness(1)" },
                hover: { scale: 1.03, y: -4, filter: "brightness(1.03)" },
              }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={productImage}
                alt={productName}
                fill
                placeholder="blur"
                blurDataURL="https://i.ibb.co.com/m5HFcy47/Frame-103-1.png"
                className="object-cover"
              />
            </motion.div>

            <motion.div
              variants={{ rest: { opacity: 0.08 }, hover: { opacity: 0.18 } }}
              transition={{ duration: 0.4 }}
              className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/15 via-transparent to-white/10"
            />

            {/* Media Count Badges */}
            <div className="absolute top-3 right-3 z-10 flex gap-2">
              {imageCount > 0 && (
                <div className="flex items-center gap-1 bg-white/90 px-2 py-1 text-[11px] font-medium text-[#1a1a1a] backdrop-blur-sm">
                  <Camera className="h-3 w-3" />
                  {imageCount}
                </div>
              )}
              {videoCount > 0 && (
                <div className="flex items-center gap-1 bg-white/90 px-2 py-1 text-[11px] font-medium text-[#1a1a1a] backdrop-blur-sm">
                  <Video className="h-3 w-3" />
                  {videoCount}
                </div>
              )}
            </div>
          </div>

          {/* Content Section */}
          <div className="flex flex-1 flex-col p-4 pt-0">
            {/* User Info */}
            <div className="mb-3 flex items-center gap-3">
              <Avatar className="h-10 w-10 rounded-full">
                <AvatarImage src={userAvatar} alt={userName} />
                <AvatarFallback className="bg-[#f5f5f5] text-sm text-[#1a1a1a]">
                  {userName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-darker text-sm font-medium text-[#1a1a1a]">
                  {userName}
                </p>
                <p className="font-darker text-[13.6px] text-[#8a8a8a]">
                  {userHandle}
                </p>
              </div>
            </div>

            {/* Brand & Product */}
            <div className="mb-2">
              <p className="font-darker mb-1 text-[12px] tracking-wide text-[#8a8a8a] uppercase">
                {brandName}
              </p>
              <h3 className="font-cormorant text-lg leading-tight font-semibold text-[#1a1a1a]">
                {productName}
              </h3>
            </div>

            {/* Rating & Size */}
            <div className="mb-2 flex items-center gap-3">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 ${
                      i < rating
                        ? "fill-[#C9A96E] text-[#C9A96E]"
                        : "fill-[#e5e5e5] text-[#e5e5e5]"
                    }`}
                  />
                ))}
              </div>
              <span className="font-darker text-[11px] text-[#8a8a8a]">
                Size {size}
              </span>
            </div>

            {/* Review Text */}
            <p className="font-darker mb-2 line-clamp-2 flex-1 text-lg text-[#1a1a1a]/75">
              {reviewText}
            </p>

            {/* Size Measurements */}
            <div className="mb-3 grid grid-cols-4 gap-2 border-t border-b border-[#e5e5e5] bg-[#F9F9F7] py-2">
              <div className="text-center">
                <p className="font-darker mb-0.5 text-[9px] tracking-wide text-[#8a8a8a] uppercase">
                  Height
                </p>
                <p className="font-darker text-[12px] font-medium text-[#1a1a1a]">
                  {height}
                </p>
              </div>
              <div className="text-center">
                <p className="font-darker mb-0.5 text-[9px] tracking-wide text-[#8a8a8a] uppercase">
                  Weight
                </p>
                <p className="font-darker text-[12px] font-medium text-[#1a1a1a]">
                  {weight}
                </p>
              </div>
              <div className="text-center">
                <p className="font-darker mb-0.5 text-[9px] tracking-wide text-[#8a8a8a] uppercase">
                  Waist
                </p>
                <p className="font-darker text-[12px] font-medium text-[#1a1a1a]">
                  {waist}
                </p>
              </div>
              <div className="text-center">
                <p className="font-darker mb-0.5 text-[9px] tracking-wide text-[#8a8a8a] uppercase">
                  Hips
                </p>
                <p className="font-darker text-[12px] font-medium text-[#1a1a1a]">
                  {hips}
                </p>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-1.5 text-[#8a8a8a] transition-colors hover:text-[#1a1a1a]">
                  <ThumbsUp className="h-4 w-4" />
                  <span className="font-darker text-[12px]">{likes}</span>
                </button>
                <button className="flex items-center gap-1.5 text-[#8a8a8a] transition-colors hover:text-[#1a1a1a]">
                  <MessageCircle className="h-4 w-4" />
                  <span className="font-darker text-[12px]">{comments}</span>
                </button>
              </div>

              <ButtonHoverTopSlowFlip text="View Review" />
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
