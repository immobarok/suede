import Image from "next/image";
import dynamic from "next/dynamic";
import { Notifications } from "./_components/Notifications";
import { ArrowLeft, ExternalLink, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/animate-ui/components/radix/hover-card";
import { Review } from "@/types";

const ReviewCard = dynamic(() => import("./_components/ReviewCard"), {
  loading: () => (
    <div className="h-96 animate-pulse rounded bg-neutral-200"></div>
  ),
});

const reviews: Review[] = [
  {
    name: "Kikiola Akanbi",
    handle: "@kikiolaakanbi",
    title: "Flowy Dress",
    size: "6",
    rating: 4.5,
    avatar: "https://i.ibb.co/3mKz4rNX/Rectangle-13.png",
    image: "https://i.ibb.co/3mKz4rNX/Rectangle-13.png",
    excerpt:
      "The perfect baby tee! Great quality. Does not lose form throughout the day. And the fit...",
  },
  {
    name: "Kikiola Akanbi",
    handle: "@kikiolaakanbi",
    title: "Flowy Dress",
    size: "6",
    rating: 4.5,
    avatar: "https://i.ibb.co/3mKz4rNX/Rectangle-13.png",
    image: "https://i.ibb.co/3mKz4rNX/Rectangle-13.png",
    excerpt:
      "The perfect baby tee! Great quality. Does not lose form throughout the day. And the fit...",
  },
];

export default function CapsuleBrandPage() {
  return (
    <main className="relative overflow-hidden py-16">
      <Notifications />
      <Image
        src="https://i.ibb.co/JWpSj3rb/Image-With-Fallback-4.png"
        alt="Background"
        fill
        className="object-cover opacity-25 grayscale"
        priority
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/20 to-white/10" />

      <div className="relative z-10 container mx-auto">
        <section className="px-4 pt-12 pb-10 md:px-0">
          <div className="mb-4 flex cursor-pointer items-center gap-2 text-[11px] text-black/60 uppercase hover:text-black/80">
            <ArrowLeft className="h-4 w-4" /> Back to Lookbook
          </div>

          <div className="overflow-hidden border border-black/10 bg-black/20">
            <div
              className="relative aspect-16/7 w-full overflow-hidden"
              style={{
                background:
                  "linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), linear-gradient(180deg, rgba(0, 0, 0, 0.00) 54.99%, #000 95.68%), url(https://i.ibb.co.com/jZgx4HML/Chat-GPT-Image-Apr-16-2026-12-53-48-AM.png) lightgray 0px -24.822px / 100% 282.157% no-repeat",
              }}
            >
              {/* Centered Brand Name */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="text-[42px] leading-none font-normal tracking-[0.05em] text-white uppercase">
                  NADI
                </div>
              </div>

              {/* Bottom-left Info */}
              <div className="absolute bottom-10 left-10 max-w-2xl text-white">
                <div className="text-[12px] tracking-[0.2em] text-[#C6C5C2] uppercase">
                  Womenswear Brooklyn, NY
                </div>
                <div className="pt-3.5 text-[14px] leading-relaxed text-[#C6C5C2]">
                  Founded by Aya Okonkwo, blending West African textiles with
                  modern silhouettes.
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-2xl px-4 pb-8 md:px-10">
          <div className="grid gap-6 pb-8">
            <div className="grid grid-cols-3 gap-6 text-center">
              <HoverCard>
                <HoverCardTrigger asChild>
                  <div className="cursor-pointer">
                    <div className="text-[24px]">5.0</div>
                    <div className="flex items-center justify-center gap-2 text-[10px] tracking-[0.3em] text-black/60 uppercase">
                      <Image
                        src="/icons/rating.svg"
                        alt="Rating"
                        width={16}
                        height={16}
                      />
                      Rating
                    </div>
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Rating Breakdown</h4>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-1">★★★★★</span>
                        <span>2 reviews</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-1">★★★★☆</span>
                        <span>1 review</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-1">★★★☆☆</span>
                        <span>0 reviews</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-1">★★☆☆☆</span>
                        <span>0 reviews</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-1">★☆☆☆☆</span>
                        <span>0 reviews</span>
                      </div>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
              <div>
                <div className="text-[24px]">3</div>
                <div className="flex items-center justify-center gap-2 text-[10px] tracking-[0.3em] text-black/60 uppercase">
                  <Image
                    src="/icons/review.svg"
                    alt="Review"
                    width={16}
                    height={16}
                  />
                  Review
                </div>
              </div>
              <div>
                <div className="text-[24px]">1K</div>
                <div className="flex items-center justify-center gap-2 text-[10px] tracking-[0.3em] text-black/60 uppercase">
                  <Image
                    src="/icons/follow.svg"
                    alt="Follow"
                    width={16}
                    height={16}
                  />
                  Followers
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-6">
              <Button
                variant="default"
                className="h-12 rounded-none border border-black px-16"
              >
                Follow <UserPlus />
              </Button>
              <Button
                variant="outline"
                className="h-12 rounded-none border border-black bg-transparent px-16"
              >
                Visit Website <ExternalLink />
              </Button>
            </div>
          </div>
        </section>

        <section className="px-4 pb-16 md:px-10">
          <div className="text-accent-foreground mb-8 text-center text-[32px] leading-[14.73px] font-normal tracking-[1.17px]">
            Reviews
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {reviews.map((review, index) => (
              <ReviewCard
                key={`${review.name}-${index}`}
                {...review}
                index={index}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
