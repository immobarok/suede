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
      <Card className="overflow-hidden rounded-none border-none bg-white shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
        <div className="p-6">
          {/* Header: Avatar and Name */}
          <div className="mb-6 flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-full">
              <Image src={avatarUrl} alt={name} fill className="object-cover" />
            </div>
            <div>
              <h3 className="font-darker text-[15px] leading-none font-medium text-[#1A1A1A]">
                {name}{" "}
                <span className="ml-1 font-normal text-[#8A8A82] italic">
                  {stats.height}/{stats.bust}/{stats.waist}/{stats.hips}
                </span>
              </h3>
              <p className="font-darker text-[13px] text-[#8A8A82] lowercase">
                {username}
              </p>
            </div>
          </div>

          {/* Stats Row */}
          <div className="mb-6 grid grid-cols-3 gap-4 border-b border-[#F0EFEA] pb-6">
            <div className="text-center">
              <p className="font-darker mb-1 text-[10px] tracking-[0.15em] text-[#8A8A82] uppercase">
                Reviews
              </p>
              <p className="font-darker text-[16px] font-medium text-[#1A1A1A]">
                {counts.reviews}
              </p>
            </div>
            <div className="text-center">
              <p className="font-darker mb-1 text-[10px] tracking-[0.15em] text-[#8A8A82] uppercase">
                Inquiries
              </p>
              <p className="font-darker text-[16px] font-medium text-[#1A1A1A]">
                {counts.inquiries}
              </p>
            </div>
            <div className="text-center">
              <p className="font-darker mb-1 text-[10px] tracking-[0.15em] text-[#8A8A82] uppercase">
                Capsule Brands
              </p>
              <p className="font-darker text-[16px] font-medium text-[#1A1A1A]">
                {counts.capsuleBrands}
              </p>
            </div>
          </div>

          {/* Measurement Row */}
          <div className="mb-8 grid grid-cols-4 gap-2">
            <div className="text-center">
              <p className="font-darker mb-1 text-[10px] tracking-[0.1em] text-[#8A8A82] uppercase">
                Height
              </p>
              <p className="font-darker text-[14px] font-medium text-[#1A1A1A]">
                {stats.height}
              </p>
            </div>
            <div className="text-center">
              <p className="font-darker mb-1 text-[10px] tracking-[0.1em] text-[#8A8A82] uppercase">
                Bust
              </p>
              <p className="font-darker text-[14px] font-medium text-[#1A1A1A]">
                {stats.bust}
              </p>
            </div>
            <div className="text-center">
              <p className="font-darker mb-1 text-[10px] tracking-[0.1em] text-[#8A8A82] uppercase">
                Waist
              </p>
              <p className="font-darker text-[14px] font-medium text-[#1A1A1A]">
                {stats.waist}
              </p>
            </div>
            <div className="text-center">
              <p className="font-darker mb-1 text-[10px] tracking-[0.1em] text-[#8A8A82] uppercase">
                Hips
              </p>
              <p className="font-darker text-[14px] font-medium text-[#1A1A1A]">
                {stats.hips}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button className="bg-primary font-darker w-full cursor-pointer rounded-none py-3 text-[14px] font-medium text-white transition-opacity hover:bg-[#3d0b13] ">
              Follow
            </button>
            <button className="font-darker w-full cursor-pointer rounded-none border border-[#E7E4DF] py-3 text-[14px] font-medium text-[#1A1A1A] transition-colors hover:bg-[#F9F8F6]">
              View Profile
            </button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
