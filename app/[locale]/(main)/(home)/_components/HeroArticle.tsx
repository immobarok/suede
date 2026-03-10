"use client"
import { motion, Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1,
        },
    },
};

const itemVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 40,
        filter: "blur(10px)",
    },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
            duration: 0.8,
            ease: [0.25, 0.1, 0.25, 1] as const,
        },
    },
};

const hoverVariants: Variants = {
    initial: {
        opacity: 1,
        y: 0,
    },
    hover: {
        scale: 1.05,
        transition: {
            duration: 0.4,
            ease: [0.25, 0.1, 0.25, 1] as const,
        },
    },
};

export default function HeroArticle() {
    return (
        <motion.div
            className="max-w-2xl justify-center text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.h4
                variants={itemVariants}
                className="text-muted-foreground"
            >
                The trust layer for fashion
            </motion.h4>

            <motion.h1
                variants={itemVariants}
                className="text-[84px] font-normal font-logo leading-[105%]"
                whileHover="hover"
                initial="initial"
            >
                <motion.span variants={hoverVariants} className="block">See How Clothes</motion.span>
                <motion.span variants={hoverVariants} className="block">Really Fit on</motion.span>
                <motion.span variants={hoverVariants} className="block">Bodies Like Yours</motion.span>
            </motion.h1>

            <motion.p
                variants={itemVariants}
                className="text-[16px] text-[#E8E4DF] font-normal text-center max-w-lg mx-auto"
                whileHover={{
                    opacity: 1,
                    scale: 1.0,
                    transition: { duration: 0.3 }
                }}
            >
                SUEDE matches you with reviewers who share your exact body measurements. Shop with confidence. Return less. Discover more.
            </motion.p>

            <div className='flex gap-4 items-center justify-center'>
                <motion.button
                    variants={itemVariants}
                    className="mt-8 px-8 py-3 flex gap-2.5 items-center bg-primary text-accentn cursor-pointer font-normal uppercase tracking-wider hover:bg-primary/90 transition-colors "
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Explore Reviews
                    <ArrowRight size={20} />
                </motion.button>

                <motion.button
                    variants={itemVariants}
                    className="mt-8 px-8 py-3 bg-none outline outline-[#E8E4DF] text-[#E8E4DF] cursor-pointer font-normal uppercase tracking-wider transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Discover Brands
                </motion.button>
            </div>
        </motion.div>
    );
}