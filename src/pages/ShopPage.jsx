import { useMemo, useState } from "react";
import products from "../data/products";
import ProductCard from "../components/ProductCard";

const categoryFilters = [
  { key: "all", label: "All" },
  { key: "Silk", label: "Silk" },
  { key: "Cotton", label: "Cotton" },
  { key: "Designer", label: "Designer" }
];

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");

  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (activeCategory !== "all") {
      list = list.filter((p) =>
        (p.name || "").toLowerCase().includes(activeCategory.toLowerCase())
      );
    }

    if (sortBy === "priceLow") {
      list.sort((a, b) => a.currentPrice - b.currentPrice);
    } else if (sortBy === "priceHigh") {
      list.sort((a, b) => b.currentPrice - a.currentPrice);
    }

    return list;
  }, [activeCategory, sortBy]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-amber-50 via-white to-orange-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10 xl:px-16 py-8 md:py-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">All Sarees</h2>
            <p className="text-sm md:text-base text-gray-500 mt-1">
              Explore our complete collection of handpicked sarees.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500 hidden md:inline">
              {filteredProducts.length} items
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm border border-amber-200 rounded-full px-3 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-100"
            >
              <option value="featured">Featured</option>
              <option value="priceLow">Price: Low to High</option>
              <option value="priceHigh">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {categoryFilters.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
                activeCategory === cat.key
                  ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white border-transparent shadow-md"
                  : "bg-white text-amber-800 border-amber-200 hover:bg-amber-50"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filteredProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}