"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-6">
      <div className="relative w-full max-w-3xl">
        {/* LARGE BACKGROUND TEXT (Watermark Style) */}
        <div className="absolute inset-0 -z-10 flex items-center justify-center overflow-hidden select-none">
          <motion.h2
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.03, scale: 1 }}
            transition={{ duration: 1.5 }}
            className="text-[20vw] leading-none font-black tracking-tighter text-[#800000]"
          >
            404
          </motion.h2>
        </div>

        <div className="text-center">
          {/* ANIMATED ICON */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-8 inline-block"
          >
            <div className="relative">
              <ShoppingBag className="h-16 w-16 stroke-[1px] text-primary" />
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-[#800000]"
              />
            </div>
          </motion.div>

          {/* TYPOGRAPHY */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h1 className="font-darker mb-4 text-4xl font-bold tracking-tighter text-[#2B2B2A] uppercase md:text-6xl">
              Lost in the <span className="text-primary">Archive</span>
            </h1>

            <p className="font-darker mx-auto mb-12 max-w-md text-lg leading-relaxed text-[#8A8A82]">
              The piece you are looking for is currently unavailable or has been
              moved to a different collection.
            </p>
          </motion.div>

          {/* ACTION BUTTONS */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href="/shop"
              className="group font-darker bg-primary relative overflow-hidden px-10 py-4 text-xs font-bold tracking-[0.2em] text-white transition-all hover:bg-[#3d0b13]"
            >
              <span className="relative z-10 flex items-center gap-2">
                BROWSE COLLECTIONS
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>

            <Link
              href="/"
              className="font-darker border border-[#E7E4DF] px-10 py-4 text-xs font-bold tracking-[0.2em] text-[#2B2B2A] transition-all hover:bg-[#F7F6F4]"
            >
              RETURN HOME
            </Link>
          </motion.div>

          {/* DECORATIVE LINE */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "60px" }}
            transition={{ delay: 0.8, duration: 1 }}
            className="mx-auto mt-20 h-[1px] bg-[#800000]/30"
          />
        </div>
      </div>
    </div>
  );
}
