import { BrandCard } from "./brandcard";


const brands = [
  {
    name: "Ìtẹ́fé",
    category: "Womenswear",
    location: "Brooklyn, NY",
    description:
      "Founded by Aya Okonkwo, blending West African textiles with modern silhouettes.",
    rating: 4.8,
    ethics: 5,
    reviews: 234,
    followers: "12.4k",
    image: "https://i.ibb.co.com/5hg3KYZX/Frame-71.png",
  },
  {
    name: "BBX Brand",
    category: "Unisex Streetwear",
    location: "Los Angeles, CA",
    description:
      "Minimalist streetwear with an on ethical manufacturing and inclusivity.",
    rating: 4.8,
    ethics: 5,
    reviews: 234,
    followers: "12.4k",
    image: "https://i.ibb.co.com/JwVRNzYy/Frame-74.png",
  },
  {
    name: "Meji Meji",
    category: "Accessories",
    location: "Atlanta, GA",
    description:
      "Handcrafted jewelry and accessories celebrating Black artisan traditions.",
    rating: 4.8,
    ethics: 5,
    reviews: 234,
    followers: "12.4k",
    image: "https://i.ibb.co.com/BkZwhcY/Frame-70.png",
  },
];

export function BrandCardGrid() {
  return (
    <section className="py-24 px-4 md:px-8 lg:px-16 bg-[#f5f5f0]">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {brands.map((brand, index) => (
            <BrandCard key={brand.name} {...brand} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}