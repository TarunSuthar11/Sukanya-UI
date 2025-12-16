import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Slider from "../components/Slider";
import CategoryCard from "../components/CategoryCard";
import ProductCard from "../components/ProductCard";
import categories from "../data/categories";
import products from "../data/products";

export default function LandingPage() {
  // Get featured products (first 8 products)
  const featuredProducts = products.slice(0, 8);

  return (
    <div className="w-full">
      {/* Slider Section */}
      <section className="w-full">
        <Slider />
      </section>

      {/* Category Section */}
      <section className="py-12 md:py-16 lg:py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-white to-amber-50/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 md:mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              Explore Our Saree Collections
            </h2>
            <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
              Discover timeless elegance in every weave, from traditional silk to modern chiffon
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {categories.map((cat, index) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <CategoryCard category={cat} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-12 md:py-16 lg:py-20 px-4 md:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 md:mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              Featured Sarees
            </h2>
            <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
              Handpicked collection of our most elegant and popular sarees
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-10 md:mt-12"
          >
            <Link
              to="/shop"
              className="inline-block bg-amber-700 hover:bg-amber-800 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg"
            >
              View All Products
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Special Offer Banner */}
      <section className="py-12 md:py-16 px-4 md:px-6 lg:px-8 bg-gradient-to-r from-amber-600 to-orange-600 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Special Offer: Up to 30% Off
            </h2>
            <p className="text-lg md:text-xl mb-6 opacity-90">
              Shop now and get amazing discounts on premium saree collections
            </p>
            <Link
              to="/shop"
              className="inline-block bg-white text-amber-700 px-8 py-4 rounded-full font-semibold text-lg hover:bg-amber-50 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Shop Now
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}