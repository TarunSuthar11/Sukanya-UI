import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import products from "../../data/products";
import categories from "../../data/categories";
import ProductCard from "../../components/Product/ProductCard";

export default function CategoryPage() {
  const { categoryId } = useParams();

  const categoryMeta = categories.find((c) => c.id === categoryId);
  const keyword =
    categoryMeta?.name?.split(" ")[0].toLowerCase() || categoryId?.toLowerCase() || "";

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const name = (p.name || "").toLowerCase();
      const cat = (p.category || "").toLowerCase();
      return name.includes(keyword) || cat.includes(keyword);
    });
  }, [keyword]);

  const title = categoryMeta ? categoryMeta.name : `${categoryId} Sarees`;

  return (
    <div className="min-h-screen w-full bg-linear-to-b from-amber-50 via-white to-orange-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10 xl:px-16 py-8 md:py-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-semibold tracking-[0.3em] text-amber-600 uppercase mb-2">
              Category
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{title}</h1>
            <p className="text-sm md:text-base text-gray-500 mt-1">
              Showing {filtered.length} style{filtered.length !== 1 ? "s" : ""} in this category.
            </p>
          </div>
          <Link
            to="/category"
            className="inline-flex items-center justify-center px-4 py-2 rounded-full border border-amber-200 bg-white text-amber-800 text-sm font-semibold hover:bg-amber-50 transition"
          >
            All categories
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
