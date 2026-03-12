"use client";

import { motion, Variants } from 'framer-motion';

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

interface AnimatedSectionHeaderProps {
    topText: string;
    middleText: string;
    bottomText: string;
    className?: string;
}

export function AnimatedSectionHeader({
    topText,
    middleText,
    bottomText,
    className = '',
}: AnimatedSectionHeaderProps) {
    return (
        <motion.div
            className={`flex flex-col items-center text-center ${className}`}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
        >
            {/* Top Label - Darker Grotesque */}
            <motion.span 
                variants={itemVariants}
                className="text-[#C9A96E] text-center text-[14px] font-normal uppercase tracking-[2.24px] leading-normal"
                style={{ fontFamily: '"Darker Grotesque", sans-serif' }}
            >
                {topText}
            </motion.span>
            
            {/* Spacer - 12px */}
            <div className="h-3" />
            
            {/* Main Heading - Cormorant Garamond */}
            <motion.h2 
                variants={itemVariants}
                className="text-[#1A1A1A] text-center text-[32px] sm:text-[48px] md:text-[64px] lg:text-[84px] font-normal leading-normal"
                style={{ fontFamily: '"Cormorant Garamond", serif' }}
            >
                {middleText}
            </motion.h2>
            
            {/* Spacer - 12px */}
            <div className="h-3" />
            
            {/* Bottom Description - Darker Grotesque */}
            <motion.p 
                variants={itemVariants}
                className="text-[#8A8A82] text-center text-[18px] font-normal leading-normal max-w-xl"
                style={{ fontFamily: '"Darker Grotesque", sans-serif' }}
            >
                {bottomText}
            </motion.p>
        </motion.div>
    );
}