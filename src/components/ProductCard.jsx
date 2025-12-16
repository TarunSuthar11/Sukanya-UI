import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { IoHeartOutline, IoHeart } from "react-icons/io5";
import { useState } from "react";

export default function ProductCard({ product }) {
  const [isLiked, setIsLiked] = useState(false);
  const discount = Math.ceil(((product.actualPrice - product.currentPrice) * 100) / product.currentPrice);

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
    >
      <Link to={`/products/${product.id}`}>
        <div className="relative overflow-hidden">
          <div className="relative h-64 md:h-72 overflow-hidden bg-gray-100">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            {discount > 0 && (
              <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                {discount}% OFF
              </div>
            )}
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsLiked(!isLiked);
              }}
              className="absolute top-3 right-3 bg-white/90 hover:bg-white rounded-full p-2 shadow-md transition-all duration-300 hover:scale-110 z-10"
              aria-label="Add to favorites"
            >
              {isLiked ? (
                <IoHeart className="text-red-500 text-xl" />
              ) : (
                <IoHeartOutline className="text-gray-700 text-xl" />
              )}
            </button>
          </div>

          <div className="p-4 md:p-5">
            <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-2 line-clamp-2 min-h-[3rem] group-hover:text-amber-700 transition-colors duration-300">
              {product.name}
            </h3>
            <p className="text-gray-500 text-sm mb-3 line-clamp-2">
              {product.description.substring(0, 50)}...
            </p>

            <div className="flex items-center gap-2 flex-wrap">
              {product.actualPrice > product.currentPrice && (
                <span className="text-gray-400 text-sm line-through">
                  ₹{product.actualPrice.toLocaleString()}
                </span>
              )}
              <span className="text-amber-700 font-bold text-lg md:text-xl">
                ₹{product.currentPrice.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}