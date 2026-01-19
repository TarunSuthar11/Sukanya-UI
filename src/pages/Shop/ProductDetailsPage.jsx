import { useMemo, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FiTruck, FiShield, FiHeart } from "react-icons/fi";
import { BsStarFill } from "react-icons/bs";
import { LuShoppingCart } from "react-icons/lu";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";

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
    <div className="bg-gradient-soft min-h-screen w-full overflow-x-hidden">
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

              <div className="flex flex-wrap gap-4 pt-4">
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
                <h3 className="text-xl font-bold text-neutral-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>Product Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8 text-sm">
                  <div className="flex justify-between border-b border-neutral-100 pb-2">
                    <span className="text-neutral-500">Fabric</span>
                    <span className="font-semibold text-neutral-800">{product.fabric || "N/A"}</span>
                  </div>
                  <div className="flex justify-between border-b border-neutral-100 pb-2">
                    <span className="text-neutral-500">Saree Length</span>
                    <span className="font-semibold text-neutral-800">{product.sareeLength || "5.5 meters"}</span>
                  </div>
                  <div className="flex justify-between border-b border-neutral-100 pb-2">
                    <span className="text-neutral-500">Blouse</span>
                    <span className="font-semibold text-neutral-800">{product.blouseIncluded ? "Included" : "Not Included"}</span>
                  </div>
                  {product.blouseIncluded && (
                    <div className="flex justify-between border-b border-neutral-100 pb-2">
                      <span className="text-neutral-500">Blouse Length</span>
                      <span className="font-semibold text-neutral-800">{product.blouseLength || "0.8 meters"}</span>
                    </div>
                  )}
                  <div className="flex justify-between border-b border-neutral-100 pb-2">
                    <span className="text-neutral-500">Occasion</span>
                    <span className="font-semibold text-neutral-800">{product.occasion || "Festive / Party"}</span>
                  </div>
                  <div className="flex justify-between border-b border-neutral-100 pb-2">
                    <span className="text-neutral-500">Care</span>
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
    </div>
  );
}
