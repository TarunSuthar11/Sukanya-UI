import { useMemo, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiTruck, FiShield, FiHeart } from "react-icons/fi";
import { BsCart2, BsStarFill } from "react-icons/bs";
import { LuShoppingCart } from "react-icons/lu";
import { IoMdAdd } from "react-icons/io";
import { FaMinus } from "react-icons/fa6";



import products from "../data/products";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useQuery } from "@tanstack/react-query";

import { fetchProduct } from "../service/ProductService";
import ReviewsCard from "../components/ReviewsCard";
import { fetchReviews } from "../service/ReviewService";
import ProductImageSlider from "../components/ProductImageSlider";



// Component for for information related to delivery, returns, and quality
const InfoPill = ({ icon, title, value }) => (
  <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white border border-gray-100 shadow-sm">
    <span className="text-emerald-500 text-2xl lg:text-3xl">{icon}</span>
    <div className="text-sm">
      <div className="font-semibold text-gray-600">{title}</div>
      <div className="text-gray-500">{value}</div>
    </div>
  </div>
);



export default function ProductDetailsPage() {


  const { productId } = useParams();

  const { data: productData, isLoading: productLoading, isFetching: productFetching } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => fetchProduct(productId),

    staleTime: 300000,
    cacheTime: 300000,
  });

  const { data: reviewData, isLoading: reviewsLoading, isError: reviewsError } = useQuery({
    queryKey: ["reviews", productId],
    queryFn: () => fetchReviews(productId),
    staleTime: 300000,
    cacheTime: 300000 //caching  for 30 seconds
  });


  const product = productData?.data;

  const reviewsByProduct = reviewData?.data;

  // console.log(reviewsByProduct);

  const reviews = reviewsByProduct?.reviews || [];

  const avgRating =
    reviews.length > 0
      ? Number(
        (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      )
      : 0;

  const navigate = useNavigate();

  const { addToCart } = useContext(CartContext);

  const [quantity, setQuantity] = useState(1);



  const [activeImage, setActiveImage] = useState('');

  const related = useMemo(() => {
    if (!product) return [];
    return products
      .filter((p) => p.id !== product.id)
      .slice(0, 4);
  }, [product]);


  const addItem = () => {
    addToCart(product, quantity);
  };

  const buyItem = () => {
    addToCart(product, quantity);
    navigate('/cart');
  };

  // const reviews = useMemo(() => {
  //   if (!product) return fallbackReviews;
  //   return reviewsByProductId[product.id] || fallbackReviews;
  // }, [product]);



  const discount = Math.max(
    0,
    Math.ceil(((product?.actualPrice - product?.currentPrice) * 100) / product?.actualPrice)
  );

  return (
    <div className="bg-gray-50 min-h-screen w-full overflow-x-hidden">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-14">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-600 mb-4 flex gap-2 flex-wrap">
          <Link to="/" className="hover:text-gray-700">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-gray-700">Shop</Link>
          <span>/</span>
          <span className="text-gray-700 font-medium">{product?.productName}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10">

          {/* <div className="space-y-4">
            <motion.div
              key={activeImage}
              initial={{ opacity: 0.6, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="aspect-4/5 rounded-sm overflow-hidden bg-gray-200 shadow-lg "
            >
              <img
                src={activeImage}
                alt={product.productName + " Image"}
                className="w-full h-full object-cover"
              />
            </motion.div>
            <div className="grid grid-cols-4 gap-3">
              {product.productImages?.map((img, idx) => (
                <button
                  key={img._id}
                  onClick={() => setActiveImage(img.url)}
                  className={`rounded-sm overflow-hidden  transition ${activeImage === img.url ? "scale-105" : "scale-100 "
                    }`}
                >
                  <img src={img.url} alt={`thumb-${idx}`} className="w-full h-22 object-cover" />
                </button>
              ))}
            </div>
          </div> */}

          {productFetching && productLoading ? (
            <div className="w-full aspect-4/5 rounded-sm overflow-hidden bg-gray-200 shadow-lg animate-pulse" />
          ) : (
            <ProductImageSlider images={product.productImages.map(i => i.url)} />
          )}


          {/* Details */}
          {productLoading ? (
            <div className="space-y-4">
              <div className="h-6 w-2/3 bg-gray-200 animate-pulse rounded" />
              <div className="h-4 w-1/3 bg-gray-200 animate-pulse rounded" />
              <div className="h-10 w-1/2 bg-gray-200 animate-pulse rounded" />
              <div className="h-20 w-full bg-gray-200 animate-pulse rounded" />
              <div className="grid grid-cols-3 gap-3">
                <div className="h-16 bg-gray-200 animate-pulse rounded" />
                <div className="h-16 bg-gray-200 animate-pulse rounded" />
                <div className="h-16 bg-gray-200 animate-pulse rounded" />
              </div>
              <div className="flex gap-4">
                <div className="h-12 w-40 bg-gray-200 animate-pulse rounded-full" />
                <div className="h-12 w-40 bg-gray-200 animate-pulse rounded-full" />
              </div>
            </div>) : (

            <div className="space-y-4">
              <div className="flex items-start   justify-between gap-4">
                <div>
                  <h1 className="text-2xl md:text-2xl font-bold text-gray-600 leading-tight">
                    {product.productName}
                  </h1>
                  {/* <p className="text-sm text-gray-500 mt-1">{product.productCategory || "Sarees"}</p> */}
                </div>
                <div className="flex items-center  gap-2 p-1 px-2 rounded-md border border-gray-300 ">
                  <span className="text-lg font-semibold text-gray-600">{avgRating.toPrecision(2) || '0 '}</span>
                  <BsStarFill className="text-emerald-600 text-lg" />
                </div>
              </div>



              <div className="flex items-center lg:mt-4 gap-3">
                <span className="text-gray-400 line-through text-xl">₹{product.actualPrice.toLocaleString()}</span>
                <span className="text-3xl font-semibold text-gray-800">₹{product.currentPrice.toLocaleString()}</span>
                {discount > 0 && <span className="text-green-600 text-xl ml-2 font-semibold">{discount}% OFF</span>}
              </div>

              <p className="text-gray-500 leading-relaxed">
                {product.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <InfoPill icon={<FiTruck />} title="Delivery" value="5-7 business days" />
                <InfoPill icon={<LuShoppingCart />} title="Returns" value="3-day easy returns" />
                <InfoPill icon={<FiShield />} title="Quality" value="Premium fabrics" />
              </div>

              {/* <div className="flex items-center gap-4">
              <div className="inline-flex items-center rounded-full border border-gray-200 bg-white ">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-2 text-gray-500 text-xl hover:text-gray-700 hover:scale-105 transition"
                >
                  <FaMinus />
                </button>
                <span className="px-2 py-2 text-gray-900 font-semibold">1</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-2 text-gray-500 text-2xl hover:text-gray-700 hover:scale-105 transition"
                >
                  <IoMdAdd />
                </button>
              </div>
              <div className="space-y-1 text-sm text-gray-500">
                <div>Inclusive of all taxes</div>
                <div>Cash on Delivery available</div>
              </div>
            </div> */}

              <div className="flex flex-wrap gap-5 mt-5">
                <button onClick={addItem} className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-linear-to-r from-amber-400 to-orange-500 text-white font-semibold shadow-lg hover:scale-105 transition">
                  Add to Cart
                </button>
                <button onClick={buyItem} className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-linear-to-r from-yellow-400 to-yellow-500 text-white font-semibold shadow-lg hover:scale-105 transition">
                  Buy Now
                </button>
              </div>

              <div className="mt-5 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm pl-6 md:pl-12">
                <h3 className="text-lg font-semibold text-gray-600 mb-2">Product Details</h3>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li><span className="font-semibold">Fabric:</span> {product.fabric || "N/A"}</li>
                  {product.blouseIncluded && (
                    <li><span className="font-semibold">Blouse length:</span> {product.blouseLength || "N/A"}</li>
                  )}
                  <li><span className="font-semibold">Saree length:</span> {product.sareeLength || "N/A"}</li>
                  <li><span className="font-semibold">Care:</span> {product.washCare || "Dry Wash Recommended"}</li>
                  <li><span className="font-semibold">Occasion:</span> {product.occasion || "N/A"}</li>
                  <li><span className="font-semibold">Brand:</span> {product.brand || "N/A"}</li>
                  <li><span className="font-semibold">Origin:</span> Handcrafted in India</li>
                  <li><span className="font-semibold">Inclusions:</span> Saree with running blouse piece</li>
                </ul>
              </div>
            </div>)}
        </div>
      </div>

      {/* Reviews and Related Products */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-10 md:py-14">




        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-12">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-gray-900">You may also like</h3>
              <Link to="/shop" className="text-amber-700 font-semibold text-sm hover:text-amber-800">
                View all
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map((item) => (
                <Link
                  to={`/products/${item.id}`}
                  key={item.id}
                  className="bg-white rounded-2xl border border-amber-100 shadow-md overflow-hidden hover:shadow-lg transition"
                >
                  <div className="h-52 bg-amber-50 overflow-hidden">
                    <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4 space-y-1">
                    <h4 className="font-semibold text-gray-900 line-clamp-2">{item.name}</h4>
                    <div className="flex items-center gap-2">
                      <span className="text-amber-800 font-bold">₹{item.currentPrice.toLocaleString()}</span>
                      {item.actualPrice > item.currentPrice && (
                        <span className="text-gray-400 line-through text-sm">₹{item.actualPrice.toLocaleString()}</span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Reviews */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold text-gray-900">Reviews</h3>
            <span className="text-sm text-gray-500">
              {reviewsByProduct?.reviews.length} review{reviewsByProduct?.reviews.length !== 1 ? "s" : ""}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {reviewsByProduct?.reviews.map((review) => (
              <ReviewsCard key={review._id} review={review} />
            ))}
          </div>
        </div>
      </div>
    </div >
  );
}

