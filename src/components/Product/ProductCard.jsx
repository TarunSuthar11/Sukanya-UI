import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { IoHeartOutline, IoHeart, IoCheckmarkCircle } from "react-icons/io5";
import { useContext, useState } from "react";
import { LuShoppingCart } from "react-icons/lu";
import { CartContext } from '../../context/CartContext';
import { WishlistContext } from '../../context/WishlistContext';
import { NotificationContext } from '../../context/NotificationContext';

export default function ProductCard({ product }) {
  const { addToCart, isInCart } = useContext(CartContext);
  const { toggleWishlist, isInWishlist } = useContext(WishlistContext);
  const { showNotification } = useContext(NotificationContext);

  const discount = Math.ceil(((product.actualPrice - product.currentPrice) * 100) / product.actualPrice);
  const isLiked = isInWishlist(product._id);
  const isAdded = isInCart(product?._id);

  const addItem = (e) => {
    e.preventDefault();
    if (isAdded) return;
    addToCart(product?._id);

    // Feedback Logic
    showNotification(`${product.productName || 'Product'} added to cart!`, "success");
  };

  const handleLike = (e) => {
    e.preventDefault();
    toggleWishlist(product);
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group relative card-elegant overflow-hidden h-full flex flex-col"
    >
      <Link to={`/products/${product._id || product.id}`} className="flex flex-col h-full">
        {/* Image Container */}
        <div className="relative overflow-hidden bg-neutral-100 aspect-product">
          <img
            src={product.productImages?.[0]?.url || product.imageUrl}
            alt={product.productName || product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />

          {/* Gradient Overlay on Hover */}
          <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Discount Badge */}
          {discount > 0 && (
            <div className="absolute top-3 left-0 bg-linear-to-r from-red-500 to-red-600 text-white pl-3 pr-3 py-1.5 rounded-r-full text-xs font-bold shadow-lg">
              {discount}% OFF
            </div>
          )}

          {/* Favorite Button */}
          <button
            onClick={handleLike}
            className="absolute top-3 right-3 bg-white/95 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-300 hover:scale-110 z-10 backdrop-blur-sm"
            aria-label={isLiked ? "Remove from favorites" : "Add to favorites"}
          >
            {isLiked ? (
              <IoHeart className="text-red-500 text-xl" />
            ) : (
              <IoHeartOutline className="text-neutral-700 text-xl" />
            )}
          </button>

          {/* Quick Add to Cart - Shows on Hover */}
          <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button
              onClick={addItem}
              disabled={isAdded}
              className={`w-full py-2.5 text-sm flex items-center justify-center gap-2 transition-all duration-300 ${isAdded
                ? "bg-green-600 text-white shadow-lg cursor-default rounded-full"
                : "btn-primary"
                }`}
            >
              {isAdded ? (
                <>
                  <IoCheckmarkCircle className="text-lg" />
                  Added to Cart
                </>
              ) : (
                <>
                  <LuShoppingCart className="text-lg" />
                  Add to Cart
                </>
              )}
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="text-base md:text-lg font-semibold text-neutral-800 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors duration-300 min-h-12">
            {product?.productName}
          </h3>

          {/* Price Section */}
          <div className="mt-auto">
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-xl md:text-2xl font-bold text-primary-600">
                ₹{product.currentPrice.toLocaleString()}
              </span>
              {product.actualPrice > product.currentPrice && (
                <span className="text-sm text-neutral-400 line-through">
                  ₹{product.actualPrice.toLocaleString()}
                </span>
              )}
            </div>

            {/* Rating or Category */}
            <div className="flex items-center justify-between text-xs text-neutral-500">
              <span className="px-2 py-1 bg-primary-50 text-primary-600 rounded-full font-medium">
                {product.category || 'Saree'}
              </span>
              <div className="flex items-center gap-1">
                <span className="text-accent-500">★</span>
                <span className="font-medium">4.5</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}