"use client";

import { motion } from "framer-motion";
import { Share2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

interface Response {
  id: string;
  userName: string;
  userAvatar: string;
  height: string;
  date: string;
  answer: string;
}

interface CommunityQuestionCardProps {
  productImage: string;
  brandName: string;
  productName: string;
  lookingForSize: string;
  responseCount: number;
  questionUser: {
    name: string;
    avatar: string;
    height: string;
    date: string;
  };
  question: string;
  responses: Response[];
  index?: number;
}

export function CommunityQuestionCard({
  productImage,
  brandName,
  productName,
  lookingForSize,
  responseCount,
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
        <Card className="flex h-full flex-col overflow-hidden rounded-none bg-white shadow-md ring-0!">
          {/* Product Header Section */}
          <div className="flex gap-4 p-5">
            {/* Product Image */}
            <div className="relative aspect-square h-32 w-30 shrink-0 overflow-hidden bg-[#f5f5f5]">
              <motion.div
                variants={{
                  rest: { scale: 1, y: 0, filter: "brightness(1)" },
                  hover: { scale: 1.03, y: -3, filter: "brightness(1.03)" },
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

              <motion.div
                variants={{ rest: { opacity: 0.08 }, hover: { opacity: 0.18 } }}
                transition={{ duration: 0.4 }}
                className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/15 via-transparent to-white/10"
              />
            </div>

            {/* Product Info */}
            <div className="flex flex-1 flex-col">
              <div className="mb-1 flex items-start justify-between">
                <p className="font-darker text-[12px] text-[#8a8a8a]">
                  {brandName}
                </p>
                <button className="cursor-pointer text-[#8A8A82] transition-colors hover:text-[#1a1a1a]">
                  <Share2 className="h-4 w-4" />
                </button>
              </div>

              <h3 className="font-cormorant mb-3 text-[20px] leading-tight font-normal text-[#1a1a1a]">
                {productName}
              </h3>

              {/* Size Tag */}
              <div className="flex items-center gap-2">
                <span className="font-darker bg-[#FAF7F1] px-3 py-1.5 text-[14px] text-[#C9A96E]">
                  Looking for Size {lookingForSize}
                </span>
                <span className="font-darker text-[14px] text-[#8a8a8a]">
                  {responseCount} Responses
                </span>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="mx-5 h-px bg-[#e5e5e5]" />

          {/* Question Section */}
          <div className="p-5">
            {/* Question User */}
            <div className="mb-3 flex items-center gap-3">
              <Avatar className="h-8 w-8 rounded-full">
                <AvatarImage
                  src={questionUser.avatar}
                  alt={questionUser.name}
                />
                <AvatarFallback className="bg-[#f5f5f5] text-xs text-[#1a1a1a]">
                  {questionUser.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex items-center gap-2">
                <span className="font-darker text-[13.6px] font-medium text-[#1a1a1a]">
                  {questionUser.name}
                  <span className="font-bold text-[#8a8a8a]">{" " + "·"}</span>
                </span>
                <span className="font-darker text-[14px] text-[#8a8a8a]">
                  {questionUser.height}
                  <span className="font-bold text-[#8a8a8a]">{" " + "·"}</span>
                </span>
                <span className="font-darker text-[14px] text-[#8a8a8a]">
                  {questionUser.date}
                </span>
              </div>
            </div>

            {/* Question Text */}
            <p className="font-darker text-[14px] leading-relaxed text-[#1a1a1a]">
              {question}
            </p>
          </div>

          {/* Divider */}
          <div className="mx-5 h-px bg-[#e5e5e5]" />

          {/* Community Responses Section */}
          <div className="flex-1 px-5">
            <h4 className="font-cormorant mb-4 text-[10.4px] leading-[15.6px] font-medium tracking-[1.56px] text-[#8A8A82] uppercase">
              Community Responses
            </h4>

            <div className="space-y-4">
              {responses.map((response) => (
                <div
                  key={response.id}
                  className="relative flex items-center gap-3 pl-4"
                >
                  {/* Vertical Bar */}
                  <div className="absolute top-0 bottom-0 left-0 w-0.5 bg-[#C9A96E]/30" />
                  <Avatar className="h-8 w-8 shrink-0 rounded-full">
                    <AvatarImage
                      src={response.userAvatar}
                      alt={response.userName}
                    />
                    <AvatarFallback className="bg-[#f5f5f5] text-xs text-[#1a1a1a]">
                      {response.userName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <span className="font-darker text-[12px] font-medium text-[#1a1a1a]">
                        {response.userName}
                      </span>
                      <span className="font-darker text-[14px] text-[#8a8a8a]">
                        {response.height}
                      </span>
                      <span className="font-darker text-[14px] text-[#8a8a8a]">
                        {response.date}
                      </span>
                    </div>
                    <p className="font-darker text-[13px] leading-relaxed text-[#5a5a5a]">
                      {response.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="mt-auto p-5 pt-0">
            <div className="grid grid-cols-2 gap-3">
              <Button className="bg-primary h-auto cursor-pointer rounded-none px-4 py-3 text-[14px] font-normal tracking-wider text-white uppercase transition-colors hover:bg-[#8f6a4e]">
                Login To Respond
              </Button>
              <Button
                variant="outline"
                className="h-auto cursor-pointer rounded-none border border-[#e5e5e5] bg-transparent px-4 py-3 text-[14px] font-normal tracking-wider text-[#1a1a1a] uppercase transition-colors hover:bg-[#f5f5f5]"
              >
                View Product
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
