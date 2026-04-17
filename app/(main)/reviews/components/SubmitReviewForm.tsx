"use client";

import { useState, useEffect } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useQueryModal } from "@/hooks/use-query-modal";

const ratingRows = [
  "Sizing Accuracy",
  "Material Quality",
  "Value for Price",
  "True to Photos",
  "Customer Service",
];

const sizes = ["XS", "S", "M", "L", "XL", "XXL", "2XL", "3XL"];

export default function SubmitReviewForm() {
  const searchExistingMode = useQueryModal("productMode", "search-existing");
  const pasteUrlMode = useQueryModal("productMode", "paste-url");
  const enterManuallyMode = useQueryModal("productMode", "enter-manually");

  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [hovered, setHovered] = useState<Record<string, number>>({});
  const [measurements, setMeasurements] = useState<
    { label: string; value: string }[]
  >([]);
  const [loadingMeasurements, setLoadingMeasurements] = useState(true);
  const [hideMeasurements, setHideMeasurements] = useState(false);

  useEffect(() => {
    async function fetchMeasurements() {
      try {
        const response = await fetch("/api/user/measurements");
        if (response.ok) {
          const data = await response.json();
          setMeasurements(data);
        } else {
          console.error("Failed to fetch measurements");
        }
      } catch (error) {
        console.error("Error fetching measurements:", error);
      } finally {
        setLoadingMeasurements(false);
      }
    }

    fetchMeasurements();
  }, []);

  return (
    <div className="relative z-10 container mx-auto px-4 pt-24 pb-20 md:px-0">
      <div className="mb-10 text-center">
        <h1 className="font-cormorant text-[38px] text-black md:text-[46px]">
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
          <div className="mt-4 flex flex-wrap gap-3 my-6">
            <button
              type="button"
              onClick={searchExistingMode.open}
              className={`h-10 px-4 text-[12px] tracking-wider uppercase transition-colors ${
                searchExistingMode.isOpen
                  ? "bg-black text-white"
                  : "bg-[rgba(0,0,0,0.15)] text-black"
              }`}
            >
              Search Existing
            </button>
            <button
              type="button"
              onClick={pasteUrlMode.open}
              className={`h-10 px-4 text-[12px] tracking-wider uppercase transition-colors ${
                pasteUrlMode.isOpen
                  ? "bg-black text-white"
                  : "bg-[rgba(0,0,0,0.15)] text-black"
              }`}
            >
              Paste Url
            </button>
            <button
              type="button"
              onClick={enterManuallyMode.open}
              className={`h-10 px-4 text-[12px] tracking-wider uppercase transition-colors ${
                enterManuallyMode.isOpen
                  ? "bg-black text-white"
                  : "bg-[rgba(0,0,0,0.15)] text-black"
              }`}
            >
              Enter Manually
            </button>
          </div>
          <p className="mt-1 text-[12px] text-black/40">
            Paste the product link
          </p>
          {enterManuallyMode.isOpen && (
            <div className="mt-4">
              <Input
                placeholder="Product name"
                className="h-12 rounded-none border-black/10 bg-[#F9F9F9]"
              />
            </div>
          )}
          <div className="mt-4 flex flex-col gap-3 md:flex-row">
            <Input
              placeholder="https://example.com/product"
              className="h-12 flex-1 rounded-none border-black/10 bg-[#F9F9F9]"
            />
            {pasteUrlMode.isOpen && (
              <Button className="h-12 rounded-none bg-black px-8 text-[12px] tracking-wider text-white uppercase hover:bg-black/90">
                Fetch
              </Button>
            )}
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
                <div
                  className="flex items-center gap-1"
                  onMouseLeave={() =>
                    setHovered((prev) => ({ ...prev, [row]: 0 }))
                  }
                >
                  {Array.from({ length: 5 }).map((_, index) => {
                    const isFilled =
                      (hovered[row] || 0) > index ||
                      (ratings[row] || 0) > index;
                    return (
                      <svg
                        key={index}
                        className={`h-4 w-4 cursor-pointer ${
                          isFilled ? "text-yellow-500" : "text-black/30"
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="15"
                        viewBox="0 0 16 15"
                        fill="currentColor"
                        onMouseEnter={() =>
                          setHovered((prev) => ({
                            ...prev,
                            [row]: index + 1,
                          }))
                        }
                        onClick={() =>
                          setRatings((prev) => ({
                            ...prev,
                            [row]: index + 1,
                          }))
                        }
                      >
                        <path d="M7.60938 0L9.40549 5.52786H15.2178L10.5155 8.94427L12.3117 14.4721L7.60938 11.0557L2.90709 14.4721L4.70321 8.94427L0.00092268 5.52786H5.81326L7.60938 0Z" />
                      </svg>
                    );
                  })}
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
                className="h-12 rounded-none border border-black/10 bg-white text-[12px] tracking-wider text-black/60 uppercase hover:border-black/40 hover:text-black"
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
              <span className="text-[12px]">Drag and drop or browse files</span>
            </div>
          </div>
        </section>

        {/* Review */}
        <section className="rounded-none border border-black/10 bg-white p-8 shadow-sm">
          <h2 className="font-cormorant text-[22px] text-black">Your Review</h2>
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
              className="h-12 rounded-none border border-black/10 bg-white text-[12px] tracking-wider text-black/60 uppercase hover:border-black/40 hover:text-black"
            >
              Yes
            </button>
            <button
              type="button"
              className="h-12 rounded-none border border-black/10 bg-white text-[12px] tracking-wider text-black/60 uppercase hover:border-black/40 hover:text-black"
            >
              No
            </button>
          </div>
        </section>

        {/* Measurements */}
        <section className="rounded-none border border-black/10 bg-white p-8 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="font-cormorant text-[22px] text-black">
                Your Measurements
              </h2>
              <p className="mt-1 text-[12px] text-black/40">
                These measurements will be shown with your review.
              </p>
            </div>
            <div className="flex items-center">
              <span className="mr-2 text-[12px] text-black/40">
                Hide your measurement from other users
              </span>
              <Switch
                size="default"
                checked={hideMeasurements}
                onCheckedChange={setHideMeasurements}
              />
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
            {loadingMeasurements ? (
              <div className="col-span-full flex items-center justify-center py-4">
                <span className="text-[12px] text-black/40">
                  Loading measurements...
                </span>
              </div>
            ) : hideMeasurements ? (
              <div className="col-span-full flex items-center justify-center py-4">
                <span className="text-[12px] text-black/40">
                  Measurements will be hidden from other users
                </span>
              </div>
            ) : measurements.length > 0 ? (
              measurements.map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col items-center justify-center rounded-none bg-black/5 py-4 text-center"
                >
                  <span className="text-[11px] tracking-wider text-black/50 uppercase">
                    {item.label}
                  </span>
                  <span className="text-[14px] font-medium text-black">
                    {item.value}
                  </span>
                </div>
              ))
            ) : (
              <div className="col-span-full flex items-center justify-center py-4">
                <span className="text-[12px] text-black/40">
                  No measurements available
                </span>
              </div>
            )}
          </div>
        </section>

        <div className="flex items-center justify-end">
          <Button className="h-12 w-full rounded-none bg-black text-[12px] tracking-[0.3em] text-white uppercase hover:bg-black/90 md:w-auto md:px-16">
            Submit Review
          </Button>
        </div>
      </div>
    </div>
  );
}
