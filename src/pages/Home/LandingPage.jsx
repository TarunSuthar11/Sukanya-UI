import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Slider from "../../components/Home/Slider";
import CategoryCard from "../../components/Home/CategoryCard";
import ProductCard from "../../components/Product/ProductCard";
import products from "../../data/products";
import { useGetCategories } from "../../hooks/useCategoryHooks";
import { useGetFeaturedProducts } from "../../hooks/useProductHooks";

export default function LandingPage() {
  const { data: categoryData, isLoading: categoriesLoading } = useGetCategories();
  const { data: featuredData, isLoading: featuredLoading } = useGetFeaturedProducts();

  const categories = categoryData?.data?.categories || [];
  const featuredProducts = featuredData?.data?.featuredProducts || [];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      {/* Hero Slider Section */}
      <section className="w-full">
        <Slider />
      </section>

      {/* Category Section */}
      <section className="py-16 md:py-24 lg:py-32 px-4 md:px-8 lg:px-16 bg-[#FDFCFB]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
          >
            <div className="max-w-2xl">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary-600 mb-4 block">Our Heritage</span>
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-neutral-900 leading-[1.1]" style={{ fontFamily: 'Tenor Sans, sans-serif' }}>
                Curated Collections
              </h2>
            </div>
            <p className="text-neutral-500 font-light max-w-sm text-sm leading-relaxed mb-1">
              Explore our diverse range of traditional and modern sarees, each hand-picked for quality and elegance.
            </p>
          </motion.div>

          {categoriesLoading ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="aspect-[3/4] rounded-[2rem] bg-neutral-100 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
              {categories.map((cat, index) => (
                <motion.div
                  key={cat._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1, ease: [0.33, 1, 0.68, 1] }}
                >
                  <CategoryCard category={cat} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-12 md:py-20 lg:py-24 px-4 md:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <span className="inline-block px-4 py-2 bg-magenta-100 text-magenta-700 rounded-full text-sm font-semibold mb-4">
              Handpicked for You
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-4">
              Featured Sarees
            </h2>
            <p className="text-neutral-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Curated collection of our most elegant and popular sarees, crafted with love
            </p>
          </motion.div>

          {featuredLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="aspect-[3/4] rounded-2xl bg-neutral-100 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-10 md:mt-14"
          >
            <Link
              to="/shop"
              className="btn-primary text-base md:text-lg inline-flex items-center gap-2"
            >
              View All Products
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Special Offer Banner */}
      {/* <section className="py-16 md:py-20 px-4 md:px-6 lg:px-8 bg-gradient-primary text-white relative overflow-hidden">

         <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-magenta-500/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold mb-4 border border-white/30">
              Limited Time Offer
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Up to 30% Off on Premium Collections
            </h2>
            <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Celebrate the season with our exclusive discounts on handpicked saree collections
            </p>
            <Link
              to="/shop"
              className="inline-block bg-white text-primary-700 px-8 py-4 rounded-full font-semibold text-lg hover:bg-accent-400 hover:text-white transition-all duration-300 hover:scale-105 shadow-2xl"
            >
              Shop the Sale
            </Link>
          </motion.div>
        </div>
      </section> */}

      {/* Why Choose Us Section */}
      <section className="py-12 md:py-20 px-4 md:px-6 lg:px-8 bg-neutral-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
              Why Choose Sukanya
            </h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              Experience the perfect blend of tradition and quality
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "✨",
                title: "Premium Quality",
                description: "Handpicked sarees crafted with finest materials and traditional techniques"
              },
              {
                icon: "🚚",
                title: "Free Shipping",
                description: "Enjoy free delivery on all orders across India with secure packaging"
              },
              {
                icon: "🔄",
                title: "Easy Returns",
                description: "Hassle-free 7-day return policy for your complete satisfaction"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="card-elegant p-8 text-center hover-lift"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-neutral-900 mb-3">{feature.title}</h3>
                <p className="text-neutral-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}