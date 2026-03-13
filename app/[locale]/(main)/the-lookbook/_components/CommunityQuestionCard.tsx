"use client";

import { motion } from "framer-motion";
import { Share2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

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
      <Card className="overflow-hidden bg-white ring-0! rounded-none h-full flex flex-col shadow-md" >
        {/* Product Header Section */}
        <div className="p-5 flex gap-4">
          {/* Product Image */}
          <div className="relative aspect-square w-30 h-32 flex-shrink-0 bg-[#f5f5f5]">
            <Image
              src={productImage}
              alt={productName}
              fill
              className="object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="flex-1 flex flex-col">
            <div className="flex items-start justify-between mb-1">
              <p className="font-darker text-[12px] text-[#8a8a8a]">
                {brandName}
              </p>
              <button className="text-[#8A8A82] hover:text-[#1a1a1a] transition-colors cursor-pointer">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
            
            <h3 className="font-cormorant text-[20px] text-[#1a1a1a] font-normal leading-tight mb-3">
              {productName}
            </h3>

            {/* Size Tag */}
            <div className="flex items-center gap-2">
              <span className="font-darker text-[14px] text-[#C9A96E] bg-[#FAF7F1] px-3 py-1.5">
                Looking for Size {lookingForSize}
              </span>
              <span className="font-darker text-[14px] text-[#8a8a8a]">
                {responseCount} Responses
              </span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#e5e5e5] mx-5" />

        {/* Question Section */}
        <div className="p-5">
          {/* Question User */}
          <div className="flex items-center gap-3 mb-3">
            <Avatar className="w-8 h-8 rounded-full">
              <AvatarImage src={questionUser.avatar} alt={questionUser.name} />
              <AvatarFallback className="bg-[#f5f5f5] text-[#1a1a1a] text-xs">
                {questionUser.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex items-center gap-2">
              <span className="font-darker text-[13.6px] font-medium text-[#1a1a1a]">
                {questionUser.name}<span className="text-[#8a8a8a] font-bold">{' ' + '·'}</span>
              </span>
              <span className="font-darker text-[14px] text-[#8a8a8a]">
                {questionUser.height}<span className="text-[#8a8a8a] font-bold">{' ' + '·'}</span>
              </span>
              <span className="font-darker text-[14px] text-[#8a8a8a]">
                {questionUser.date}
              </span>
            </div>
          </div>

          {/* Question Text */}
          <p className="font-darker text-[14px] text-[#1a1a1a] leading-relaxed">
            {question}
          </p>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#e5e5e5] mx-5" />

        {/* Community Responses Section */}
        <div className="px-5 flex-1">
          <h4 className="font-cormorant text-[10.4px] font-medium text-[#8A8A82] uppercase tracking-[1.56px] leading-[15.6px] mb-4">
            Community Responses
          </h4>

          <div className="space-y-4">
            {responses.map((response) => (
              <div key={response.id} className="flex gap-3 relative pl-4 items-center">
                {/* Vertical Bar */}
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#C9A96E]/30" />    
                <Avatar className="w-8 h-8 rounded-full flex-shrink-0">
                  <AvatarImage src={response.userAvatar} alt={response.userName} />
                  <AvatarFallback className="bg-[#f5f5f5] text-[#1a1a1a] text-xs">
                    {response.userName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
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
                  <p className="font-darker text-[13px] text-[#5a5a5a] leading-relaxed">
                    {response.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-5 pt-0 mt-auto">
          <div className="grid grid-cols-2 gap-3">
            <Button
              className="bg-primary cursor-pointer hover:bg-[#8f6a4e] text-white text-[14px] font-normal uppercase tracking-wider px-4 py-3 h-auto rounded-none transition-colors"
            >
              Login To Respond
            </Button>
            <Button
              variant="outline"
              className="bg-transparent cursor-pointer border border-[#e5e5e5] text-[#1a1a1a] hover:bg-[#f5f5f5] text-[14px] font-normal uppercase tracking-wider px-4 py-3 h-auto rounded-none transition-colors"
            >
              View Product
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}