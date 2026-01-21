import { useMemo, useState, useContext, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FiTruck, FiShield, FiHeart } from "react-icons/fi";
import { BsStarFill } from "react-icons/bs";
import { LuShoppingCart } from "react-icons/lu";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";

import products from "../../data/products";
import { CartContext } from "../../context/CartContext";
import { fetchProduct } from "../../service/ProductService";
import { fetchReviews } from "../../service/ReviewService";

import ReviewsCard from "../../components/Product/ReviewsCard";
import ProductImageSlider from "../../components/Product/ProductImageSlider";
import ProductCard from "../../components/Product/ProductCard";

// Component for information related to delivery, returns, and quality
const InfoPill = ({ icon, title, value }) => (
  <div className="flex items-center gap-4 px-5 py-4 rounded-xl bg-white border border-neutral-100 shadow-sm hover:shadow-md transition-shadow duration-300">
    <span className="text-primary-600 text-2xl lg:text-3xl bg-primary-50 p-3 rounded-full">{icon}</span>
    <div className="text-sm">
      <div className="font-bold text-neutral-800 mb-0.5">{title}</div>
      <div className="text-neutral-500">{value}</div>
    </div>
  </div>
);

export default function ProductDetailsPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const buyButtonsRef = useRef(null);

  const { data: productData, isLoading: productLoading, isFetching: productFetching } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => fetchProduct(productId),
    staleTime: 300000,
    cacheTime: 300000,
  });

  const { data: reviewData, isLoading: reviewsLoading } = useQuery({
    queryKey: ["reviews", productId],
    queryFn: () => fetchReviews(productId),
    staleTime: 300000,
    cacheTime: 300000
  });

  useEffect(() => {
    const handleScroll = () => {
      if (buyButtonsRef.current) {
        const rect = buyButtonsRef.current.getBoundingClientRect();
        // Show sticky bar if the main buy buttons are above the viewport
        setShowStickyBar(rect.bottom < 0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const product = productData?.data;
  const reviewsByProduct = reviewData?.data;
  const reviews = reviewsByProduct?.reviews || [];

  const avgRating = reviews.length > 0
    ? Number((reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1))
    : 0;

  const related = useMemo(() => {
    if (!product) return [];
    return products
      .filter((p) => p.id !== product.id && p._id !== product._id)
      .slice(0, 4);
  }, [product]);

  const addItem = () => {
    addToCart(product, quantity);
  };

  const buyItem = () => {
    addToCart(product, quantity);
    navigate('/cart');
  };

  const discount = Math.max(
    0,
    Math.ceil(((product?.actualPrice - product?.currentPrice) * 100) / product?.actualPrice)
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-gradient-soft min-h-screen w-full overflow-x-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-16">
        {/* Breadcrumb */}
        <div className="text-sm text-neutral-500 mb-8 flex gap-2 flex-wrap items-center">
          <Link to="/" className="hover:text-primary-600 transition-colors">Home</Link>
          <span className="text-neutral-300">/</span>
          <Link to="/shop" className="hover:text-primary-600 transition-colors">Shop</Link>
          <span className="text-neutral-300">/</span>
          <span className="text-neutral-900 font-medium truncate max-w-[200px]">{product?.productName}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Product Images */}
          <div className="relative">
            {productFetching || productLoading ? (
              <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden bg-neutral-200 skeleton shadow-lg" />
            ) : (
              <ProductImageSlider images={product?.productImages?.map(i => i.url) || (product?.imageUrl ? [product.imageUrl] : [])} />
            )}
          </div>

          {/* Product Details */}
          {productLoading ? (
            <div className="space-y-6">
              <div className="h-8 w-2/3 max-w-sm skeleton" />
              <div className="h-4 w-1/3 max-w-xs skeleton" />
              <div className="h-10 w-1/2 max-w-xs skeleton mt-4" />
              <div className="h-24 w-full skeleton mt-6" />
              <div className="grid grid-cols-3 gap-4 mt-6">
                {[1, 2, 3].map(i => <div key={i} className="h-20 skeleton rounded-xl" />)}
              </div>
              <div className="flex gap-4 mt-8">
                <div className="h-12 w-40 rounded-full skeleton" />
                <div className="h-12 w-40 rounded-full skeleton" />
              </div>
            </div>
          ) : (
            <div className="space-y-8 animate-fade-in-up">
              <div>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 leading-tight">
                    {product.productName}
                  </h1>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-100 border border-neutral-200 shadow-sm flex-shrink-0">
                    <span className="text-lg font-bold text-neutral-900">{avgRating > 0 ? avgRating : 4.5}</span>
                    <BsStarFill className="text-accent-500 text-sm" />
                  </div>
                </div>
                <p className="text-neutral-500 font-medium">{product.category || "Premium Saree Collection"}</p>
              </div>

              <div className="flex items-end gap-4 p-4 rounded-xl bg-white/50 border border-white/50 backdrop-blur-sm shadow-sm w-fit">
                <span className="text-4xl font-bold text-primary-700">₹{product.currentPrice.toLocaleString()}</span>
                <div className="mb-1.5 flex flex-col">
                  {product.actualPrice > product.currentPrice && (
                    <span className="text-neutral-400 line-through text-sm">₹{product.actualPrice.toLocaleString()}</span>
                  )}
                  {discount > 0 && <span className="text-green-600 text-xs font-bold uppercase tracking-wide">{discount}% OFF</span>}
                </div>
              </div>

              <p className="text-neutral-600 leading-relaxed text-lg">
                {product.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <InfoPill icon={<FiTruck />} title="Free Delivery" value="Within 5-7 days" />
                <InfoPill icon={<LuShoppingCart />} title="Easy Returns" value="7-day policy" />
                <InfoPill icon={<FiShield />} title="Quality Assured" value="Verified sellers" />
              </div>

              <div ref={buyButtonsRef} className="flex flex-wrap gap-4 pt-4">
                <button
                  onClick={addItem}
                  className="flex-1 min-w-[160px] btn-secondary text-lg shadow-elegant hover:shadow-elegant-hover flex items-center justify-center gap-2 group"
                >
                  <LuShoppingCart className="text-xl group-hover:scale-110 transition-transform" />
                  Add to Cart
                </button>
                <button
                  onClick={buyItem}
                  className="flex-1 min-w-[160px] btn-primary text-lg shadow-elegant hover:shadow-elegant-hover flex items-center justify-center gap-2"
                >
                  Buy Now
                </button>
              </div>

              <div className="mt-8 p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm">
                <h3 className="text-xl font-bold text-neutral-900 mb-4" style={{ fontFamily: 'Tenor Sans, sans-serif' }}>Product Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8 text-sm">
                  <div className="flex justify-between border-b border-neutral-100 pb-2">
                    <span className="text-neutral-500 uppercase tracking-widest text-[10px] font-black">Fabric</span>
                    <span className="font-semibold text-neutral-800">{product.fabric || "N/A"}</span>
                  </div>
                  <div className="flex justify-between border-b border-neutral-100 pb-2">
                    <span className="text-neutral-500 uppercase tracking-widest text-[10px] font-black">Length</span>
                    <span className="font-semibold text-neutral-800">{product.sareeLength || "5.5 meters"}</span>
                  </div>
                  <div className="flex justify-between border-b border-neutral-100 pb-2">
                    <span className="text-neutral-500 uppercase tracking-widest text-[10px] font-black">Blouse</span>
                    <span className="font-semibold text-neutral-800">{product.blouseIncluded ? "Included" : "Not Included"}</span>
                  </div>
                  {product.blouseIncluded && (
                    <div className="flex justify-between border-b border-neutral-100 pb-2">
                      <span className="text-neutral-500 uppercase tracking-widest text-[10px] font-black">Blouse Length</span>
                      <span className="font-semibold text-neutral-800">{product.blouseLength || "0.8 meters"}</span>
                    </div>
                  )}
                  <div className="flex justify-between border-b border-neutral-100 pb-2">
                    <span className="text-neutral-500 uppercase tracking-widest text-[10px] font-black">Occasion</span>
                    <span className="font-semibold text-neutral-800">{product.occasion || "Festive / Party"}</span>
                  </div>
                  <div className="flex justify-between border-b border-neutral-100 pb-2">
                    <span className="text-neutral-500 uppercase tracking-widest text-[10px] font-black">Care</span>
                    <span className="font-semibold text-neutral-800">{product.washCare || "Dry Clean Only"}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products & Reviews */}
      <div className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          {/* Related products */}
          {related.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-20"
            >
              <div className="flex items-end justify-between mb-10">
                <div>
                  <h3 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-2">You May Also Like</h3>
                  <p className="text-neutral-500">Curated suggestions based on your selection</p>
                </div>
                <Link to="/shop" className="hidden sm:inline-block text-primary-600 font-semibold hover:text-magenta-600 transition-colors">
                  View all collections →
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {related.map((item) => (
                  <ProductCard key={item.id || item._id} product={item} />
                ))}
              </div>
            </motion.div>
          )}

          {/* Reviews */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-between mb-10">
              <div>
                <h3 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-2">Customer Reviews</h3>
                <p className="text-neutral-500">
                  {reviewsByProduct?.reviews.length || 0} verified satisfaction ratings
                </p>
              </div>
            </div>

            {reviews.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reviews.map((review) => (
                  <ReviewsCard key={review._id} review={review} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-neutral-50 rounded-2xl border border-dashed border-neutral-300">
                <p className="text-neutral-500">No reviews yet. Be the first to share your thoughts!</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Mobile Sticky Buy Bar */}
      <AnimatePresence>
        {showStickyBar && product && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-neutral-100 shadow-[0_-10px_40px_rgba(0,0,0,0.08)] px-4 py-4 md:hidden flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-12 h-16 rounded-lg overflow-hidden bg-neutral-50 shrink-0">
                <img src={product.productImages?.[0]?.url || product.imageUrl} className="w-full h-full object-cover" alt="" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-neutral-800 truncate">{product.productName}</p>
                <p className="text-sm font-black text-primary-700">₹{product.currentPrice.toLocaleString()}</p>
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <button
                onClick={addItem}
                className="w-12 h-12 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center border border-primary-100 active:scale-90 transition-transform"
                aria-label="Add to cart"
              >
                <LuShoppingCart size={20} />
              </button>
              <button
                onClick={buyItem}
                className="px-6 py-3 bg-gradient-primary text-white text-xs font-black uppercase tracking-widest rounded-full shadow-lg shadow-primary-100 active:scale-95 transition-transform"
              >
                Buy Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
