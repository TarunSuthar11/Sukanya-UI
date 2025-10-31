import products from "../data/products";
import ProductCard from "../components/ProductCard";

export default function ShopPage() {
  return (
    <div className="max-w-7xl py-3 mx-auto px-2">
      <h2 className="text-2xl font-bold mb-6 text-center">All Sarees</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}