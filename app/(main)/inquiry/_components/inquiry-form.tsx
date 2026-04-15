"use client";

import Image from "next/image";
import { RippleButton } from "@/components/ui/ripple-button";
import { Input } from "@/components/ui/input";
import { useState, useTransition } from "react";
import { submitInquiry } from "@/app/actions/inquiry";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const alphaSizes = ["XXS", "XS", "S", "M", "L", "XL", "XXL", "3XL"];
const numericSizes = ["0", "2", "4", "6", "8", "10", "12", "14", "16", "18", "20", "22", "24"];

export default function InquiryForm() {
    const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
    const [productUrl, setProductUrl] = useState("");
    const [specificQuestions, setSpecificQuestions] = useState("");
    const [productName, setProductName] = useState("");
    const [brandName, setBrandName] = useState("");
    const [productImageUrl, setProductImageUrl] = useState("");
    const [isFetching, setIsFetching] = useState(false);
    const [isPending, startTransition] = useTransition();

    const toggleSize = (size: string) => {
        setSelectedSizes((prev) =>
            prev.includes(size)
                ? prev.filter((s) => s !== size)
                : [...prev, size]
        );
    };

    const handleFetch = async () => {
        if (!productUrl) return;
        setIsFetching(true);
        try {
            const { fetchProductMetadata } = await import("@/app/actions/inquiry");
            const result = await fetchProductMetadata(productUrl);
            
            if (result.success) {
                setProductName(result.productName || "");
                setBrandName(result.brandName || "");
                setProductImageUrl(result.productImageUrl || "");
                toast.success("Product information fetched!");
            } else {
                toast.error(result.error || "Failed to fetch product information.");
            }
        } catch (err) {
            toast.error("An error occurred while fetching product info.");
        } finally {
            setIsFetching(false);
        }
    };

    const handleSubmit = async () => {
        if (!productUrl || selectedSizes.length === 0 || !specificQuestions) {
            toast.error("Please fill in all required fields.");
            return;
        }

        startTransition(async () => {
            const result = await submitInquiry({
                productUrl,
                selectedSizes,
                specificQuestions,
                productName: productName || "Pending Product",
                brandName: brandName || "Unknown Brand",
                productImageUrl,
            });

            if (result.success) {
                toast.success("Inquiry submitted successfully!");
                // Reset form
                setProductUrl("");
                setSelectedSizes([]);
                setSpecificQuestions("");
                setProductName("");
                setBrandName("");
                setProductImageUrl("");
            } else {
                toast.error(result.error || "Failed to submit inquiry.");
            }
        });
    };

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

            <div className="relative z-10 container mx-auto px-4 md:px-0 pt-24 pb-20 max-w-5xl">
                <div className="mb-10 text-center">
                    <h1 className="font-cormorant text-[38px] md:text-[46px] text-black">
                        Submit an Inquiry
                    </h1>
                    <p className="mt-2 text-[14px] text-black/50 max-w-lg mx-auto leading-relaxed">
                        Looking for fit intel before you buy? Post a request and get notified when
                        someone reviews the item in your size.
                    </p>
                </div>

                <div className="space-y-6">
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
                                value={productUrl}
                                onChange={(e) => setProductUrl(e.target.value)}
                                className="h-12 flex-1 rounded-none border-black/10 bg-[#F9F9F9]"
                            />
                            <RippleButton 
                                onClick={handleFetch}
                                disabled={isFetching || !productUrl}
                                className="h-12 rounded-none bg-black px-8 text-[12px] uppercase tracking-wider text-white hover:bg-black/90"
                            >
                                {isFetching ? <Loader2 className="animate-spin h-4 w-4" /> : "Fetch"}
                            </RippleButton>
                        </div>
                        {productName && (
                            <div className="mt-6 flex items-start gap-4 p-4 border border-black/5 bg-black/[0.02]">
                                {productImageUrl && (
                                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden border border-black/5 bg-white">
                                        <Image
                                            src={productImageUrl}
                                            alt={productName}
                                            fill
                                            className="object-contain p-1"
                                            unoptimized
                                        />
                                    </div>
                                )}
                                <div className="flex flex-col gap-0.5">
                                    <span className="text-[10px] uppercase tracking-wider text-black/40">
                                        {brandName || "Unknown Brand"}
                                    </span>
                                    <h3 className="font-cormorant text-lg leading-tight text-black">
                                        {productName}
                                    </h3>
                                    <a 
                                        href={productUrl} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="mt-1 text-[11px] text-black/30 hover:text-black transition-colors line-clamp-1"
                                    >
                                        {productUrl}
                                    </a>
                                </div>
                            </div>
                        )}
                    </section>

                    {/* What Sizes are you interested in? */}
                    <section className="rounded-none border border-black/10 bg-white p-8 shadow-sm">
                        <h2 className="font-cormorant text-[22px] text-black">
                            What Sizes are you interested in? (US sizing)
                        </h2>
                        <div className="mt-6 space-y-4">
                            <div className="grid grid-cols-4 gap-3 md:grid-cols-8">
                                {alphaSizes.map((size) => (
                                    <button
                                        key={size}
                                        type="button"
                                        onClick={() => toggleSize(size)}
                                        className={`h-12 rounded-none border text-[12px] uppercase tracking-wider transition-colors ${
                                            selectedSizes.includes(size)
                                                ? "border-black bg-black text-white"
                                                : "border-black/10 bg-white text-black/60 hover:border-black/40 hover:text-black"
                                        }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                            <div className="grid grid-cols-4 gap-3 md:grid-cols-8">
                                {numericSizes.map((size) => (
                                    <button
                                        key={size}
                                        type="button"
                                        onClick={() => toggleSize(size)}
                                        className={`h-12 rounded-none border text-[12px] uppercase tracking-wider transition-colors ${
                                            selectedSizes.includes(size)
                                                ? "border-black bg-black text-white"
                                                : "border-black/10 bg-white text-black/60 hover:border-black/40 hover:text-black"
                                        }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Tell us more about your inquiry */}
                    <section className="rounded-none border border-black/10 bg-white p-8 shadow-sm">
                        <h2 className="font-cormorant text-[22px] text-black">
                            Tell us more about your inquiry
                        </h2>
                        <textarea
                            rows={6}
                            value={specificQuestions}
                            onChange={(e) => setSpecificQuestions(e.target.value)}
                            placeholder=".g., Planning to wear this to a wedding — need to know if it's flattering on curvy body types!"
                            className="mt-4 w-full rounded-none border border-black/10 bg-[#F9F9F9] p-4 text-[14px] focus:border-black/30 focus:outline-none"
                        />
                        <p className="mt-2 text-[10px] text-black/40">{specificQuestions.length} / 500 characters</p>
                    </section>

                    <RippleButton 
                        onClick={handleSubmit}
                        disabled={isPending}
                        className="h-14 w-full rounded-none bg-black text-[12px] uppercase tracking-[0.3em] text-white hover:bg-black/90"
                    >
                        {isPending ? <Loader2 className="animate-spin h-5 w-5" /> : "Submit Inquiry"}
                    </RippleButton>
                </div>
            </div>
        </main>
    );
}
