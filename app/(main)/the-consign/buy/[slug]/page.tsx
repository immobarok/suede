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

          {/* Seller Section - Matches The Collective aesthetic */}
          <AnimatedItem className="mb-8">
            <p className="font-darker text-[12px] uppercase tracking-[0.2em] text-[#1A1A1A] mb-6 font-semibold">Seller Profile</p>
            <div className="bg-white p-6 border border-[#E7E4DF] rounded-none shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
              {/* Header: Avatar and Name */}
              <div className="flex items-center gap-3 mb-6">
                <div className="relative h-12 w-12 overflow-hidden rounded-full">
                  <Image
                    src={product.seller.avatarUrl}
                    alt={product.seller.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-darker text-[16px] font-medium leading-none text-[#1A1A1A]">
                    {product.seller.name}{" "}
                    <span className="font-normal text-[#8A8A82] ml-1 italic">
                      {product.measurements.height}/{product.measurements.bust}/{product.measurements.waist}/{product.measurements.hips}
                    </span>
                  </h3>
                  <p className="font-darker text-[14px] text-[#8A8A82] lowercase">
                    {product.seller.username}
                  </p>
                </div>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-4 mb-6 border-b border-[#F0EFEA] pb-6">
                <div className="text-center">
                  <p className="font-darker text-[10px] uppercase tracking-[0.15em] text-[#8A8A82] mb-1">
                    Reviews
                  </p>
                  <p className="font-darker text-[16px] font-medium text-[#1A1A1A]">
                    1
                  </p>
                </div>
                <div className="text-center">
                  <p className="font-darker text-[10px] uppercase tracking-[0.15em] text-[#8A8A82] mb-1">
                    Inquiries
                  </p>
                  <p className="font-darker text-[16px] font-medium text-[#1A1A1A]">
                    0
                  </p>
                </div>
                <div className="text-center">
                  <p className="font-darker text-[10px] uppercase tracking-[0.15em] text-[#8A8A82] mb-1">
                    Capsule Brands
                  </p>
                  <p className="font-darker text-[16px] font-medium text-[#1A1A1A]">
                    1
                  </p>
                </div>
              </div>

              {/* Measurement Preview */}
              <div className="grid grid-cols-4 gap-2 mb-6">
                <div className="text-center">
                  <p className="font-darker text-[10px] uppercase tracking-[0.1em] text-[#8A8A82] mb-1">Ht</p>
                  <p className="font-darker text-[13px] font-medium text-[#1A1A1A]">{product.measurements.height}</p>
                </div>
                <div className="text-center">
                  <p className="font-darker text-[10px] uppercase tracking-[0.1em] text-[#8A8A82] mb-1">Bust</p>
                  <p className="font-darker text-[13px] font-medium text-[#1A1A1A]">{product.measurements.bust}</p>
                </div>
                <div className="text-center">
                  <p className="font-darker text-[10px] uppercase tracking-[0.1em] text-[#8A8A82] mb-1">Waist</p>
                  <p className="font-darker text-[13px] font-medium text-[#1A1A1A]">{product.measurements.waist}</p>
                </div>
                <div className="text-center">
                  <p className="font-darker text-[10px] uppercase tracking-[0.1em] text-[#8A8A82] mb-1">Hips</p>
                  <p className="font-darker text-[13px] font-medium text-[#1A1A1A]">{product.measurements.hips}</p>
                </div>
              </div>

              <button className="w-full border border-[#E7E4DF] text-[#1A1A1A] font-darker text-[13px] font-medium py-2.5 rounded-none transition-colors hover:bg-[#F9F8F6]">
                View Profile
              </button>
            </div>
          </AnimatedItem>

          {/* Action Buttons */}
          <AnimatedItem className="space-y-3 mb-8">
            <AnimatedButton className="w-full bg-primary hover:bg-[#3d0b13] cursor-pointer text-white font-darker py-4 text-[16px] font-medium transition-colors tracking-wide">
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
