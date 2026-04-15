"use client";

import { motion } from "framer-motion";
import { Search, ThumbsUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

interface Response {
  id: string;
  userName: string;
  userAvatar: string;
  height: string;
  bust: string;
  waist: string;
  hips: string;
  answer: string;
  likes: number;
}

interface CommunityQuestionCardProps {
  productImage: string;
  brandName: string;
  productName: string;
  size: string;
  questionUser: {
    name: string;
    handle: string;
    avatar: string;
    height: string;
    bust: string;
    waist: string;
    hips: string;
  };
  question: string;
  responses: Response[];
  index?: number;
}

export function CommunityQuestionCard({
  productImage,
  brandName,
  productName,
  size,
  questionUser,
  question,
  responses,
  index = 0,
}: CommunityQuestionCardProps) {
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
          <div className="flex items-start justify-between px-8 pt-6 pb-4">
            {/* User Profile - Left */}
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 rounded-full border-2 border-[#f8e8e8]">
                <AvatarImage
                  src={questionUser.avatar}
                  alt={questionUser.name}
                />
                <AvatarFallback className="font-cormorant bg-[#fdf2f2] text-xl text-[#1a1a1a]">
                  {questionUser.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <h3 className="font-cormorant text-[22px] font-medium tracking-wide text-[#1a1a1a]">
                  {questionUser.name}
                </h3>
                <p className="font-darker mt-0.5 text-[13px] text-[#8a8a8a]">
                  {questionUser.handle}
                </p>
              </div>
            </div>

            {/* Measurements - Right */}
            <div className="text-right">
              <p className="font-darker text-[14px] font-normal tracking-wide text-[#1a1a1a]">
                H: {questionUser.height} / B:{questionUser.bust}&quot; / W:{" "}
                {questionUser.waist}&quot; / H: {questionUser.hips}&quot;
              </p>
            </div>
          </div>

          {/* Main Content: Product Details & Image */}
          <div className="grid grid-cols-2 gap-6 px-8 pb-5">
            {/* Left: Product Info */}
            <div className="flex flex-col">
              {/* Brand Name */}
              <h2 className="font-cormorant mb-1 text-[30px] leading-tight font-normal tracking-[0.02em] text-[#1a1a1a] uppercase">
                {brandName}
              </h2>

              {/* Product Name & Size */}
              <div className="mb-4 flex items-center gap-3">
                <h3 className="font-cormorant text-[18px] font-normal text-[#1a1a1a]">
                  {productName}
                </h3>
                <div className="inline-flex items-center gap-1.5 border border-[#c5c5c5] px-3 py-1.5 text-[#1a1a1a]">
                  <Search className="h-3.5 w-3.5 text-[#666]" />
                  <span className="font-darker text-[13px]">Size {size}</span>
                </div>
              </div>

              {/* Question Text */}
              <p className="font-darker text-[15px] leading-relaxed text-[#1a1a1a]">
                {question}
              </p>
            </div>

            {/* Right: Product Image */}
            <div className="relative ml-auto h-[271px] w-[240px] overflow-hidden bg-[#f5f5f5]">
              <motion.div
                variants={{
                  rest: { scale: 1, filter: "brightness(1)" },
                  hover: { scale: 1.02, filter: "brightness(1.02)" },
                }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={productImage}
                  alt={productName}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </motion.div>
            </div>
          </div>

          {/* Community Responses Section */}
          <div className="flex-1 px-8 pb-4">
            {/* Responses Header */}
            <div className="mb-3 flex items-center justify-between">
              <h4 className="font-darker text-[11px] font-medium tracking-[0.15em] text-[#8a8a8a] uppercase">
                Community Responses
              </h4>
              <span className="font-darker text-[13px] text-[#8a8a8a]">
                {responses.length} Responses
              </span>
            </div>

            {/* Responses List */}
            <div className="space-y-3.5">
              {responses.map((response) => (
                <div
                  key={response.id}
                  className="relative flex items-start gap-3 pl-4"
                >
                  {/* Vertical Bar */}
                  <div className="absolute top-0 bottom-0 left-0 w-px bg-[#d0d0d0]" />

                  <Avatar className="h-9 w-9 shrink-0 rounded-full">
                    <AvatarImage
                      src={response.userAvatar}
                      alt={response.userName}
                    />
                    <AvatarFallback className="bg-[#f5f5f5] text-xs text-[#1a1a1a]">
                      {response.userName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="min-w-0 flex-1 pt-0.5">
                    <div className="mb-1 flex items-center gap-2">
                      <span className="font-darker text-[14px] font-medium text-[#1a1a1a]">
                        {response.userName}
                      </span>
                      <span className="font-darker text-[13px] text-[#8a8a8a]">
                        {response.height}&quot;/{response.bust}&quot;/
                        {response.waist}&quot;/{response.hips}&quot;
                      </span>
                    </div>
                    <p className="font-darker text-[14px] leading-relaxed text-[#4a4a4a]">
                      {response.answer}
                    </p>
                  </div>

                  {/* Likes */}
                  <div className="flex shrink-0 items-center gap-1.5 pt-0.5 text-[#8a8a8a]">
                    <ThumbsUp className="h-4 w-4" strokeWidth={1.5} />
                    <span className="font-darker text-[13px]">
                      {response.likes}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="mt-auto flex items-center justify-end gap-8 border-t border-[#e5e5e5] px-8 py-4">
            <button className="font-darker text-[14px] text-[#1a1a1a] underline decoration-[#999] underline-offset-4 transition-all hover:decoration-[#1a1a1a]">
              Respond
            </button>
            <button className="font-darker text-[14px] text-[#1a1a1a] underline decoration-[#999] underline-offset-4 transition-all hover:decoration-[#1a1a1a]">
              View Product
            </button>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
