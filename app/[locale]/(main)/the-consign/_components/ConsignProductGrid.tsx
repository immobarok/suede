import ConsignProductCard from "./ConsignProductCard";
import { consignProducts } from "../_data/products";

const ConsignProductGrid = () => {
  return (
    <section className="container mx-auto px-4 pb-16 md:px-0">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {consignProducts.map((product, index) => (
          <ConsignProductCard
            key={product.slug}
            slug={product.slug}
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
