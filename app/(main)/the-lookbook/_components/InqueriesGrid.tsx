"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/use-user";
import { RippleButton } from "@/components/ui/ripple-button";
import { CommunityQuestionCard } from "./CommunityQuestionCard";

const questions = [
  {
    productImage: "https://i.ibb.co/SwyPhMGM/Frame-2087328443.png",
    brandName: "Hanifa",
    productName: "The Nyomi Maxi",
    size: "6",
    questionUser: {
      name: "Kikiola Akanbi",
      handle: "@kikiolaakanbi",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
      height: "5'5\"",
      bust: "33",
      waist: "29",
      hips: "40",
    },
    question: "How much coverage does the dress offer?",
    responses: [
      {
        id: "1",
        userName: "Kikilolaa",
        userAvatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
        height: "5'6\"",
        bust: "33",
        waist: "39",
        hips: "40",
        answer: "Goof coverage - test",
        likes: 48,
      },
      {
        id: "2",
        userName: "Sarah Chen",
        userAvatar:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop",
        height: "5'4\"",
        bust: "34",
        waist: "28",
        hips: "38",
        answer: "Pretty good coverage, not see-through at all",
        likes: 52,
      },
    ],
  },
  {
    productImage: "https://i.ibb.co/SwyPhMGM/Frame-2087328443.png",
    brandName: "Maison Margiela",
    productName: "Tailored Blazer Dress",
    size: "4",
    questionUser: {
      name: "Amara Johnson",
      handle: "@amaraj",
      avatar:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop",
      height: "5'7\"",
      bust: "35",
      waist: "27",
      hips: "38",
    },
    question: "Is this true to size? I'm between a 4 and 6.",
    responses: [
      {
        id: "1",
        userName: "Jessica L.",
        userAvatar:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop",
        height: "5'6\"",
        bust: "34",
        waist: "26",
        hips: "36",
        answer: "Size up! The shoulders run narrow",
        likes: 34,
      },
      {
        id: "2",
        userName: "Maya R.",
        userAvatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
        height: "5'8\"",
        bust: "36",
        waist: "28",
        hips: "40",
        answer: "I'm a 4/6 and the 4 fit perfectly",
        likes: 28,
      },
    ],
  },
  {
    productImage:
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&h=800&fit=crop",
    brandName: "Reformation",
    productName: "Juliette Silk Dress",
    size: "8",
    questionUser: {
      name: "Emma Williams",
      handle: "@emwills",
      avatar:
        "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop",
      height: "5'9\"",
      bust: "36",
      waist: "30",
      hips: "42",
    },
    question: "Does the silk wrinkle easily during travel?",
    responses: [
      {
        id: "1",
        userName: "TravelQueen",
        userAvatar:
          "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=150&h=150&fit=crop",
        height: "5'5\"",
        bust: "32",
        waist: "28",
        hips: "37",
        answer: "Yes, pack a steamer! But worth it for the look",
        likes: 67,
      },
      {
        id: "2",
        userName: "Lisa M.",
        userAvatar:
          "https://images.unsplash.com/photo-1554151228-14d9def656ec?w=150&h=150&fit=crop",
        height: "5'10\"",
        bust: "38",
        waist: "31",
        hips: "43",
        answer: "Fold carefully and you'll be fine",
        likes: 45,
      },
    ],
  },
  {
    productImage:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=800&fit=crop",
    brandName: "Cult Gaia",
    productName: "Ark Bamboo Bag",
    size: "OS",
    questionUser: {
      name: "Priya Patel",
      handle: "@priyastyle",
      avatar:
        "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&h=150&fit=crop",
      height: "5'4\"",
      bust: "34",
      waist: "28",
      hips: "39",
    },
    question: "Can this fit a laptop or just essentials?",
    responses: [
      {
        id: "1",
        userName: "TechStylist",
        userAvatar:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop",
        height: "5'11\"",
        bust: "37",
        waist: "32",
        hips: "41",
        answer: "13 inch MacBook fits snugly!",
        likes: 89,
      },
      {
        id: "2",
        userName: "Minimalist",
        userAvatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
        height: "5'6\"",
        bust: "33",
        waist: "27",
        hips: "38",
        answer: "Just essentials - phone, keys, small wallet",
        likes: 56,
      },
    ],
  },
  {
    productImage: "https://i.ibb.co/SwyPhMGM/Frame-2087328443.png",
    brandName: "Jacquemus",
    productName: "Le Chiquito Mini",
    size: "OS",
    questionUser: {
      name: "Zoe Kim",
      handle: "@zoekim",
      avatar:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&h=150&fit=crop",
      height: "5'2\"",
      bust: "32",
      waist: "24",
      hips: "34",
    },
    question: "Is this too small for a night out? What fits inside?",
    responses: [
      {
        id: "1",
        userName: "FashionWeek",
        userAvatar:
          "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=150&h=150&fit=crop",
        height: "5'8\"",
        bust: "35",
        waist: "26",
        hips: "39",
        answer: "Lipstick and credit card only. It's a statement!",
        likes: 124,
      },
      {
        id: "2",
        userName: "Claire D.",
        userAvatar:
          "https://images.unsplash.com/photo-1542596594-649edbc13630?w=150&h=150&fit=crop",
        height: "5'3\"",
        bust: "34",
        waist: "26",
        hips: "36",
        answer: "AirPods, lip gloss, and house key max",
        likes: 78,
      },
    ],
  },
  {
    productImage: "https://i.ibb.co/SwyPhMGM/Frame-2087328443.png",
    brandName: "Staud",
    productName: "Tommy Corduroy Set",
    size: "10",
    questionUser: {
      name: "Rachel Green",
      handle: "@rachelg",
      avatar:
        "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=150&h=150&fit=crop",
      height: "5'6\"",
      bust: "38",
      waist: "32",
      hips: "44",
    },
    question: "How's the stretch in the corduroy? I'm curvy.",
    responses: [
      {
        id: "1",
        userName: "CurvyVibes",
        userAvatar:
          "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150&h=150&fit=crop",
        height: "5'5\"",
        bust: "40",
        waist: "33",
        hips: "46",
        answer: "Zero stretch! Size up if you're between sizes",
        likes: 92,
      },
      {
        id: "2",
        userName: "Denise R.",
        userAvatar:
          "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop",
        height: "5'7\"",
        bust: "36",
        waist: "31",
        hips: "43",
        answer: "Firm fit but structured beautifully",
        likes: 41,
      },
    ],
  },
];
export function CommunityQuestionGrid() {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <section className="relative px-4 pt-10 pb-24 md:px-8 lg:px-16">
      {!isLoading && !isAuthenticated && (
        <div className="pointer-events-none absolute bottom-0 left-0 z-10 h-[32%] w-full bg-linear-to-b from-transparent via-[#f5f5f0]/98 via-70% to-[#f5f5f0]" />
      )}

      <div className="relative container mx-auto">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {questions.map((question, index) => {
            const isGuestRow = !isLoading && !isAuthenticated && index >= 4;

            return (
              <div
                key={`${question.brandName}-${index}`}
                className={`relative ${isGuestRow ? "pointer-events-none" : ""}`}
              >
                <CommunityQuestionCard {...question} index={index} />
              </div>
            );
          })}
        </div>

        {!isLoading && !isAuthenticated ? (
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
    </section>
  );
}
