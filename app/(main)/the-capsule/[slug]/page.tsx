import Image from "next/image";
import { ReviewCard } from "./_components/ReviewCard";
import { ArrowLeft, ExternalLink, SquareArrowOutUpRight, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

const reviews = [
  {
    name: "Kikiola Akanbi",
    handle: "@kikiolaakanbi",
    title: "Flowy Dress",
    size: "6",
    rating: 4.5,
    avatar: "https://i.ibb.co.com/3mKz4rNX/Rectangle-13.png",
    image: "https://i.ibb.co.com/3mKz4rNX/Rectangle-13.png",
    excerpt:
      "The perfect baby tee! Great quality. Does not lose form throughout the day. And the fit...",
  },
  {
    name: "Kikiola Akanbi",
    handle: "@kikiolaakanbi",
    title: "Flowy Dress",
    size: "6",
    rating: 4.5,
    avatar: "https://i.ibb.co.com/3mKz4rNX/Rectangle-13.png",
    image: "https://i.ibb.co.com/3mKz4rNX/Rectangle-13.png",
    excerpt:
      "The perfect baby tee! Great quality. Does not lose form throughout the day. And the fit...",
  },
];

export default function CapsuleBrandPage() {
  return (
    <main className="relative overflow-hidden py-16">
      <Image
        src="https://i.ibb.co.com/nsvQbBSQ/41ddd7debba1acf170f27b180927b8514ffaebd3.jpg"
        alt="Background"
        fill
        className="object-cover opacity-25 grayscale"
        priority
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/20 to-white/10" />

      <div className="relative z-10 container mx-auto">
        <section className="px-4 pt-12 pb-10 md:px-0">
          <div className="mb-4 text-[11px] uppercase  text-black/60 flex items-center gap-2 hover:text-black/80 cursor-pointer">
            <ArrowLeft className="w-4 h-4"/> Back to Lookbook
          </div>

          <div className="overflow-hidden border border-black/10 bg-black/20">
            <div className="relative aspect-[16/7] w-full">
              <Image
                src="https://i.ibb.co.com/zhJPWP40/Frame-70-1.png"
                alt="Nadi"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute left-10 bottom-10 text-white">
                <div className="text-[30px]">NADI</div>
                <div className="text-[12px] text-[#C6C5C2]">Womenswear Brooklyn, NY</div>
                 <div className="text-[14px] text-[#C6C5C2] pt-3.5">
                Founded by Aya Okonkwo, blending West African textiles with modern silhouettes.
              </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 pb-8 md:px-10 max-w-2xl mx-auto">
          <div className="grid gap-6 pb-8">
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-[24px]">5.0</div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-black/60 flex gap-2 items-center justify-center">
                <Image src="/icons/rating.svg" alt="Rating" width={16} height={16} />
                Rating</div>
              </div>
                <div>
                <div className="text-[24px]">3</div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-black/60 flex gap-2 items-center justify-center">
                <Image src="/icons/review.svg" alt="Review" width={16} height={16} />
                Review</div>
              </div>
              <div>
                <div className="text-[24px]">1K</div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-black/60 flex gap-2 items-center justify-center">
                <Image src="/icons/follow.svg" alt="Follow" width={16} height={16} />
                Followers</div>
              </div>
            </div>
            <div className="flex gap-6 items-center justify-center">
              <Button variant="default" className="rounded-none px-16 h-12 border border-black">
                Follow <UserPlus />
              </Button>
              <Button variant="outline" className="rounded-none bg-transparent border border-black px-16 h-12">
                Visit Website <ExternalLink />
              </Button>
            </div>
          </div>
        </section>

        <section className="px-4 pb-16 md:px-10">
          <div className="mb-8 text-center text-[32px] font-normal leading-[14.73px] tracking-[1.17px] text-accent-foreground">
            Reviews
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {reviews.map((review, index) => (
              <ReviewCard key={`${review.name}-${index}`} {...review} index={index} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
