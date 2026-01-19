import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function CategoryCard({ category }) {
  return (
    <Link to={`/category/${category._id}`} className="block group">
      <motion.div
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
        className="rounded-2xl overflow-hidden shadow-md transition-all duration-300 bg-white"
      >
        <div className="relative h-60 md:h-72 overflow-hidden">
          <img
            src={category?.categoryImage?.url}
            alt={category.categoryName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="p-3 md:p-4 bg-white text-center">
          <h3 className="font-bold text-lg md:text-xl text-gray-800 group-hover:text-amber-700 transition-colors duration-300">
            {category.categoryName}
          </h3>
          <p className="text-sm text-gray-500 mt-1 group-hover:text-gray-700 transition-colors duration-300">
            Explore Collection →
          </p>
        </div>
      </motion.div>
    </Link>
  );
}