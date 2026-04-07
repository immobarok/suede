import type { Metadata } from "next";
import Image from "next/image";
import { Star, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const metadata: Metadata = {
  title: "Submit a Review | SUEDE",
  description:
    "Share how clothing fits on your body and help others shop with confidence.",
};

const ratingRows = [
  "Sizing Accuracy",
  "Material Quality",
  "Value for Price",
  "True to Photos",
  "Customer Service",
];

const sizes = ["XS", "S", "M", "L", "XL", "XXL", "2XL", "3XL"];

export default function SubmitReviewPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F5F5F0]">
      <Image
        src="https://i.ibb.co/nsvQbBSQ/41ddd7debba1acf170f27b180927b8514ffaebd3.jpg"
        alt="Background"
        fill
        className="object-cover opacity-20 grayscale"
        priority
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/40 to-white/10" />

      <div className="relative z-10 container mx-auto px-4 md:px-0 pt-24 pb-20">
        <div className="mb-10 text-center">
          <h1 className="font-cormorant text-[38px] md:text-[46px] text-black">
            Submit a Review
          </h1>
          <p className="mt-2 text-[14px] text-black/50">
            Share how clothing fits on your body and help others shop with
            confidence.
          </p>
        </div>

        <div className="space-y-6">
          {/* Brand Information */}
          <section className="rounded-none border border-black/10 bg-white p-8 shadow-sm">
            <h2 className="font-cormorant text-[22px] text-black">
              Brand Information
            </h2>
            <p className="mt-1 text-[12px] text-black/40">Select Brand</p>
            <div className="mt-4">
              <Input
                placeholder="Search or select a brand"
                className="h-12 rounded-none border-black/10 bg-[#F9F9F9]"
              />
            </div>
          </section>

          {/* Product Information */}
          <section className="rounded-none border border-black/10 bg-white p-8 shadow-sm">
            <h2 className="font-cormorant text-[22px] text-black">
              Product Information
            </h2>
            <p className="mt-1 text-[12px] text-black/40">
              Paste the product link
            </p>
            <div className="mt-4 flex flex-col gap-3 md:flex-row">
              <Input
                placeholder="https://example.com/product"
                className="h-12 flex-1 rounded-none border-black/10 bg-[#F9F9F9]"
              />
              <Button className="h-12 rounded-none bg-black px-8 text-[12px] uppercase tracking-wider text-white hover:bg-black/90">
                Fetch
              </Button>
            </div>
          </section>

          {/* Ratings */}
          <section className="rounded-none border border-black/10 bg-white p-8 shadow-sm">
            <h2 className="font-cormorant text-[22px] text-black">
              Rate This Product
            </h2>
            <div className="mt-4 space-y-4">
              {ratingRows.map((row) => (
                <div key={row} className="flex items-center justify-between">
                  <span className="text-[13px] text-black/60">{row}</span>
                  <div className="flex items-center gap-1 text-black/30">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star key={index} className="h-4 w-4" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Size Purchased */}
          <section className="rounded-none border border-black/10 bg-white p-8 shadow-sm">
            <h2 className="font-cormorant text-[22px] text-black">
              Size Purchased
            </h2>
            <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
              {sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  className="h-12 rounded-none border border-black/10 bg-white text-[12px] uppercase tracking-wider text-black/60 hover:border-black/40 hover:text-black"
                >
                  {size}
                </button>
              ))}
            </div>
          </section>

          {/* Photos & Videos */}
          <section className="rounded-none border border-black/10 bg-white p-8 shadow-sm">
            <h2 className="font-cormorant text-[22px] text-black">
              Add Photos & Videos
            </h2>
            <p className="mt-1 text-[12px] text-black/40">
              Up to 5 photos • Up to 2 videos • Video max length 60 seconds
            </p>
            <div className="mt-4 flex h-40 items-center justify-center rounded-none border border-dashed border-black/20 bg-[#F9F9F9]">
              <div className="flex flex-col items-center gap-2 text-black/40">
                <Upload className="h-5 w-5" />
                <span className="text-[12px]">
                  Drag and drop or browse files
                </span>
              </div>
            </div>
          </section>

          {/* Review */}
          <section className="rounded-none border border-black/10 bg-white p-8 shadow-sm">
            <h2 className="font-cormorant text-[22px] text-black">
              Your Review
            </h2>
            <p className="mt-1 text-[12px] text-black/40">
              Tell the community how this item fits on your body.
            </p>
            <textarea
              rows={6}
              placeholder="Write your review..."
              className="mt-4 w-full rounded-none border border-black/10 bg-[#F9F9F9] p-4 text-[14px] focus:border-black/30 focus:outline-none"
            />
            <p className="mt-2 text-[10px] text-black/40">0 / 500 characters</p>
          </section>

          {/* Recommend */}
          <section className="rounded-none border border-black/10 bg-white p-8 shadow-sm">
            <h2 className="font-cormorant text-[22px] text-black">
              Would you recommend this item?
            </h2>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <button
                type="button"
                className="h-12 rounded-none border border-black/10 bg-white text-[12px] uppercase tracking-wider text-black/60 hover:border-black/40 hover:text-black"
              >
                Yes
              </button>
              <button
                type="button"
                className="h-12 rounded-none border border-black/10 bg-white text-[12px] uppercase tracking-wider text-black/60 hover:border-black/40 hover:text-black"
              >
                No
              </button>
            </div>
          </section>

          {/* Measurements */}
          <section className="rounded-none border border-black/10 bg-white p-8 shadow-sm">
            <h2 className="font-cormorant text-[22px] text-black">
              Your Measurements
            </h2>
            <p className="mt-1 text-[12px] text-black/40">
              These measurements will be shown with your review.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
              {[
                { label: "Height", value: "5'6\"" },
                { label: "Bust", value: "34\"" },
                { label: "Waist", value: "26\"" },
                { label: "Hips", value: "36\"" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col items-center justify-center rounded-none bg-black/5 py-4 text-center"
                >
                  <span className="text-[11px] uppercase tracking-wider text-black/50">
                    {item.label}
                  </span>
                  <span className="text-[14px] font-medium text-black">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <div className="flex items-center justify-end">
            <Button className="h-12 w-full rounded-none bg-black text-[12px] uppercase tracking-[0.3em] text-white hover:bg-black/90 md:w-auto md:px-16">
              Submit Review
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
