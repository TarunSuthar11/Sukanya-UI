import { useParams } from "react-router-dom";
import products from "../data/products";
import ProductCard from "../components/ProductCard";

export default function CategoryPage() {
  const { categoryId } = useParams();
  const filtered = products.filter((p) => p.category === categoryId);

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center capitalize">{categoryId} Sarees</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}