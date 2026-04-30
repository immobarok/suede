"use client";

import { motion } from "framer-motion";
import {
  Star,
  ThumbsUp,
  MessageCircle,
  Image as ImageIcon,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

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
  hideUserStats?: boolean;
}


export function LookBookCard({
  productImage,
  imageCount,
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
  hideUserStats = false,
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
        <Card className="flex h-full flex-col overflow-hidden rounded-none bg-[#FFFDF9] shadow-md ring-0">
          {/* Header: User Info & Measurements */}
          <div className="flex items-start justify-between px-8 pt-8 pb-6">
            {!hideUserStats && (
              <>
                {/* User Profile - Left */}
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16 rounded-full border-2 border-[#f8e8e8]">
                    <AvatarImage src={userAvatar} alt={userName} />
                    <AvatarFallback className="font-cormorant bg-[#fdf2f2] text-xl text-[#1a1a1a]">
                      {userName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <h3 className="font-cormorant text-xl font-medium tracking-wide text-[#1a1a1a]">
                      {userName}
                    </h3>
                    <p className="font-darker mt-0.5 text-sm text-[#8a8a8a]">
                      {userHandle}
                    </p>
                  </div>
                </div>

                {/* Measurements - Right */}
                <div className="text-right">
                  <p className="font-darker text-sm font-normal tracking-wide text-[#1a1a1a]">
                    H: {height} / B:{weight} / W: {waist} / H: {hips}
                  </p>
                </div>
              </>
            )}


          </div>

          {/* Main Content: Product Details & Image */}
          <div className="grid grid-cols-2 gap-8 px-8 pb-6">
            {/* Left: Product Info */}
            <div className="flex flex-col justify-center gap-6">
              <div>
                {/* Product Name & Size */}
                <div className="flex items-baseline justify-between">
                  <h2 className="font-cormorant text-[20px] font-normal text-black">
                    {productName}
                  </h2>
                  <span className="font-darker text-[20px] font-normal text-black">
                    Size: {size}
                  </span>
                </div>

                {/* Review Text */}
                <p className="font-darker mt-4 text-[15px] leading-relaxed text-black/70">
                  {reviewText.split(" ").length > 15
                    ? reviewText.split(" ").slice(0, 15).join(" ") + "..."
                    : reviewText}
                </p>
              </div>

              {/* See Full Review Link */}
              <div className="flex justify-end">
                <button className="font-darker cursor-pointer text-sm text-black/70 underline decoration-[#8a8a8a] underline-offset-4 transition-all hover:decoration-[#1a1a1a]">
                  See Full Review
                </button>
              </div>
            </div>

            {/* Right: Product Image */}
            <div className="relative aspect-4/5 overflow-hidden bg-[#f5f5f5]">
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
                  className="object-cover"
                />
              </motion.div>

              {/* Image Count Badge */}
              <div className="absolute right-4 bottom-4 flex items-center gap-1.5 bg-white/90 px-3 py-1.5 shadow-sm backdrop-blur-sm">
                <ImageIcon
                  className="h-4 w-4 text-[#1a1a1a]"
                  strokeWidth={1.5}
                />
                <span className="font-darker text-sm font-medium text-[#1a1a1a]">
                  +{imageCount}
                </span>
              </div>
            </div>
          </div>

          {/* Footer: Engagement, Brand, Rating */}
          <div className="relative mt-auto flex items-center justify-between border-t border-[#e5e5e5] px-8 py-6">
            {/* Left: Engagement Stats */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-[#8a8a8a]">
                <ThumbsUp className="h-5 w-5" strokeWidth={1.5} />
                <span className="font-darker text-sm font-medium text-[#1a1a1a]">
                  {likes}
                </span>
              </div>
              <div className="flex items-center gap-2 text-[#8a8a8a]">
                <MessageCircle className="h-5 w-5" strokeWidth={1.5} />
                <span className="font-darker text-sm font-medium text-[#1a1a1a]">
                  {comments}
                </span>
              </div>
            </div>

            {/* Center: Brand Name */}
            <div className="absolute left-1/2 -translate-x-1/2 transform">
              <h4 className="font-cormorant text-2xl font-semibold tracking-[0.25em] text-[#1a1a1a] uppercase">
                {brandName}
              </h4>
            </div>

            {/* Right: Rating */}
            <div className="flex items-center gap-2">
              <Star
                className="h-5 w-5 fill-[#1a1a1a] text-[#1a1a1a]"
                strokeWidth={0}
              />
              <span className="font-darker text-lg font-medium text-[#1a1a1a]">
                {rating}
              </span>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
