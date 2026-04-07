import { BrandCard } from "./brandcard";

const brands = [
  {
    slug: "nadi-by-dani",
    name: "Nadi by Dani",
    category: "Womenswear",
    location: "Brooklyn, NY",
    description:
      "Designed for women Who value quality.expression, NADI is notabout fashion Of fleeting trends.",
    rating: 4.8,
    ethics: 5,
    reviews: 234,
    followers: "12.4k",
    image:
      "https://i.ibb.co/6kg0xWX/1588ceeb46301bd3aee45e9f938f00d7c8cb966c.png",
  },
  {
    slug: "hanifa",
    name: "Hanifa",
    category: "Womenswear",
    location: "Los Angeles, CA",
    description:
      "Designed for women Who value quality.expression, NADI is notabout fashion Of fleeting trends.",
    rating: 4.8,
    ethics: 5,
    reviews: 234,
    followers: "12.4k",
    image:
      "https://i.ibb.co/bj3Q0gYj/image-43.png",
  },
  {
    slug: "bbx-brand",
    name: "BBX Brand",
    category: "Womenswear",
    location: "New York, NY",
    description:
      "Designed for women Who value quality.expression, NADI is notabout fashion Of fleeting trends.",
    rating: 4.8,
    ethics: 5,
    reviews: 234,
    followers: "12.4k",
    image: "https://i.ibb.co/RwFxkcQ/image-45.png",
  },
  {
    slug: "cou-coo",
    name: "Cou Coo",
    category: "Womenswear",
    location: "Atlanta, GA",
    description:
      "Designed for women Who value quality.expression, NADI is notabout fashion Of fleeting trends.",
    rating: 4.8,
    ethics: 5,
    reviews: 234,
    followers: "12.4k",
    image: "https://i.ibb.co/XfYvFtXG/image-42.png",
  },
  {
    slug: "cais-collective",
    name: "Cai’s Collective",
    category: "Womenswear",
    location: "Chicago, IL",
    description:
      "Designed for women Who value quality.expression, NADI is notabout fashion Of fleeting trends.",
    rating: 4.8,
    ethics: 5,
    reviews: 234,
    followers: "12.4k",
    image: "https://i.ibb.co/DgmCrjCv/630dcef786cdfbe83bd6b096aea91afcdadf271a.png",
  },
  {
    slug: "cais-collective-2",
    name: "Cai’s Collective",
    category: "Womenswear",
    location: "Chicago, IL",
    description:
      "Designed for women Who value quality.expression, NADI is notabout fashion Of fleeting trends.",
    rating: 4.8,
    ethics: 5,
    reviews: 234,
    followers: "12.4k",
    image: "https://i.ibb.co/vCBRyFQd/c46b97c48bbaecc3dbdaabe604d42fd16ca7f99a.png",
  },
];

export function BrandCardGrid() {
  return (
    <section className="px-4 py-24 md:px-0">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {brands.map((brand, index) => (
            <BrandCard key={`${brand.name}-${index}`} {...brand} index={index} />
          ))}
        </div>

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
          <button className="px-2 py-1 text-neutral-500 hover:text-neutral-900" type="button">
            2
          </button>
          <button className="px-2 py-1 text-neutral-500 hover:text-neutral-900" type="button">
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
      </div>
    </section>
  );
}
