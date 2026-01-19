import { useMemo, useState } from "react";
import products from "../../data/products";
import ProductCard from "../../components/Product/ProductCard";
import { fetchProducts } from "../../service/ProductService";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";

const categoryFilters = [
  { key: "all", label: "All Sarees" },
  { key: "Silk", label: "Silk" },
  { key: "Cotton", label: "Cotton" },
  { key: "Designer", label: "Designer" },
  { key: "Chiffon", label: "Chiffon" }
];

export default function ShopPage() {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["product"],
    queryFn: fetchProducts,
    cacheTime: 5 * 60 * 1000,
    staleTime: 2 * 60 * 1000,
  });

  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");

  const filteredProducts = useMemo(() => {
    let list = data?.data?.products || products;

    if (activeCategory !== "all") {
      list = list.filter((p) =>
        (p.productName || p.name || "").toLowerCase().includes(activeCategory.toLowerCase())
      );
    }

    if (sortBy === "priceLow") {
      list = [...list].sort((a, b) => a.currentPrice - b.currentPrice);
    } else if (sortBy === "priceHigh") {
      list = [...list].sort((a, b) => b.currentPrice - a.currentPrice);
    }

    return list;
  }, [data, activeCategory, sortBy]);

  return (
    <div className="min-h-screen w-full bg-gradient-soft">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10 xl:px-16 py-10 md:py-14">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8"
        >
          <div>
            <span className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold mb-3">
              Our Collection
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-2">
              All Sarees
            </h1>
            <p className="text-base md:text-lg text-neutral-600">
              Explore our complete collection of handpicked sarees for every occasion
            </p>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-neutral-500 hidden md:inline">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'}
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm border-2 border-primary-200 rounded-full px-4 py-2.5 bg-white text-neutral-700 focus:outline-none focus:ring-4 focus:ring-primary-100 focus:border-primary-400 transition-all cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="priceLow">Price: Low to High</option>
              <option value="priceHigh">Price: High to Low</option>
            </select>
          </div>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-3 mb-10"
        >
          {categoryFilters.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold border-2 transition-all duration-300 ${activeCategory === cat.key
                ? "bg-gradient-primary text-white border-transparent shadow-lg scale-105"
                : "bg-white text-primary-600 border-primary-200 hover:border-primary-400 hover:bg-primary-50"
                }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Loading State */}
        {(isLoading || isFetching) && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="card-elegant overflow-hidden">
                <div className="skeleton aspect-product" />
                <div className="p-4 space-y-3">
                  <div className="skeleton h-4 w-3/4" />
                  <div className="skeleton h-4 w-1/2" />
                  <div className="skeleton h-6 w-1/3" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Products Grid */}
        {!isLoading && !isFetching && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
          >
            {filteredProducts.map((p, index) => (
              <motion.div
                key={p._id || p.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <ProductCard product={p} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Empty State */}
        {!isLoading && !isFetching && filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-2">No sarees found</h3>
            <p className="text-neutral-600 mb-6">Try adjusting your filters or browse all collections</p>
            <button
              onClick={() => setActiveCategory("all")}
              className="btn-primary"
            >
              View All Sarees
            </button>
          </div>
        )}
      </div>
    </div>
  );
}