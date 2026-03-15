import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getConsignProductBySlug } from "../../_data/products";

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
    <main className="min-h-[70vh] bg-[#F5F5F0] px-4 py-24">
      <div className="mx-auto grid max-w-4xl gap-6 rounded-sm border border-[#E7E4DF] bg-white p-6 md:grid-cols-2 md:p-8">
        <div className="relative aspect-4/5 overflow-hidden bg-[#F7F6F4]">
          <Image
            src={product.imageUrl}
            alt={product.productName}
            fill
            className="object-cover"
          />
        </div>

        <div className="space-y-5">
          <p className="font-darker text-sm tracking-[0.14em] text-[#8A8A82] uppercase">
            {product.brandName}
          </p>
          <h1 className="font-darker text-3xl text-[#1A1A1A]">
            {product.productName}
          </h1>

          <div className="flex items-center gap-3">
            <span className="font-darker text-2xl text-[#1A1A1A]">
              {product.price}
            </span>
            {product.originalPrice && (
              <span className="font-darker text-lg text-[#8A8A82] line-through">
                {product.originalPrice}
              </span>
            )}
          </div>

          <p className="font-darker text-base text-[#4F4F4D]">
            {product.sizeLabel}
          </p>

          <p className="font-darker text-base text-[#4F4F4D]">
            You are purchasing the exact product you selected.
          </p>

          <Link
            href="/the-consign"
            className="bg-primary font-darker hover:bg-primary/90 inline-flex h-11 items-center px-6 text-sm tracking-[0.06em] text-white transition-colors"
          >
            Back to The Consign
          </Link>
        </div>
      </div>
    </main>
  );
};

export default BuyNowProductPage;
