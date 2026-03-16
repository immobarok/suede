import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getConsignProductBySlug } from "../../_data/products";
import { ChevronLeft, ShieldCheck, Box, Lock } from "lucide-react";
import ProductGallery from "./_components/ProductGallery";
import AnimatedContainer, { AnimatedItem, AnimatedButton } from "./_components/AnimatedContent";

type Params = Promise<{ slug: string }>;

export async function generateMetadata(props: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const product = getConsignProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The selected product does not exist.",
    };
  }

  return {
    title: `${product.productName} | Buy Now`,
    description: `Buy ${product.productName} from ${product.brandName} on The Consign.`,
  };
}

const BuyNowProductPage = async (props: { params: Params }) => {
  const { slug } = await props.params;
  const product = getConsignProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#F8F6F3] pt-4 pb-8  px-4 md:px-0">
      {/* Back Button */}
      <div className="mx-auto container pt-20 pb-6">
        <Link 
          href="/the-consign" 
          className="group flex items-center gap-2 text-[13px] text-[#8A8A82] uppercase tracking-[0.05em] transition-colors hover:text-[#1A1A1A]"
        >
          <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          Back to The Consign
        </Link>
      </div>

      <div className="mx-auto mt-2 grid container gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        
        {/* Left Column: Imagery */}
        <ProductGallery 
          mainImage={product.imageUrl} 
          thumbnails={product.thumbnails} 
          productName={product.productName} 
        />

        {/* Right Column: Content */}
        <AnimatedContainer>
          {/* Brand & Title */}
          <AnimatedItem className="mb-4">
            <p className="font-darker text-[13px] tracking-[0.14em] text-[#8A8A82] uppercase mb-1">
              {product.brandName}
            </p>
            <h1 className="font-cormorant text-[45px] leading-tight text-[#1A1A1A] font-medium tracking-tight">
              {product.productName}
            </h1>
            <div className="mt-4 flex items-baseline gap-4">
              <span className="font-darker text-[32px] text-[#1A1A1A] font-medium">
                {product.price}
              </span>
              {product.originalPrice && (
                <span className="font-darker text-xl text-[#8A8A82] line-through">
                  {product.originalPrice}
                </span>
              )}
            </div>
          </AnimatedItem>

          {/* Size & Condition */}
          <AnimatedItem className="flex border-b border-[#E7E4DF] py-4 mb-3">
            <div className="space-y-1">
              <p className="font-darker text-[11px] uppercase tracking-[0.1em] text-[#B5B5B0]">Size</p>
              <p className="font-darker text-[16px] text-[#1A1A1A] font-medium uppercase">{product.sizeLabel}</p>
            </div>
            <div className="space-y-1 border-l border-[#E7E4DF] pl-4 ml-4">
              <p className="font-darker text-[11px] uppercase tracking-[0.1em] text-[#B5B5B0]">Condition</p>
              <p className="font-darker text-[16px] text-[#1A1A1A] font-medium">{product.condition}</p>
            </div>
          </AnimatedItem>

          {/* Description */}
          <AnimatedItem className="mb-4">
            <p className="font-darker text-[12px] uppercase tracking-[0.2em] text-[#1A1A1A] mb-4 font-semibold">Description</p>
            <p className="font-darker text-[15px] leading-[1.6] text-[#4F4F4D] max-w-[500px]">
              {product.description}
            </p>
          </AnimatedItem>

          {/* Seller */}
          <AnimatedItem className="mb-4">
             <p className="font-darker text-[12px] uppercase tracking-[0.2em] text-[#1A1A1A] mb-4 font-semibold">Seller</p>
             <div className="flex items-center justify-between border border-[#E7E4DF] p-5 rounded-sm">
                <div className="flex items-center gap-4">
                    <div className="relative h-12 w-12 rounded-full overflow-hidden">
                        <Image src={product.seller.avatarUrl} alt={product.seller.name} fill className="object-cover" />
                    </div>
                    <div>
                        <p className="font-darker text-[15px] text-[#1A1A1A] font-medium">{product.seller.name}</p>
                        <p className="font-darker text-[13px] text-[#8A8A82]">{product.seller.username}</p>
                    </div>
                </div>
                <button className="font-darker text-[12px] px-6 py-2 border border-[#E7E4DF] rounded-sm text-[#1A1A1A] font-medium hover:bg-[#F8F8F8] transition-colors">
                    View Profile
                </button>
             </div>
          </AnimatedItem>

          {/* Measurements */}
          <AnimatedItem className="mb-6">
             <p className="font-darker text-[12px] uppercase tracking-[0.2em] text-[#1A1A1A] mb-6 font-semibold">Measurements</p>
             <div className="grid grid-cols-2 gap-x-12 gap-y-2">
                <div className="flex justify-between border-b border-[#E7E4DF] pb-3">
                    <span className="font-darker text-[14px] text-[#8A8A82]">Height</span>
                    <span className="font-darker text-[14px] text-[#1A1A1A] font-medium">{product.measurements.height}</span>
                </div>
                <div className="flex justify-between border-b border-[#E7E4DF] pb-3">
                    <span className="font-darker text-[14px] text-[#8A8A82]">Bust</span>
                    <span className="font-darker text-[14px] text-[#1A1A1A] font-medium">{product.measurements.bust}</span>
                </div>
                <div className="flex justify-between border-b border-[#E7E4DF] pb-3">
                    <span className="font-darker text-[14px] text-[#8A8A82]">Waist</span>
                    <span className="font-darker text-[14px] text-[#1A1A1A] font-medium">{product.measurements.waist}</span>
                </div>
                <div className="flex justify-between border-b border-[#E7E4DF] pb-3">
                    <span className="font-darker text-[14px] text-[#8A8A82]">Hips</span>
                    <span className="font-darker text-[14px] text-[#1A1A1A] font-medium">{product.measurements.hips}</span>
                </div>
             </div>
          </AnimatedItem>

          {/* Action Buttons */}
          <AnimatedItem className="space-y-3 mb-8">
            <AnimatedButton className="w-full bg-primary hover:bg-primary/90 cursor-pointer text-white font-darker py-4 text-[16px] font-medium transition-colors tracking-wide">
              Buy Now - {product.price}
            </AnimatedButton>
            <AnimatedButton className="w-full bg-[#F8F8F8] hover:bg-[#F0F0F0] border border-[#E7E4DF] text-[#1A1A1A] font-darker py-4 text-[16px] font-medium transition-colors tracking-wide cursor-pointer">
              Make an Offer
            </AnimatedButton>
          </AnimatedItem>

          {/* Features */}
          <AnimatedItem className="grid grid-cols-3 gap-4">
            <div className="bg-[#F8F8F8] border border-[#E7E4DF] p-4 flex flex-col items-center justify-center text-center">
              <ShieldCheck className="h-6 w-6 text-[#A47E60] mb-2" strokeWidth={1.5} />
              <p className="font-darker text-[11px] text-[#8A8A82] uppercase tracking-wider font-medium">Buyer Protection</p>
            </div>
            <div className="bg-[#F8F8F8] border border-[#E7E4DF] p-4 flex flex-col items-center justify-center text-center">
              <Box className="h-6 w-6 text-[#A47E60] mb-2" strokeWidth={1.5} />
              <p className="font-darker text-[11px] text-[#8A8A82] uppercase tracking-wider font-medium">3 Days Inspection</p>
            </div>
            <div className="bg-[#F8F8F8] border border-[#E7E4DF] p-4 flex flex-col items-center justify-center text-center">
              <Lock className="h-6 w-6 text-[#A47E60] mb-2" strokeWidth={1.5} />
              <p className="font-darker text-[11px] text-[#8A8A82] uppercase tracking-wider font-medium">Secure Escrow</p>
            </div>
          </AnimatedItem>
        </AnimatedContainer>
      </div>
    </main>
  );
};

export default BuyNowProductPage;
