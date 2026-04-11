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
        <div className="p-8">
          {/* Header: Name/Username Left, Measurements Right */}
          <div className="mb-8 flex items-start justify-between">
            <div>
              <h3 className="font-cormorant text-[22px] font-medium tracking-wide text-[#1A1A1A]">
                {name}
              </h3>
              <p className="font-darker mt-1 text-[13px] text-[#8A8A82]">
                {username}
              </p>
            </div>
            <p className="font-darker text-[14px] tracking-wide text-[#1A1A1A]">
              H: {stats.height} / B:{stats.bust} / W: {stats.waist} / H:{" "}
              {stats.hips}
            </p>
          </div>

          {/* Main Content: Large Centered Image with Side Actions */}
          <div className="mb-8 flex items-start justify-center gap-8">
            {/* Large Profile Image */}
            <div className="relative aspect-square w-[280px] overflow-hidden bg-[#f5f5f5]">
              <Image src={avatarUrl} alt={name} fill className="object-cover" />
            </div>

            {/* Right Side Actions */}
            <div className="flex flex-col gap-4 pt-4">
              <button className="font-darker text-[14px] text-[#1A1A1A] underline decoration-[#999] underline-offset-4 transition-all hover:decoration-[#1A1A1A]">
                Follow+
              </button>
              <button className="font-darker text-[14px] text-[#1A1A1A] underline decoration-[#999] underline-offset-4 transition-all hover:decoration-[#1A1A1A]">
                View Profile
              </button>
            </div>
          </div>

          {/* Stats Row: Reviews, Inquiries, Capsule Brands */}
          <div className="grid grid-cols-3 gap-8 border-t border-[#F0EFEA] pt-6">
            <div className="text-center">
              <p className="font-darker mb-2 text-[11px] tracking-[0.2em] text-[#1A1A1A] uppercase">
                Reviews
              </p>
              <p className="font-darker text-[16px] font-medium text-[#8A8A82]">
                {counts.reviews}
              </p>
            </div>
            <div className="text-center">
              <p className="font-darker mb-2 text-[11px] tracking-[0.2em] text-[#1A1A1A] uppercase">
                Inquiries
              </p>
              <p className="font-darker text-[16px] font-medium text-[#8A8A82]">
                {counts.inquiries}
              </p>
            </div>
            <div className="text-center">
              <p className="font-darker mb-2 text-[11px] tracking-[0.2em] text-[#1A1A1A] uppercase">
                Capsule Brands
              </p>
              <p className="font-darker text-[16px] font-medium text-[#8A8A82]">
                {counts.capsuleBrands}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
