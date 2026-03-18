"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

interface CollectiveCardProps {
  name: string;
  username: string;
  avatarUrl: string;
  stats: {
    height: string;
    bust: string;
    waist: string;
    hips: string;
  };
  counts: {
    reviews: number;
    inquiries: number;
    capsuleBrands: number;
  };
  index?: number;
}

export const CollectiveCard = ({
  name,
  username,
  avatarUrl,
  stats,
  counts,
  index = 0,
}: CollectiveCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="overflow-hidden border-none bg-white rounded-none shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
        <div className="p-6">
          {/* Header: Avatar and Name */}
          <div className="flex items-center gap-3 mb-6">
            <div className="relative h-10 w-10 overflow-hidden rounded-full">
              <Image
                src={avatarUrl}
                alt={name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="font-darker text-[15px] font-medium leading-none text-[#1A1A1A]">
                {name}{" "}
                <span className="font-normal text-[#8A8A82] ml-1 italic">
                  {stats.height}/{stats.bust}/{stats.waist}/{stats.hips}
                </span>
              </h3>
              <p className="font-darker text-[13px] text-[#8A8A82] lowercase">
                {username}
              </p>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-4 mb-6 border-b border-[#F0EFEA] pb-6">
            <div className="text-center">
              <p className="font-darker text-[10px] uppercase tracking-[0.15em] text-[#8A8A82] mb-1">
                Reviews
              </p>
              <p className="font-darker text-[16px] font-medium text-[#1A1A1A]">
                {counts.reviews}
              </p>
            </div>
            <div className="text-center">
              <p className="font-darker text-[10px] uppercase tracking-[0.15em] text-[#8A8A82] mb-1">
                Inquiries
              </p>
              <p className="font-darker text-[16px] font-medium text-[#1A1A1A]">
                {counts.inquiries}
              </p>
            </div>
            <div className="text-center">
              <p className="font-darker text-[10px] uppercase tracking-[0.15em] text-[#8A8A82] mb-1">
                Capsule Brands
              </p>
              <p className="font-darker text-[16px] font-medium text-[#1A1A1A]">
                {counts.capsuleBrands}
              </p>
            </div>
          </div>

          {/* Measurement Row */}
          <div className="grid grid-cols-4 gap-2 mb-8">
            <div className="text-center">
              <p className="font-darker text-[10px] uppercase tracking-[0.1em] text-[#8A8A82] mb-1">
                Height
              </p>
              <p className="font-darker text-[14px] font-medium text-[#1A1A1A]">
                {stats.height}
              </p>
            </div>
            <div className="text-center">
              <p className="font-darker text-[10px] uppercase tracking-[0.1em] text-[#8A8A82] mb-1">
                Bust
              </p>
              <p className="font-darker text-[14px] font-medium text-[#1A1A1A]">
                {stats.bust}
              </p>
            </div>
            <div className="text-center">
              <p className="font-darker text-[10px] uppercase tracking-[0.1em] text-[#8A8A82] mb-1">
                Waist
              </p>
              <p className="font-darker text-[14px] font-medium text-[#1A1A1A]">
                {stats.waist}
              </p>
            </div>
            <div className="text-center">
              <p className="font-darker text-[10px] uppercase tracking-[0.1em] text-[#8A8A82] mb-1">
                Hips
              </p>
              <p className="font-darker text-[14px] font-medium text-[#1A1A1A]">
                {stats.hips}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button className="w-full bg-[#4F0E19] text-white font-darker text-[14px] font-medium py-3 rounded-none transition-opacity hover:opacity-90">
              Follow
            </button>
            <button className="w-full border border-[#E7E4DF] text-[#1A1A1A] font-darker text-[14px] font-medium py-3 rounded-none transition-colors hover:bg-[#F9F8F6]">
              View Profile
            </button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
