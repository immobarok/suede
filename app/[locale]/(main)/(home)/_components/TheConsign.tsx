"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export interface FloatingCardProps {
  image: string;
  brand: string;
  name: string;
  price: number;
  originalPrice: number;
  rotation: number;
  xOffset: number;
  yOffset: number;
  delay: number;
}

function FloatingCard({
  image,
  brand,
  name,
  price,
  originalPrice,
  rotation,
  xOffset,
  yOffset,
  delay,
}: FloatingCardProps) {
  return (
    <motion.div
      className="absolute w-[280px] bg-white p-4 shadow-xl"
      style={{
        rotate: rotation,
        left: xOffset,
        top: yOffset,
      }}
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      whileHover={{
        scale: 1.02,
        rotate: rotation - 2,
        transition: { duration: 0.3 },
      }}
    >
      {/* Product Image */}
      <div className="relative mb-4 aspect-4/5 overflow-hidden bg-[#f5f5f5]">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
          sizes="280px"
        />
      </div>

      {/* Product Info */}
      <div className="space-y-1">
        <p className="font-sans text-[10px] tracking-wide text-[#8a8a8a]">
          {brand}
        </p>
        <h4 className="font-serif text-[13px] leading-tight text-[#1a1a1a]">
          {name}
        </h4>
        <div className="flex items-center gap-2 pt-1">
          <span className="font-sans text-[13px] font-medium text-[#1a1a1a]">
            ${price}
          </span>
          <span className="font-sans text-[11px] text-[#8a8a8a] line-through">
            ${originalPrice}
          </span>
        </div>
        <p className="font-sans text-[10px] text-[#8a8a8a]">Size M</p>
      </div>

      {/* Mini Button */}
      <div className="mt-4 border-t border-[#e5e5e5] pt-3">
        <button className="w-full font-sans text-[10px] tracking-[1.5px] text-[#1a1a1a] uppercase transition-colors hover:text-[#A67B5B]">
          Buy Now
        </button>
      </div>
    </motion.div>
  );
}

export function PreLovedSection() {
  return (
    <section className="overflow-hidden bg-[#f8f7f4] px-4 py-24 md:px-8 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid min-h-[600px] grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {/* Left Side - Floating Cards */}
          <div className="relative hidden h-125 md:block lg:h-150">
            {/* Background decorative element */}
            <div className="absolute inset-0 rounded-full bg-linear-to-br from-[#e8e6e1]/30 to-transparent blur-3xl" />

            <FloatingCard
              image="https://i.ibb.co.com/LdK4tkBQ/28ccd6f21f4d286c43f5ad6ed615a967ff65afa6.jpg"
              brand="Nodi"
              name="Aya Studio Wide-Leg Trouser"
              price={85}
              originalPrice={145}
              rotation={20}
              xOffset={180}
              yOffset={80}
              delay={0.4}
            />
            <FloatingCard
              image="https://i.ibb.co.com/HLN5d8Yr/192c796b76e308a3fe99e5794ef1d1100661e354.jpg"
              brand="Nodi"
              name="Aya Studio Wide-Leg Trouser"
              price={85}
              originalPrice={145}
              rotation={-16}
              xOffset={10}
              yOffset={70}
              delay={0.2}
            />

            {/* Card 2 - Front card (rotated right) */}
          </div>

          {/* Mobile/Tablet - Stacked Images */}
          <div className="relative h-[400px] md:hidden">
            <FloatingCard
              image="/images/products/red-blazer.jpg"
              brand="Nodi"
              name="Aya Studio Wide-Leg Trouser"
              price={85}
              originalPrice={145}
              rotation={-6}
              xOffset={10}
              yOffset={20}
              delay={0.2}
            />
            <FloatingCard
              image="/images/products/brown-shirt.jpg"
              brand="Nodi"
              name="Aya Studio Wide-Leg Trouser"
              price={85}
              originalPrice={145}
              rotation={8}
              xOffset={80}
              yOffset={100}
              delay={0.4}
            />
          </div>

          {/* Right Side - Content */}
          <motion.div
            className="lg:pl-12"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            {/* Section Label */}
            <motion.p
              className="mb-6 font-sans text-[11px] tracking-[2px] text-[#8a8a8a] uppercase"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              04 The Consign
            </motion.p>

            {/* Headline */}
            <motion.h2
              className="mb-8 font-serif text-[42px] leading-[1.1] font-normal text-[#1a1a1a] md:text-[52px] lg:text-[58px]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Pre-loved pieces,
              <br />
              perfect fit
            </motion.h2>

            {/* Description */}
            <motion.p
              className="mb-10 max-w-md font-sans text-[15px] leading-relaxed text-[#5a5a5a]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Shop curated secondhand from The Collective. Every seller has a
              verified profile with measurements – so you know exactly how it
              fits.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <Button className="group h-auto rounded-none bg-[#A67B5B] px-8 py-4 text-[11px] font-normal tracking-[1.5px] text-white uppercase transition-all duration-300 hover:bg-[#8f6a4e] hover:shadow-lg">
                Sell Your Pieces
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
