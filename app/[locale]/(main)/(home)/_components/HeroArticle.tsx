"use client"

import ButtonTextChange from '@/components/ui/button-textchange';
import { motion, Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

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
    const t = useTranslations("Hero");

    return (
        <motion.div
            className="max-w-4xl px-4 flex flex-col items-center justify-center text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Top Label - Darker Grotesque */}
            <motion.span
                variants={itemVariants}
                className="text-[#E3D6CC] text-center text-[14px] font-normal uppercase tracking-[2.24px] leading-normal"
                style={{ fontFamily: '"Darker Grotesque", sans-serif' }}
            >
                {t("trustLayer")}
            </motion.span>

            {/* Spacer - 12px */}
            <div className="h-3" />

            {/* Main Heading - Cormorant Garamond */}
            <motion.h1
                variants={itemVariants}
                className="text-[32px] sm:text-[48px] md:text-[64px] lg:text-[84px] font-normal text-[#E8E4DF] leading-normal text-center"
                style={{ fontFamily: '"Cormorant Garamond", serif' }}
                whileHover="hover"
                initial="initial"
            >
                <motion.span variants={hoverVariants} className="block">{t("line1")}</motion.span>
                <motion.span variants={hoverVariants} className="block">{t("line2")}</motion.span>
                <motion.span variants={hoverVariants} className="block">{t("line3")}</motion.span>
            </motion.h1>

            {/* Spacer - 12px */}
            <div className="h-3" />

            {/* Bottom Description - Darker Grotesque */}
            <motion.p
                variants={itemVariants}
                className="text-[#E8E4DF] text-center text-[18px] font-normal leading-normal max-w-xl mx-auto mb-8"
                style={{ fontFamily: '"Darker Grotesque", sans-serif' }}
                whileHover={{
                    opacity: 1,
                    scale: 1.0,
                    transition: { duration: 0.3 }
                }}
            >
                {t("description")}
            </motion.p>

            <div className='flex flex-col sm:flex-row gap-4 items-center justify-center'>
                <motion.div
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <ButtonTextChange
                        text={t("explore")}
                        icon={<ArrowRight size={20} />}
                        className="w-full sm:w-auto mt-0 px-8 py-3 flex gap-2.5 items-center justify-center bg-primary text-primary-foreground cursor-pointer font-normal uppercase tracking-wider hover:bg-primary/90 transition-colors "
                    />
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <ButtonTextChange
                        text={t("discover")}
                        className="w-full sm:w-auto mt-0 px-8 py-3 bg-none outline outline-border text-border cursor-pointer font-normal uppercase tracking-wider transition-colors"
                    />
                </motion.div>
            </div>

        </motion.div>
    );
}