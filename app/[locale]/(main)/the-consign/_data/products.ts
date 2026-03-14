export type ConsignProduct = {
  slug: string;
  imageUrl: string;
  brandName: string;
  productName: string;
  price: string;
  originalPrice?: string;
  sizeLabel: string;
};

export const consignProducts: ConsignProduct[] = [
  {
    slug: "aya-studio-wide-leg-trouser-sand",
    imageUrl: "https://i.ibb.co.com/5bBXmq7/Rectangle-7-2.png",
    brandName: "Nodi",
    productName: "Aya Studio Wide-Leg Trouser",
    price: "$85",
    originalPrice: "$145",
    sizeLabel: "Size M",
  },
  {
    slug: "aya-studio-wide-leg-trouser-cocoa",
    imageUrl: "https://i.ibb.co.com/27gJcNQN/Rectangle-7-1.png",
    brandName: "Nodi",
    productName: "Aya Studio Wide-Leg Trouser",
    price: "$85",
    originalPrice: "$145",
    sizeLabel: "Size M",
  },
  {
    slug: "aya-studio-wide-leg-trouser-charcoal",
    imageUrl: "https://i.ibb.co.com/RpMxPqQ7/Rectangle-7.png",
    brandName: "Nodi",
    productName: "Aya Studio Wide-Leg Trouser",
    price: "$85",
    originalPrice: "$145",
    sizeLabel: "Size M",
  },
];

export const getConsignProductBySlug = (slug: string) => {
  return consignProducts.find((product) => product.slug === slug);
};
