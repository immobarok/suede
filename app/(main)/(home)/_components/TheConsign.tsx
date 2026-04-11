"use client";

import { useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/effect-fade";

const ConsignShowcase = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activePanel, setActivePanel] = useState<"consign" | "verified">(
    "consign",
  );

  const panelData = useMemo(
    () => ({
      consign: {
        label: "The Consign",
        title: "Pre-loved pieces, perfect fit",
        description:
          "Shop curated secondhand from The Collective. Every seller has a verified profile with measurements.",
        secondary:
          "List your pieces in minutes and reach a community that values quality and fit.",
        primaryCta: "Shop the Consign",
        secondaryCta: "Sell Your Pieces",
        images: [
          "https://i.ibb.co.com/JR0M7NQr/Frame-2087328463.png",
        ],
      },
      verified: {
        label: "Verified Sellers",
        title: "Trusted closets, clear condition",
        description:
          "Transparent listings with condition notes and real measurements so you can buy with confidence.",
        secondary:
          "Build your profile once, then consign or shop with a fit-first experience.",
        primaryCta: "Browse Listings",
        secondaryCta: "Create Profile",
        images: [
          "https://i.ibb.co/HLN5d8Yr/192c796b76e308a3fe99e5794ef1d1100661e354.jpg",
          "https://i.ibb.co/LdK4tkBQ/28ccd6f21f4d286c43f5ad6ed615a967ff65afa6.jpg",
        ],
      },
    }),
    [],
  );

  const panelOrder: Array<"consign" | "verified"> = ["consign", "verified"];

  const handleSlideChange = (swiper: SwiperType) => {
    const nextPanel = panelOrder[swiper.realIndex] ?? "consign";
    setActivePanel(nextPanel);
  };

  const handleNext = () => {
    swiperRef.current?.slideNext(500);
  };

  const handlePrev = () => {
    swiperRef.current?.slidePrev(500);
  };

  const activeContent = panelData[activePanel];

  return (
    <section className="overflow-visible">
      <div className="container mx-auto grid min-h-160 grid-cols-1 md:grid-cols-2">
        <div className="relative order-1 flex min-h-155 w-full items-center justify-center overflow-hidden md:order-1">
          <Swiper
            modules={[Autoplay, EffectFade]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            loop
            speed={850}
            autoplay={{ delay: 2400, disableOnInteraction: false }}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={handleSlideChange}
            className="absolute inset-0 h-full w-full"
          >
            {panelOrder.map((panel, index) => (
              <SwiperSlide key={panel}>
                <div className="relative h-full w-full">
                  <Image
                    src={panelData[panel].images[0]}
                    alt={`${panelData[panel].title} background`}
                    fill
                    priority={index === 0}
                    className="object-cover"
                    unoptimized
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {activePanel === "consign" ? (
            <button
              onClick={handleNext}
              className="absolute top-1/2 right-6 z-50 -translate-y-1/2 p-2 text-white transition-transform hover:translate-x-2 focus:outline-none"
              aria-label="Go to verified sellers panel"
            >
              <ArrowRight size={40} strokeWidth={1} />
            </button>
          ) : (
            <button
              onClick={handlePrev}
              className="absolute top-1/2 left-6 z-50 -translate-y-1/2 p-2 text-white transition-transform hover:-translate-x-2 focus:outline-none"
              aria-label="Back to consign panel"
            >
              <ArrowLeft size={40} strokeWidth={1} />
            </button>
          )}
        </div>

        <div className="order-2 flex w-full flex-col justify-center bg-[#f1f0ee] p-8 transition-all duration-500 md:order-2 md:p-24">
          <span className="mb-12 text-sm tracking-[0.2em] text-black/70 uppercase">
            {activeContent.label}
          </span>

          <h2 className="mb-10 text-5xl font-bold text-black transition-all duration-500">
            {activeContent.title}
          </h2>
          <div className="mb-12 grid grid-cols-2 gap-8">
            <div>
              <p className="mb-6 leading-relaxed text-black/70 transition-opacity duration-500">
                {activeContent.description}
              </p>
              <button className="border-b border-black pb-1 text-xs font-semibold uppercase transition-opacity hover:opacity-70">
                {activeContent.primaryCta}
              </button>
            </div>
            <div>
              <p className="mb-6 leading-relaxed text-black/70 transition-opacity duration-500">
                {activeContent.secondary}
              </p>
              <button className="border-b border-black pb-1 text-xs font-semibold uppercase transition-opacity hover:opacity-70">
                {activeContent.secondaryCta}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-center gap-3 pb-2">
        {panelOrder.map((panel) => {
          const isActive = activePanel === panel;

          return (
            <button
              key={panel}
              type="button"
              onClick={() => {
                const panelIndex = panelOrder.indexOf(panel);
                swiperRef.current?.slideToLoop(panelIndex, 500);
              }}
              className={`rounded-full transition-all duration-300 ${
                isActive ? "h-2.5 w-11 bg-black" : "h-3 w-3 bg-gray-400"
              }`}
              aria-label={`Show ${panel} panel`}
            />
          );
        })}
      </div>
    </section>
  );
};

export function PreLovedSection() {
  return (
    <main className="bg-[#f9f8f6] py-16">
      <section>
        <ConsignShowcase />
      </section>
    </main>
  );
}
