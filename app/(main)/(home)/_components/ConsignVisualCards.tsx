"use client";

import FloatingCard, { type FloatingCardProps } from "./FloatingCard";

const desktopCards: FloatingCardProps[] = [
  {
    image:
      "https://i.ibb.co.com/LdK4tkBQ/28ccd6f21f4d286c43f5ad6ed615a967ff65afa6.jpg",
    brand: "Nodi",
    name: "Aya Studio Wide-Leg Trouser",
    price: 85,
    originalPrice: 145,
    rotation: 20,
    xOffset: 180,
    yOffset: 80,
    delay: 0.4,
  },
  {
    image:
      "https://i.ibb.co.com/HLN5d8Yr/192c796b76e308a3fe99e5794ef1d1100661e354.jpg",
    brand: "Nodi",
    name: "Aya Studio Wide-Leg Trouser",
    price: 85,
    originalPrice: 145,
    rotation: -16,
    xOffset: 10,
    yOffset: 70,
    delay: 0.2,
  },
];

const mobileCards: FloatingCardProps[] = [
  {
    image: desktopCards[0].image,
    brand: "Nodi",
    name: "Aya Studio Wide-Leg Trouser",
    price: 85,
    originalPrice: 145,
    rotation: -6,
    xOffset: -45,
    yOffset: 30,
    delay: 0.2,
    centerOnMobile: true,
  },
  {
    image: desktopCards[1].image,
    brand: "Nodi",
    name: "Aya Studio Wide-Leg Trouser",
    price: 85,
    originalPrice: 145,
    rotation: 8,
    xOffset: 45,
    yOffset: 40,
    delay: 0.4,
    centerOnMobile: true,
  },
];

const ConsignVisualCards = () => {
  return (
    <>
      <div className="relative hidden h-125 md:block lg:h-150">
        <div className="absolute inset-0 rounded-full bg-linear-to-br from-[#e8e6e1]/30 to-transparent blur-3xl" />

        {desktopCards.map((card, idx) => (
          <FloatingCard key={`desktop-${idx}`} {...card} />
        ))}
      </div>

      <div className="relative h-100 md:hidden">
        {mobileCards.map((card, idx) => (
          <FloatingCard key={`mobile-${idx}`} {...card} />
        ))}
      </div>
    </>
  );
};

export default ConsignVisualCards;
