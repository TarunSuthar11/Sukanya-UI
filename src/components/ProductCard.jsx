import { motion } from "framer-motion";
import { Link, Navigate } from "react-router-dom";
import { IoHeartOutline, IoHeart } from "react-icons/io5";
import { useContext, useState } from "react";
import { LuShoppingCart } from "react-icons/lu";
import {CartContext} from '../context/CartContext'



export default function ProductCard({ product }) {
  const [isLiked, setIsLiked] = useState(false);
  const discount = Math.ceil(((product.actualPrice - product.currentPrice) * 100) / product.currentPrice);


  const { addToCart } = useContext(CartContext);

  const addItem = () => {
    addToCart(product, quantity=1);
  };



  

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-white rounded-md overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
    >
      <Link to={`/products/${product._id}`}>
        <div className="relative overflow-hidden">
          <div className="relative  max-h-60 md:max-h-74 overflow-hidden bg-gray-100">
            <img
              src={product.productImages?.[0]?.url}
              alt={product.productName}
              className="w-full h-full aspect-4/5 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {discount > 0 && (
              <div className="absolute top-1 -left-2 md:top-2 bg-red-500 text-white pl-3 px-2 py-1 rounded-r-full text-xs font-bold">
                {discount}% OFF
              </div>
            )}
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsLiked(!isLiked);
              }}
              className="absolute top-1 right-1 md:top-2 md:right-2 bg-white/90 hover:bg-white rounded-full p-1 shadow-md transition-all duration-300 hover:scale-110 z-10"
              aria-label="Add to favorites"
            >
              {isLiked ? (
                <IoHeart className="text-red-500 text-xl" />
              ) : (
                <IoHeartOutline className="text-gray-700 text-xl" />
              )}
            </button>
          </div>

          <div className="p-2 md:p-3">
            <h3 className="text-base md:text-lg font-semibold text-gray-500 mb-2 min-h-12 group-hover:text-gray-600 transition-colors duration-300">
              {product?.productName}
            </h3>
            {/* <p className="text-gray-500 text-sm mb-3 line-clamp-2">
              {product.description.substring(0, 50)}...
            </p> */}

            <div className="flex items-center justify-between ">
              <div className="flex gap-2 flex-wrap">
              {product.actualPrice > product.currentPrice && (
                <span className="text-gray-400 text-sm line-through">
                  ₹{product.actualPrice.toLocaleString()}
                </span>
              )}
              <span className="text-gray-700 font-semibold text-lg md:text-xl">
                ₹{product.currentPrice.toLocaleString()}
              </span>
              </div>

              <button onClick={addItem} className="flex p-2 px-3 rounded-xl bg-linear-to-r from-amber-400 to-orange-500 opacity-90 hover:opacity-100 hover:scale-105 transition-shadow shadow-md ">
                <LuShoppingCart className="text-lg md:text-xl lg:text-2xl font-bold text-white "/>
              </button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}