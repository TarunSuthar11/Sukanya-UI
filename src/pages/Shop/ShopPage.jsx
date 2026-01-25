import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { FaSlidersH, FaTimes } from "react-icons/fa";
import ProductCard from "../../components/Product/ProductCard";
import { fetchProducts } from "../../service/ProductService";
import { useGetCategories } from "../../hooks/useCategoryHooks";

const PRICE_RANGES = [
  { id: "all", label: "All" },
  { id: "under3k", label: "Under ₹3K", min: 0, max: 3000 },
  { id: "3k-7k", label: "₹3K - ₹7K", min: 3000, max: 7000 },
  { id: "7k-15k", label: "₹7K - ₹15K", min: 7000, max: 15000 },
  { id: "above15k", label: "₹15K+", min: 15000, max: Infinity },
];

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "What's New" },
  { value: "priceLow", label: "Price: Low to High" },
  { value: "priceHigh", label: "Price: High to Low" },
];

export default function ShopPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const { data: categoryData } = useGetCategories();
  const categories = categoryData?.data?.categories || [];

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState("all");
  const [sortBy, setSortBy] = useState("featured");

  const filteredProducts = useMemo(() => {
    let list = data?.data?.products || [];

    if (selectedCategory) {
      list = list.filter((p) => p.productCategory?._id === selectedCategory);
    }

    const priceRange = PRICE_RANGES.find(r => r.id === selectedPrice);
    if (priceRange?.min !== undefined) {
      list = list.filter(p =>
        p.currentPrice >= priceRange.min && p.currentPrice < priceRange.max
      );
    }

    if (sortBy === "priceLow") {
      list = [...list].sort((a, b) => a.currentPrice - b.currentPrice);
    } else if (sortBy === "priceHigh") {
      list = [...list].sort((a, b) => b.currentPrice - a.currentPrice);
    } else if (sortBy === "newest") {
      list = [...list].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return list;
  }, [data, selectedCategory, selectedPrice, sortBy]);

  const hasFilters = selectedCategory || selectedPrice !== "all";
  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedPrice("all");
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      {/* Header */}
      <div className="border-b border-neutral-100 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900" style={{ fontFamily: 'Tenor Sans, sans-serif' }}>
                Shop All
              </h1>
              <p className="text-sm text-neutral-500 mt-1">
                {filteredProducts.length} products
              </p>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-neutral-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-neutral-900"
            >
              {SORT_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-hide">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 shrink-0">
              Filter:
            </span>

            {/* Category Filter */}
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${!selectedCategory
                    ? "bg-neutral-900 text-white"
                    : "bg-neutral-50 text-neutral-700 hover:bg-neutral-100"
                  }`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat._id}
                  onClick={() => setSelectedCategory(cat._id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${selectedCategory === cat._id
                      ? "bg-neutral-900 text-white"
                      : "bg-neutral-50 text-neutral-700 hover:bg-neutral-100"
                    }`}
                >
                  {cat.categoryName}
                </button>
              ))}
            </div>

            <div className="w-px h-6 bg-neutral-200" />

            {/* Price Filter */}
            <div className="flex gap-2">
              {PRICE_RANGES.map((range) => (
                <button
                  key={range.id}
                  onClick={() => setSelectedPrice(range.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${selectedPrice === range.id
                      ? "bg-neutral-900 text-white"
                      : "bg-neutral-50 text-neutral-700 hover:bg-neutral-100"
                    }`}
                >
                  {range.label}
                </button>
              ))}
            </div>

            {hasFilters && (
              <>
                <div className="w-px h-6 bg-neutral-200" />
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 text-sm font-medium text-neutral-500 hover:text-neutral-900 whitespace-nowrap flex items-center gap-2"
                >
                  <FaTimes size={12} />
                  Clear
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="aspect-[3/4] rounded-2xl bg-neutral-100 animate-pulse" />
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {filteredProducts.map((product, idx) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-neutral-900 mb-2">No products found</h3>
            <p className="text-neutral-500 mb-6">Try adjusting your filters</p>
            <button
              onClick={clearFilters}
              className="px-6 py-3 bg-neutral-900 text-white rounded-lg hover:bg-black transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
