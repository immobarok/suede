import ConsignProductCard from "./ConsignProductCard";




const products = [
  {
    imageUrl: "https://i.ibb.co.com/5bBXmq7/Rectangle-7-2.png",
    brandName: "Nodi",
    productName: "Aya Studio Wide-Leg Trouser",
    price: "$85",
    originalPrice: "$145",
    sizeLabel: "Size M",
  },
  {
    imageUrl: "https://i.ibb.co.com/27gJcNQN/Rectangle-7-1.png",
    brandName: "Nodi",
    productName: "Aya Studio Wide-Leg Trouser",
    price: "$85",
    originalPrice: "$145",
    sizeLabel: "Size M",
  },
  {
    imageUrl: "https://i.ibb.co.com/RpMxPqQ7/Rectangle-7.png",
    brandName: "Nodi",
    productName: "Aya Studio Wide-Leg Trouser",
    price: "$85",
    originalPrice: "$145",
    sizeLabel: "Size M",
  },
];

const ConsignProductGrid = () => {
  return (
    <section className="container mx-auto px-4 pb-16 md:px-0">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {products.map((product, index) => (
          <ConsignProductCard
            key={`${product.productName}-${index}`}
            imageUrl={product.imageUrl}
            brandName={product.brandName}
            productName={product.productName}
            price={product.price}
            originalPrice={product.originalPrice}
            sizeLabel={product.sizeLabel}
            index={index}
          />
        ))}
      </div>
    </section>
  );
};

export default ConsignProductGrid;
