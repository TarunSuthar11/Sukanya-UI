import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { FaSearch, FaFilter } from "react-icons/fa";
import ProductCard from "../../components/Product/ProductCard";
import { fetchProducts } from "../../service/ProductService";

export default function SearchPage() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q") || "";

    // Use existing fetchProducts which supports search query param
    const { data, isLoading } = useQuery({
        queryKey: ["products", "search", query],
        queryFn: () => fetchProducts({ search: query }),
        enabled: !!query
    });

    const products = data?.data?.products || [];

    return (
        <div className="min-h-screen bg-[#FAF9F6] pt-24 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <p className="text-sm font-bold text-neutral-400 uppercase tracking-widest mb-2">Search Results</p>
                    <h1 className="text-3xl md:text-5xl font-bold text-neutral-900 mb-4" style={{ fontFamily: 'Tenor Sans, sans-serif' }}>
                        "{query}"
                    </h1>
                    <p className="text-neutral-500">
                        {isLoading ? "Searching..." : `Found ${products.length} ${products.length === 1 ? 'result' : 'results'}`}
                    </p>
                </div>

                {isLoading ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="aspect-[3/4] rounded-2xl bg-neutral-100 animate-pulse" />
                        ))}
                    </div>
                ) : products.length > 0 ? (
                    <motion.div
                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        {products.map((product, index) => (
                            <motion.div
                                key={product._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <ProductCard product={product} />
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="w-24 h-24 bg-neutral-50 rounded-full flex items-center justify-center mb-6 text-neutral-200">
                            <FaSearch size={32} />
                        </div>
                        <h3 className="text-2xl font-bold text-neutral-800 mb-2" style={{ fontFamily: 'Tenor Sans, sans-serif' }}>
                            No matches found
                        </h3>
                        <p className="text-neutral-500 mb-8 max-w-md">
                            We couldn't find any products matching "{query}". Try checking for typos or using different keywords.
                        </p>
                        <Link
                            to="/shop"
                            className="px-8 py-4 bg-neutral-900 text-white rounded-xl text-sm font-black uppercase tracking-widest hover:bg-black transition-colors"
                        >
                            Browse All Products
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
