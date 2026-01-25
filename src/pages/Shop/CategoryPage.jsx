import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useGetProducts } from "../../hooks/useProductHooks";
import { useGetCategories } from "../../hooks/useCategoryHooks";
import ProductCard from "../../components/Product/ProductCard";
import { FaArrowLeft, FaGhost } from "react-icons/fa";

export default function CategoryPage() {
  const { categoryId } = useParams();

  // Fetch products for this category
  const { data: productsData, isLoading: productsLoading } = useGetProducts({ category: categoryId });
  const products = productsData?.data?.products || [];

  // Fetch category info to get the name
  const { data: categoriesData } = useGetCategories();
  const categoryMeta = categoriesData?.data?.categories?.find(c => c._id === categoryId);

  const title = categoryMeta?.categoryName || "Collection";

  if (productsLoading) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary-100 border-t-primary-600 rounded-full animate-spin"></div>
          <p className="font-serif text-neutral-500 italic">Unveiling our {title}...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] pt-16 pb-24 px-4 sm:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">

        {/* Breadcrumb / Back Navigation */}
        <div className="mb-12">
          <Link
            to="/"
            className="flex items-center gap-2 text-neutral-400 hover:text-black transition-all text-[10px] font-black uppercase tracking-[0.2em] group w-fit"
          >
            <FaArrowLeft size={10} className="group-hover:-translate-x-1 transition-transform" />
            Back to Atelier
          </Link>
        </div>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="max-w-3xl">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary-600 mb-4 block">The Selection</span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-neutral-900 leading-none" style={{ fontFamily: 'Tenor Sans, sans-serif' }}>
              {title}
            </h1>
            <p className="text-neutral-500 font-light text-sm md:text-base mt-6 leading-relaxed max-w-xl">
              Discover our hand-picked range of {title} sarees, reflecting the finest traditions of ethnic craftsmanship and contemporary elegance.
            </p>
          </div>
          <div className="flex items-center gap-2 text-neutral-400 text-[10px] font-black uppercase tracking-widest border-b border-neutral-100 pb-2">
            <span>Result Count:</span>
            <span className="text-neutral-900">{products.length} Styles</span>
          </div>
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="bg-white rounded-[3rem] p-24 text-center border border-neutral-100 shadow-sm animate-in fade-in zoom-in duration-700">
            <div className="w-20 h-20 bg-neutral-50 rounded-full flex items-center justify-center mx-auto mb-8 text-neutral-200">
              <FaGhost size={32} />
            </div>
            <h2 className="text-2xl font-serif text-neutral-800 mb-3 font-medium uppercase tracking-widest">Ethereal Silence</h2>
            <p className="text-neutral-400 mb-10 max-w-sm mx-auto text-sm leading-relaxed font-light">
              This collection is currently empty, but our artisans are crafting new masterpieces as we speak. Check back soon.
            </p>
            <Link to="/" className="btn-primary px-12 py-4">
              Explore Other Styles
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
            {products.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.05, ease: [0.33, 1, 0.68, 1] }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
