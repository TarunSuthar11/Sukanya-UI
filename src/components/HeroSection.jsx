import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="relative bg-[url('/hero-saree.jpg')] bg-cover bg-center h-[70vh] flex items-center justify-center text-white">
      <div className="bg-black/50 p-10 rounded-xl text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-bold"
        >
          Grace Meets Tradition
        </motion.h1>
        <p className="mt-3 text-lg">Discover timeless sarees crafted with elegance.</p>
        <Link to="/shop" className="mt-6 inline-block bg-maroon-700 hover:bg-maroon-800 text-white px-6 py-3 rounded-full transition">
          Shop Now
        </Link>
      </div>
    </section>
  );
}