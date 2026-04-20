"use client";

import Link from "next/link";
import { ChevronRight, ExternalLink, Lock, Mail, Star, X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useQueryModal } from "@/hooks"; // Ensure your query-based hook is setup
import { useAuth } from "@/hooks/use-user";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence, Variants } from "framer-motion";

// Animation Variants
const containerVariants:Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 20, filter: "blur(10px)" },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: { 
      duration: 0.6, 
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  },
  exit: { 
    opacity: 0, 
    scale: 1.05, 
    filter: "blur(10px)",
    transition: { duration: 0.3 } 
  }
};

const itemVariants:Variants = {
  hidden: { opacity: 0, x: -15 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.4, ease: "easeOut" } 
  }
};

export function ReviewModal({ slug = "nadi-by-dani" }: { slug?: string }) {
  const { isOpen, open, close } = useQueryModal("view", "review");
  const { isAuthenticated } = useAuth();

  return (
    <Dialog open={isOpen} onOpenChange={(next) => (next ? open() : close())}>
      <DialogContent
        showCloseButton={false}
        className="w-[95vw] md:max-w-[500px] overflow-hidden rounded-none border-none bg-white p-0 shadow-[0_50px_100px_rgba(0,0,0,0.15)]"
      >
        <AnimatePresence mode="wait">
          {isOpen && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={containerVariants}
              className="flex flex-col"
            >
              <DialogTitle className="sr-only">Explore Options</DialogTitle>

              {/* HEADER: Animated blur and slide down */}
              <div className="relative border-b border-neutral-100 p-8 text-center">
                <motion.h2 
                  variants={itemVariants}
                  className="font-serif text-[26px] tracking-tight text-black"
                >
                  Explore
                </motion.h2>
                <button
                  onClick={close}
                  className="absolute right-8 top-1/2 -translate-y-1/2 text-neutral-400 transition-all hover:text-black hover:rotate-90"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* CONTENT: Staggered entrance */}
              <div className="space-y-10 p-10">
                
                {/* Visit Brand Section */}
                <motion.div variants={itemVariants} className="group">
                  <div className="mb-4 flex items-start gap-4">
                    <div className="mt-1 flex h-6 w-6 items-center justify-center">
                      <ExternalLink className="h-5 w-5 text-black" />
                    </div>
                    <div>
                      <h3 className="text-[20px] font-medium text-black">Visit Brand</h3>
                      <p className="text-[14px] text-neutral-400">Go to the brand's official Capsule Page</p>
                    </div>
                  </div>
                  <motion.div whileTap={{ scale: 0.97 }} whileHover={{ x: 8 }}>
                    <Link
                      href={`/the-capsule/${slug}`}
                      className="flex h-14 w-full items-center justify-center gap-3 bg-black text-[14px] font-normal text-white transition-all hover:bg-black/90"
                    >
                      Visit Brand <ChevronRight className="h-4 w-4" />
                    </Link>
                  </motion.div>
                </motion.div>

                {/* Review Section */}
                <motion.div variants={itemVariants}>
                  <div className="mb-4 flex items-start gap-4">
                    <div className="mt-1 flex h-6 w-6 items-center justify-center">
                      <Star className="h-5 w-5 text-black" />
                    </div>
                    <div>
                      <h3 className="text-[20px] font-medium text-black">Leave a Review</h3>
                      <p className="text-[14px] text-neutral-400">Share your experience with this brand</p>
                    </div>
                  </div>
                  <motion.div whileTap={{ scale: 0.97 }} whileHover={{ x: 8 }}>
                    <Link
                      href={isAuthenticated ? "/reviews" : "/auth/login"}
                      className="flex h-14 w-full items-center justify-center gap-3 bg-black text-[14px] font-normal text-white transition-all hover:bg-black/90"
                    >
                      {isAuthenticated ? (
                        <>
                          Leave a Review <ChevronRight className="h-4 w-4" />
                        </>
                      ) : (
                        <>
                          <Lock className="h-4 w-4 text-neutral-300" />
                          Sign in to Review
                        </>
                      )}
                    </Link>
                  </motion.div>
                </motion.div>

                {/* Inquiry Section */}
                <motion.div variants={itemVariants}>
                  <div className="mb-4 flex items-start gap-4">
                    <div className="mt-1 flex h-6 w-6 items-center justify-center">
                      <Mail className="h-5 w-5 text-black" />
                    </div>
                    <div>
                      <h3 className="text-[20px] font-medium text-black">Leave an Inquiry</h3>
                      <p className="text-[14px] text-neutral-400">Ask a specific question about services</p>
                    </div>
                  </div>
                  <motion.div whileTap={{ scale: 0.97 }} whileHover={{ x: 8 }}>
                    <Link
                      href={isAuthenticated ? "/inquiry" : "/auth/login"}
                      className="flex h-14 w-full items-center justify-center gap-3 bg-black text-[14px] font-normal text-white transition-all hover:bg-black/90"
                    >
                      {isAuthenticated ? (
                        <>
                          Leave an Inquiry <ChevronRight className="h-4 w-4" />
                        </>
                      ) : (
                        <>
                          <Lock className="h-4 w-4 text-neutral-300" />
                          Sign in to Inquire
                        </>
                      )}
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
