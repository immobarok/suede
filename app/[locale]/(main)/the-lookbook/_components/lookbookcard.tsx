"use client";

import { motion } from "framer-motion";
import { Star, ThumbsUp, MessageCircle, Camera, Video } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
      <Card className="overflow-hidden bg-white border border-[#e5e5e5] rounded-none h-full flex flex-col">
        {/* Product Image Section */}
        <div className="relative aspect-[4/3] bg-[#f5f5f5]">
          <Image
            src={productImage}
            alt={productName}
            fill
            placeholder="blur"
            blurDataURL="https://i.ibb.co.com/m5HFcy47/Frame-103-1.png"
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
          
          {/* Media Count Badges */}
          <div className="absolute top-3 right-3 flex gap-2">
            {imageCount > 0 && (
              <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 text-[11px] text-[#1a1a1a] font-medium">
                <Camera className="w-3 h-3" />
                {imageCount}
              </div>
            )}
            {videoCount > 0 && (
              <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 text-[11px] text-[#1a1a1a] font-medium">
                <Video className="w-3 h-3" />
                {videoCount}
              </div>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4 pt-0 flex flex-col flex-1">
          {/* User Info */}
          <div className="flex items-center gap-3 mb-3">
            <Avatar className="w-10 h-10 rounded-full">
              <AvatarImage src={userAvatar} alt={userName} />
              <AvatarFallback className="bg-[#f5f5f5] text-[#1a1a1a] text-sm">
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
            <p className="font-darker text-[12px] text-[#8a8a8a] uppercase tracking-wide mb-1">
              {brandName}
            </p>
            <h3 className="font-cormorant text-lg text-[#1a1a1a] font-semibold leading-tight">
              {productName}
            </h3>
          </div>

          {/* Rating & Size */}
          <div className="flex items-center gap-3 mb-2">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
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
          <p className="font-darker text-lg text-[#1a1a1a]/75 mb-2 line-clamp-2 flex-1">
            {reviewText}
          </p>

          {/* Size Measurements */}
          <div className="grid grid-cols-4 gap-2 mb-3 border-t border-b border-[#e5e5e5] py-2 bg-[#F9F9F7]">
            <div className="text-center">
              <p className="font-darker text-[9px] text-[#8a8a8a] uppercase tracking-wide mb-0.5">
                Height
              </p>
              <p className="font-darker text-[12px] text-[#1a1a1a] font-medium">
                {height}
              </p>
            </div>
            <div className="text-center">
              <p className="font-darker text-[9px] text-[#8a8a8a] uppercase tracking-wide mb-0.5">
                Weight
              </p>
              <p className="font-darker text-[12px] text-[#1a1a1a] font-medium">
                {weight}
              </p>
            </div>
            <div className="text-center">
              <p className="font-darker text-[9px] text-[#8a8a8a] uppercase tracking-wide mb-0.5">
                Waist
              </p>
              <p className="font-darker text-[12px] text-[#1a1a1a] font-medium">
                {waist}
              </p>
            </div>
            <div className="text-center">
              <p className="font-darker text-[9px] text-[#8a8a8a] uppercase tracking-wide mb-0.5">
                Hips
              </p>
              <p className="font-darker text-[12px] text-[#1a1a1a] font-medium">
                {hips}
              </p>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-1.5 text-[#8a8a8a] hover:text-[#1a1a1a] transition-colors">
                <ThumbsUp className="w-4 h-4" />
                <span className="font-darker text-[12px]">{likes}</span>
              </button>
              <button className="flex items-center gap-1.5 text-[#8a8a8a] hover:text-[#1a1a1a] transition-colors">
                <MessageCircle className="w-4 h-4" />
                <span className="font-darker text-[12px]">{comments}</span>
              </button>
            </div>

            <ButtonHoverTopSlowFlip text="View Review" />
          </div>
        </div>
      </Card>
    </motion.div>
  );
}