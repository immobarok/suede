"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/use-user";
import { RippleButton } from "@/components/ui/ripple-button";
import { LookBookCard } from "./lookbookcard";

const reviews = [
  {
    productImage: "https://i.ibb.co/99dFgFQL/Frame-103-3.png",
    imageCount: 5,
    videoCount: 2,
    userName: "Amara K.",
    userHandle: "@amara",
    userAvatar: "https://i.ibb.co/xS7wb96j/Container-1.png",
    brandName: "Nodi",
    productName: "Flowy Dress",
    rating: 5,
    size: "M",
    reviewText:
      "These trousers are everything. The wide leg is flattering without being overwhelming. True to size for my measurements. The fabric has a beautiful drape and the color is even better in person.",
    height: "5'6\"",
    weight: "145 lbs",
    waist: '28"',
    hips: '40"',
    likes: 48,
    comments: 48,
  },
  {
    productImage: "https://i.ibb.co/5gxxrrxt/Frame-103-2.png",
    imageCount: 5,
    videoCount: 2,
    userName: "Amara K.",
    userHandle: "@amara",
    userAvatar: "https://i.ibb.co/xS7wb96j/Container-1.png",
    brandName: "Nodi",
    productName: "Flowy Dress",
    rating: 5,
    size: "M",
    reviewText:
      "These trousers are everything. The wide leg is flattering without being overwhelming. True to size for my measurements. The fabric has a beautiful drape.",
    height: "5'6\"",
    weight: "145 lbs",
    waist: '28"',
    hips: '40"',
    likes: 48,
    comments: 48,
  },
  {
    productImage: "https://i.ibb.co/DH2d8GH2/Frame-103.png",
    imageCount: 5,
    videoCount: 2,
    userName: "Amara K.",
    userHandle: "@amara",
    userAvatar: "https://i.ibb.co/xS7wb96j/Container-1.png",
    brandName: "Nodi",
    productName: "Flowy Dress",
    rating: 5,
    size: "M",
    reviewText:
      "These trousers are everything. The wide leg is flattering without being overwhelming. True to size for my measurements. The fabric has a beautiful drape and the color is vibrant.",
    height: "5'6\"",
    weight: "145 lbs",
    waist: '28"',
    hips: '40"',
    likes: 48,
    comments: 48,
  },
  {
    productImage: "https://i.ibb.co/99dFgFQL/Frame-103-3.png",
    imageCount: 7,
    videoCount: 1,
    userName: "Mina R.",
    userHandle: "@mina",
    userAvatar: "https://i.ibb.co/xS7wb96j/Container-1.png",
    brandName: "Sora",
    productName: "Tailored Blazer",
    rating: 4.8,
    size: "S",
    reviewText:
      "The fit around the shoulders is clean and structured, and the sleeve length was perfect for me. Great for work and dinner looks.",
    height: "5'5\"",
    weight: "132 lbs",
    waist: '27"',
    hips: '38"',
    likes: 63,
    comments: 21,
  },
  {
    productImage: "https://i.ibb.co/5gxxrrxt/Frame-103-2.png",
    imageCount: 4,
    videoCount: 1,
    userName: "Lina S.",
    userHandle: "@linas",
    userAvatar: "https://i.ibb.co/xS7wb96j/Container-1.png",
    brandName: "Kora",
    productName: "Pleated Trousers",
    rating: 4.6,
    size: "M",
    reviewText:
      "Super comfortable all day. The waist sits nicely without digging in, and the pleats stay crisp after a long day out.",
    height: "5'7\"",
    weight: "150 lbs",
    waist: '29"',
    hips: '41"',
    likes: 39,
    comments: 14,
  },
  {
    productImage: "https://i.ibb.co/DH2d8GH2/Frame-103.png",
    imageCount: 6,
    videoCount: 2,
    userName: "Nora T.",
    userHandle: "@norat",
    userAvatar: "https://i.ibb.co/xS7wb96j/Container-1.png",
    brandName: "Nodi",
    productName: "Evening Set",
    rating: 5,
    size: "L",
    reviewText:
      "Color is rich and elegant in natural light. I wore it for an event and got compliments all evening. Material feels premium.",
    height: "5'8\"",
    weight: "162 lbs",
    waist: '31"',
    hips: '43"',
    likes: 72,
    comments: 33,
  },
];

export function LookBookGrid() {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <section className="relative  px-4 pt-5 pb-24 md:px-8 lg:px-16">
      {!isLoading && !isAuthenticated && (
        <div className="pointer-events-none absolute bottom-0 left-0 z-10 h-[32%] w-full bg-linear-to-b from-transparent via-[#f5f5f0]/98 via-70% to-[#f5f5f0]" />
      )}

      <div className="relative container mx-auto">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {reviews.map((review, index) => {
            const isGuestRow = !isLoading && !isAuthenticated && index >= 3;

            return (
              <div
                key={`${review.userHandle}-${index}`}
                className={`relative ${isGuestRow ? "pointer-events-none" : ""}`}
              >
                <LookBookCard {...review} index={index} />
              </div>
            );
          })}
        </div>

        {!isLoading && !isAuthenticated && (
          <div className="pointer-events-auto relative z-20 -mt-44 flex w-full flex-col items-center justify-center pt-20 pb-8">
            <p className="mb-6 text-[14px] font-medium tracking-[2.24px] text-black uppercase">
              SIGN IN TO SEE MORE
            </p>
            <Link href="/auth/login">
              <RippleButton className="rounded-full border-none bg-black px-14 py-3 text-white">
                Sign In
              </RippleButton>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
