export type ConsignProduct = {
  slug: string;
  imageUrl: string;
  brandName: string;
  productName: string;
  price: string;
  originalPrice?: string;
  sizeLabel: string;
  condition: string;
  description: string;
  thumbnails: string[];
  seller: {
    name: string;
    username: string;
    avatarUrl: string;
  };
  measurements: {
    height: string;
    bust: string;
    waist: string;
    hips: string;
  };
};

export const consignProducts: ConsignProduct[] = [
  {
    slug: "structured-wool-blazer",
    imageUrl: "https://i.ibb.co/27gJcNQN/Rectangle-7-1.png",
    brandName: "Nadi",
    productName: "Structured Wool Blazer",
    price: "$245",
    sizeLabel: "M",
    condition: "Like New",
    description: "Classic tailored blazer in premium wool blend. Features structured shoulders, single-button closure, and functional pockets. Worn only twice for special events. Professionally dry cleaned and in pristine condition.",
    thumbnails: [
      "https://i.ibb.co/27gJcNQN/Rectangle-7-1.png",
      "https://i.ibb.co/5bBXmq7/Rectangle-7-2.png",
      "https://i.ibb.co/RpMxPqQ7/Rectangle-7.png",
      "https://i.ibb.co/LddnM1Lr/Image-With-Fallback.png",
    ],
    seller: {
      name: "Amara K.",
      username: "@amara",
      avatarUrl: "https://i.ibb.co/RpMwpMHM/Container-2.png",
    },
    measurements: {
      height: '5\'6"',
      bust: '28"',
      waist: '31"',
      hips: '25"',
    },
  },
  {
    slug: "aya-studio-wide-leg-trouser-sand",
    imageUrl: "https://i.ibb.co/5bBXmq7/Rectangle-7-2.png",
    brandName: "Nadi",
    productName: "Aya Studio Wide-Leg Trouser",
    price: "$85",
    originalPrice: "$145",
    sizeLabel: "M",
    condition: "Good",
    description: "Wide-leg trousers in a beautiful sand color.",
    thumbnails: ["https://i.ibb.co/5bBXmq7/Rectangle-7-2.png"],
    seller: {
        name: "Amara K.",
        username: "@amara",
        avatarUrl: "https://i.ibb.co/RpMwpMHM/Container-2.png",
    },
    measurements: {
        height: '5\'6"',
        bust: '28"',
        waist: '31"',
        hips: '25"',
    }
  },
];

export const getConsignProductBySlug = (slug: string) => {
  return consignProducts.find((product) => product.slug === slug);
};
