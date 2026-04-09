"use-client";
"use client";

import { RippleButton } from "@/components/ui/ripple-button";
import { BrandCard } from "./brandcard";
import { useAuth } from "@/hooks/use-user";
import Link from "next/link";

const brands = [
  {
    slug: "nadi-by-dani",
    name: "Nadi by Dani",
    category: "Womenswear",
    location: "Brooklyn, NY",
    description:
      "Designed for women Who value quality.expression, NADI is notabout fashion Of fleeting trends.",
    rating: 4.8,
    ethics: 5,
    reviews: 234,
    followers: "12.4k",
    image: "https://i.ibb.co.com/mPDsZwn/Tofe-BRR-1.png",
  },
  {
    slug: "hanifa",
    name: "Hanifa",
    category: "Womenswear",
    location: "Los Angeles, CA",
    description:
      "Designed for women Who value quality.expression, NADI is notabout fashion Of fleeting trends.",
    rating: 4.8,
    ethics: 5,
    reviews: 234,
    followers: "12.4k",
    image: "https://i.ibb.co.com/LzpzHxcT/Starbfish-BRR-2.png",
  },
  {
    slug: "bbx-brand",
    name: "BBX Brand",
    category: "Womenswear",
    location: "New York, NY",
    description:
      "Designed for women Who value quality.expression, NADI is notabout fashion Of fleeting trends.",
    rating: 4.8,
    ethics: 5,
    reviews: 234,
    followers: "12.4k",
    image: "https://i.ibb.co.com/N2Z0YbQL/Nysama-BRR-1.png",
  },
  {
    slug: "cou-coo",
    name: "Cou Coo",
    category: "Womenswear",
    location: "Atlanta, GA",
    description:
      "Designed for women Who value quality.expression, NADI is notabout fashion Of fleeting trends.",
    rating: 4.8,
    ethics: 5,
    reviews: 234,
    followers: "12.4k",
    image: "https://i.ibb.co.com/671jPdcx/Nadi-BRR-1.png",
  },
  {
    slug: "cais-collective",
    name: "Cai’s Collective",
    category: "Womenswear",
    location: "Chicago, IL",
    description:
      "Designed for women Who value quality.expression, NADI is notabout fashion Of fleeting trends.",
    rating: 4.8,
    ethics: 5,
    reviews: 234,
    followers: "12.4k",
    image: "https://i.ibb.co.com/mrFYv7NT/Meji-Meji-BRR-1.png",
  },
  {
    slug: "cais-collective-2",
    name: "Cai’s Collective",
    category: "Womenswear",
    location: "Chicago, IL",
    description:
      "Designed for women Who value quality.expression, NADI is notabout fashion Of fleeting trends.",
    rating: 4.8,
    ethics: 5,
    reviews: 234,
    followers: "12.4k",
    image: "https://i.ibb.co.com/s9HHDsKy/Kairos-BRR-1.png",
  },
  {
    slug: "image-44",
    name: "Brand 7",
    category: "Womenswear",
    location: "Unknown",
    description: "Description for Brand 7.",
    rating: 4.0,
    ethics: 4,
    reviews: 100,
    followers: "5k",
    image: "https://i.ibb.co.com/tpNxyM4t/image-44.png",
  },
  {
    slug: "bupbes-brr-2",
    name: "Bupbes",
    category: "Womenswear",
    location: "Unknown",
    description: "Description for Bupbes.",
    rating: 4.5,
    ethics: 4,
    reviews: 150,
    followers: "8k",
    image: "https://i.ibb.co.com/ymZBqS95/Bupbes-BRR-2.png",
  },
  {
    slug: "image-50",
    name: "Brand 9",
    category: "Womenswear",
    location: "Unknown",
    description: "Description for Brand 9.",
    rating: 4.2,
    ethics: 4,
    reviews: 80,
    followers: "3k",
    image: "https://i.ibb.co.com/C3Ng2Lxk/image-50.png",
  },
];

export function BrandCardGrid() {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <section className="px-4 py-24 md:px-0">
      <div className="w-full">
        {/* Full width gradient for unauthenticated users covering the bottom row */}
        {!isLoading && !isAuthenticated && (
          <div className="pointer-events-none absolute bottom-0 left-0 z-10 h-[28%] w-full bg-linear-to-b from-transparent via-70% via-[#F8F6F3]/99 to-[#F8F6F3]" />
        )}
        <div className="relative container mx-auto">
          <div className="grid grid-cols-1 gap-x-10 gap-y-24 md:grid-cols-3">
            {brands.map((brand, index) => {
              const isGuestRow = !isLoading && !isAuthenticated && index >= 6;
              return (
                <div
                  key={`${brand.name}-${index}`}
                  className={`relative ${isGuestRow ? "pointer-events-none" : ""}`}
                >
                  <BrandCard {...brand} index={index} />
                </div>
              );
            })}
          </div>

          {!isLoading && !isAuthenticated ? (
            <div className="pointer-events-auto relative z-20 -mt-48 flex w-full flex-col items-center justify-center pt-24 pb-12">
              <div className="pointer-events-none absolute inset-x-0 bottom-full" />
              <p className="z-10 mb-6 text-[14px] font-medium tracking-[2.24px] text-black uppercase">
                SIGN IN TO SEE MORE
              </p>
              <Link href="auth/login">
                <RippleButton className="rounded-full border-none bg-black px-17.75 py-3.5 text-white">
                  Sign In
                </RippleButton>
              </Link>
            </div>
          ) : null}

          {!isLoading && isAuthenticated && (
            <div className="mt-16 flex items-center justify-center gap-4 text-sm text-neutral-700">
              <button
                className="px-2 py-1 text-neutral-400 hover:text-neutral-900"
                aria-label="Previous page"
                type="button"
              >
                ←
              </button>
              <button
                className="px-2 py-1 text-neutral-900 underline underline-offset-4"
                type="button"
              >
                1
              </button>
              <button
                className="px-2 py-1 text-neutral-500 hover:text-neutral-900"
                type="button"
              >
                2
              </button>
              <button
                className="px-2 py-1 text-neutral-500 hover:text-neutral-900"
                type="button"
              >
                3
              </button>
              <button
                className="px-2 py-1 text-neutral-400 hover:text-neutral-900"
                aria-label="Next page"
                type="button"
              >
                →
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
