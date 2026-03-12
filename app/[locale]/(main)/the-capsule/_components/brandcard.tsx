"use client";

import { motion } from "framer-motion";
import { Star, ExternalLink, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";

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
  category,
  location,
  description,
  rating,
  ethics,
  reviews,
  followers,
  image,
  index = 0,
}: BrandCardProps) {
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
      <Card className="group relative overflow-hidden bg-[#0a0a0a] border-0 rounded-none h-[500px]">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-black/10" />
        </div>

        {/* Subtle Follow Button - Top Right */}
        <div className="absolute top-4 right-4 z-10">
          <Button
            variant="ghost"
            size="sm"
            className="bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10 hover:border-white/20 backdrop-blur-sm text-[11px] tracking-wider uppercase font-normal px-3 py-1 h-auto transition-all duration-300 opacity-60 hover:opacity-100"
          >
            Follow
            <Plus className="w-3 h-3 ml-1.5" />
          </Button>
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
          {/* Brand Name & Category */}
          <div className="mb-3">
            <h3 className="font-cormorant text-2xl md:text-4xl text-white font-normal mb-1">
              {name}
            </h3>
            <p className="font-darker text-[12px] text-[#C9A96E] uppercase tracking-[1.5px]">
              {category} · {location}
            </p>
          </div>

          {/* Description */}
          <p className="font-darker text-[14px] text-white/60 leading-relaxed mb-6 line-clamp-2">
            {description}
          </p>

          {/* Divider */}
          <div className="h-px bg-white/10 mb-4" />

          {/* Stats Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Rating */}
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-[#C9A96E] text-[#C9A96E]" />
                <span className="font-darker text-[12px] text-white/80">
                  {rating}
                </span>
              </div>

              {/* Ethics */}
              <div className="flex items-center gap-1">
                <span className="font-darker text-[12px] text-white/40">
                  ethics
                </span>
                <span className="font-darker text-[12px] text-white/80">
                  {ethics}
                </span>
              </div>

              {/* Reviews */}
              <div className="flex items-center gap-1">
                <span className="font-darker text-[12px] text-white/40">
                  {reviews} reviews
                </span>
              </div>

              {/* Followers */}
              <div className="flex items-center gap-1">
                <span className="font-darker text-[12px] text-white/40">
                  {followers} followers
                </span>
              </div>
            </div>

            {/* External Link */}
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8 text-white/40 hover:text-white hover:bg-white/5 rounded-none"
            >
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}