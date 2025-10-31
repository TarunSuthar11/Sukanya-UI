import { div } from "framer-motion/client";
import { Link } from "react-router-dom";
import { FcLike } from "react-icons/fc";


export default function ProductCard({ product }) {
  return (
    <div className="grid mb-6">
      <Link to={`/products/${product.id}`} 
            >
        <div>    
          <div className="mb-4">
            <img src={product.imageUrl} alt={product.name} className="rounded-xl w-full min-h-[220px] object-cover hover:scale-105" />
            
          </div>

          <div className="min-h-12 lg:min-h-6">
            <h3 className="text-md font-semibold ">{product.name}</h3>
          </div>
          <span className="text-gray-400 text-sm lg:text-md">{product.description.substring(0,26)}...</span>

          <div className="flex gap-2 mt-2 lg:text-xl">
            <span className="text-green-500 font-bold">{(Math.ceil((product.actualPrice-product.currentPrice)*100/product.currentPrice))}% </span>
            <span className="text-gray-400 font-bold line-through">₹{product.actualPrice}</span>
            <span className="text-maroon-700 font-bold">₹{product.currentPrice}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}