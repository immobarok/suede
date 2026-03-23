"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RefreshCw, ArrowLeft, ShieldAlert } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Critical System Error:", error);
  }, [error]);

  return (
    <html lang="en" className="antialiased">
      <body className="bg-[#FBFBF9] selection:bg-[#800000] selection:text-white">
        <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-12">
          {/* GHOST BACKGROUND TEXT */}
          <div className="absolute inset-0 -z-10 flex items-center justify-center select-none">
            <motion.h2
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 0.04, scale: 1 }}
              transition={{ duration: 1.5 }}
              className="text-[15vw] leading-none font-black tracking-tighter text-[#800000]"
            >
              ERROR
            </motion.h2>
          </div>

          {/* MAIN CONTENT AREA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-lg text-center"
          >
            {/* ANIMATED ICON */}
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="mb-8 inline-flex h-16 w-16 items-center justify-center rounded-full border border-[#800000]/20 text-[#800000]"
            >
              <motion.div
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut",
                }}
              >
                <ShieldAlert className="h-8 w-8 stroke-[1px]" />
              </motion.div>
            </motion.div>

            {/* TYPOGRAPHY */}
            <h1 className="font-darker mb-4 text-4xl font-bold tracking-tighter text-[#2B2B2A] uppercase md:text-5xl">
              System <span className="text-primary">Interrupted</span>
            </h1>

            <p className="font-darker mx-auto mb-10 max-w-80 text-lg leading-relaxed text-[#8A8A82]">
              We encountered a rare exception in the archive. Our curators are
              working to restore access to the collection.
            </p>

            {/* TRACE ID BADGE */}
            {error.digest && (
              <div className="mb-12 inline-block border-b border-[#800000]/30 pb-1">
                <p className="font-mono text-[10px] font-bold tracking-[0.3em] text-[#800000] uppercase">
                  Reference ID: {error.digest}
                </p>
              </div>
            )}

            {/* ACTION BUTTONS */}
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button
                onClick={reset}
                className="font-darker group bg-primary h-14 cursor-pointer rounded-none px-10 text-xs font-bold tracking-[0.2em] text-white transition-all duration-300 hover:bg-[#3D0B13]"
              >
                <RefreshCw className="mr-2 h-4 w-4 transition-transform group-hover:rotate-180" />
                RETRY SESSION
              </Button>

              <Button
                asChild
                variant="outline"
                className="font-darker h-14 rounded-none border-[#E7E4DF] px-10 text-xs font-bold tracking-[0.2em] text-[#4F4F4D] transition-all duration-300 hover:bg-[#F7F6F4] hover:text-[#2B2B2A]"
              >
                <Link href="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  RETURN HOME
                </Link>
              </Button>
            </div>

            {/* DECORATIVE ACCENT */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "40px" }}
              transition={{ delay: 0.5, duration: 1 }}
              className="mx-auto mt-16 h-[1px] bg-[#800000]/40"
            />
          </motion.div>

          {/* FOOTER BRANDING */}
          <div className="mt-12 opacity-20">
            <span className="text-[10px] font-bold tracking-[1.2em] text-[#2B2B2A] uppercase">
              Suede Archive
            </span>
          </div>
        </div>
      </body>
    </html>
  );
}
