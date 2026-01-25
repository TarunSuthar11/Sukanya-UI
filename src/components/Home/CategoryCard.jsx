import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function CategoryCard({ category }) {
  return (
    <Link to={`/category/${category._id}`} className="block group">
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
        className="relative aspect-[3/4] rounded-[2rem] overflow-hidden bg-neutral-100 shadow-sm group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-500"
      >
        <img
          src={category?.categoryImage?.url}
          alt={category.categoryName}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
        />

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

        {/* Content */}
        <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
          <div className="space-y-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-70 mb-1">Collection</p>
            <h3 className="text-xl md:text-2xl font-bold tracking-tight" style={{ fontFamily: 'Tenor Sans, sans-serif' }}>
              {category.categoryName}
            </h3>
            <div className="h-0.5 w-0 group-hover:w-12 bg-primary-500 transition-all duration-500" />
            <p className="text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 pt-4 flex items-center gap-2 transition-opacity duration-700">
              Discover Now
              <span className="text-lg">→</span>
            </p>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}