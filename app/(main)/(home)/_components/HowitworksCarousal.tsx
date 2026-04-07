"use client";

import { useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/effect-fade";

const HowitworksCarousal = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activePanel, setActivePanel] = useState<"lookbook" | "collective">(
    "lookbook",
  );

  const panelData = useMemo(
    () => ({
      lookbook: {
        title: "The Lookbook",
        description:
          "Browse reviews to understand fit, quality, and brand experience",
        secondary:
          "Respond to inquiries to share your experience",
        primaryCta: "Reviews",
        secondaryCta: "Inquiries",
        images: [
          "https://i.ibb.co/BxdPW2b/Frame-2087328287.png",
          "https://i.ibb.co/xtnW0wx7/Frame-2087328287-1.png",
        ],
      },
      collective: {
        title: "The Collective",
        description:
          "Connect with your Suede match based on real measurements and fashion preferences.",
        secondary: "Find real members and discover your best style match.",
        primaryCta: "Find members",
        secondaryCta: "Create your profile",
        images: [
          "https://i.ibb.co/xtnW0wx7/Frame-2087328287-1.png",
          "https://i.ibb.co/BxdPW2b/Frame-2087328287.png",
        ],
      },
    }),
    [],
  );

  const panelOrder: Array<"lookbook" | "collective"> = [
    "lookbook",
    "collective",
  ];

  const handleSlideChange = (swiper: SwiperType) => {
    const nextPanel = panelOrder[swiper.realIndex] ?? "lookbook";
    setActivePanel(nextPanel);
  };

  const handleLookbookNext = () => {
    swiperRef.current?.slideNext(500);
  };

  const handleCollectivePrev = () => {
    swiperRef.current?.slidePrev(500);
  };

  const activeContent = panelData[activePanel];

  return (
    <section className="overflow-visible ">
      <div className="mx-auto grid min-h-160 container grid-cols-1 md:grid-cols-2">
        <div className="order-2 flex w-full flex-col justify-center bg-[#f1f0ee] p-8 transition-all duration-500 md:order-1 md:p-24">
          <span className="mb-12 text-sm tracking-[0.2em] text-black/70 uppercase">
            How it works
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

        <div className="relative order-1 flex min-h-155 w-full items-center justify-center overflow-hidden md:order-2">
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

          {activePanel === "lookbook" ? (
            <button
              onClick={handleLookbookNext}
              className="absolute top-1/2 right-6 z-50 -translate-y-1/2 p-2 text-white transition-transform hover:translate-x-2 focus:outline-none"
              aria-label="Go to collective slider"
            >
              <ArrowRight size={40} strokeWidth={1} />
            </button>
          ) : (
            <button
              onClick={handleCollectivePrev}
              className="absolute top-1/2 left-6 z-50 -translate-y-1/2 p-2 text-white transition-transform hover:-translate-x-2 focus:outline-none"
              aria-label="Back to lookbook slider"
            >
              <ArrowLeft size={40} strokeWidth={1} />
            </button>
          )}

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
                isActive
                  ? "h-2.5 w-11 bg-black"
                  : "h-3 w-3 bg-gray-400"
              }`}
              aria-label={`Show ${panel} panel`}
            />
          );
        })}
      </div>
    </section>
  );
};

export default HowitworksCarousal;
