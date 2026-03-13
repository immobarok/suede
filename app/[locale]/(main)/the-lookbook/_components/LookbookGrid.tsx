import { LookBookCard } from "./lookbookcard";


const reviews = [
  {
    productImage: "https://i.ibb.co.com/DH2d8GH2/Frame-103.png",
    imageCount: 5,
    videoCount: 2,
    userName: "Amara K.",
    userHandle: "@amara",
    userAvatar: "/images/avatars/amara.jpg",
    brandName: "Nodi",
    productName: "Tailored Wide-Leg Trouser",
    rating: 5,
    size: "M",
    reviewText:
      "These trousers are everything. The wide leg is flattering without being overwhelming. True to size for my measurements. The fabric has a beautiful drape and the color is even better in person.",
    height: "5'6\"",
    weight: "145 lbs",
    waist: '28"',
    hips: '40"',
    likes: 48,
    comments: 48,
  },
  {
    productImage: "https://i.ibb.co.com/5gxxrrxt/Frame-103-2.png",
    imageCount: 5,
    videoCount: 2,
    userName: "Amara K.",
    userHandle: "@amara",
    userAvatar: "/images/avatars/amara2.jpg",
    brandName: "Nodi",
    productName: "Tailored Wide-Leg Trouser",
    rating: 5,
    size: "M",
    reviewText:
      "These trousers are everything. The wide leg is flattering without being overwhelming. True to size for my measurements. The fabric has a beautiful drape.",
    height: "5'6\"",
    weight: "145 lbs",
    waist: '28"',
    hips: '40"',
    likes: 48,
    comments: 48,
  },
  {
    productImage: "https://i.ibb.co.com/DH2d8GH2/Frame-103.png",
    imageCount: 5,
    videoCount: 2,
    userName: "Amara K.",
    userHandle: "@amara",
    userAvatar: "/images/avatars/amara3.jpg",
    brandName: "Nodi",
    productName: "Tailored Wide-Leg Trouser",
    rating: 5,
    size: "M",
    reviewText:
      "These trousers are everything. The wide leg is flattering without being overwhelming. True to size for my measurements. The fabric has a beautiful drape and the color is vibrant.",
    height: "5'6\"",
    weight: "145 lbs",
    waist: '28"',
    hips: '40"',
    likes: 48,
    comments: 48,
  },
];

export function LookBookGrid() {
  return (
    <section className="pt-5 pb-24 px-4 md:px-8 lg:px-16 bg-[#f5f5f0]">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <LookBookCard key={index} {...review} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}