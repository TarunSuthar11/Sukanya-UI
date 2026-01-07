import { useMemo, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiTruck, FiShield, FiHeart } from "react-icons/fi";
import { BsCart2, BsStarFill } from "react-icons/bs";
import products from "../data/products";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const reviewsByProductId = {
  SR0001: [
    {
      id: "r1",
      name: "Ananya S.",
      rating: 5,
      date: "Jan 2025",
      comment: "Loved the drape and the intricate kalamkari motifs. Perfect for daytime events.",
      images: [
        "https://source.unsplash.com/600x600/?saree,detail&sig=21",
        "https://source.unsplash.com/600x600/?saree,texture&sig=22"
      ]
    },
    {
      id: "r2",
      name: "Meera K.",
      rating: 4,
      date: "Dec 2024",
      comment: "Fabric is soft and breathable. Colors are slightly softer than the photos but still elegant.",
      images: ["https://source.unsplash.com/600x600/?saree,blouse&sig=23"]
    }
  ]
};

const fallbackReviews = [
  {
    id: "r-default-1",
    name: "Priya",
    rating: 5,
    date: "Feb 2025",
    comment: "Gorgeous saree, rich colors and premium feel. Delivery was quick.",
    images: ["https://source.unsplash.com/600x600/?saree,pattern&sig=24"]
  },
  {
    id: "r-default-2",
    name: "Shreya",
    rating: 4,
    date: "Jan 2025",
    comment: "The fabric feels luxurious and the fall is great. Blouse piece quality is good too.",
    images: []
  },
  {
    id: "r-default-3",
    name: "Nidhi",
    rating: 5,
    date: "Dec 2024",
    comment: "Exactly as shown. Loved the packaging and the subtle zari details.",
    images: ["https://source.unsplash.com/600x600/?saree,zari&sig=25"]
  }
];

export default function ProductDetailsPage() {
  const { productId } = useParams();
  const product = products.find((p) => p.id === productId);

  const navigate = useNavigate();

  const { addToCart } = useContext(CartContext);

  const [quantity, setQuantity] = useState(1);

  const gallery = useMemo(() => {
    if (!product) return [];
    return [
      product.imageUrl,
      `https://source.unsplash.com/1000x1200/?saree,ethnic&sig=${product.id}-1`,
      `https://source.unsplash.com/1000x1200/?saree,traditional&sig=${product.id}-2`,
      `https://source.unsplash.com/1000x1200/?saree,fabric&sig=${product.id}-3`
    ];
  }, [product]);

  const [activeImage, setActiveImage] = useState(gallery[0]);

  const related = useMemo(() => {
    if (!product) return [];
    return products
      .filter((p) => p.id !== product.id)
      .slice(0, 4);
  }, [product]);

  const addItem = () => {
    addToCart(product, quantity);
    navigate("/cart");
  };

  const reviews = useMemo(() => {
    if (!product) return fallbackReviews;
    return reviewsByProductId[product.id] || fallbackReviews;
  }, [product]);

  if (!product) return <p className="text-center mt-20">Product not found</p>;

  const discount = Math.max(
    0,
    Math.ceil(((product.actualPrice - product.currentPrice) * 100) / product.actualPrice)
  );

  return (
    <div className="bg-gradient-to-b from-amber-50 via-white to-orange-50 min-h-screen w-full overflow-x-hidden">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-10 md:py-14">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-4 flex gap-2 flex-wrap">
          <Link to="/" className="hover:text-amber-700">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-amber-700">Shop</Link>
          <span>/</span>
          <span className="text-gray-700 font-medium">{product.name}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10">
          {/* Gallery */}
          <div className="space-y-4">
            <motion.div
              key={activeImage}
              initial={{ opacity: 0.6, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="aspect-[4/5] rounded-3xl overflow-hidden bg-amber-50 shadow-lg border border-amber-100"
            >
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </motion.div>
            <div className="grid grid-cols-4 gap-3">
              {gallery.map((img, idx) => (
                <button
                  key={img}
                  onClick={() => setActiveImage(img)}
                  className={`rounded-2xl overflow-hidden border transition ${
                    activeImage === img ? "border-amber-500 ring-2 ring-amber-200" : "border-transparent"
                  }`}
                >
                  <img src={img} alt={`thumb-${idx}`} className="w-full h-20 object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                  {product.name}
                </h1>
                <p className="text-sm text-gray-500 mt-1">{product.category || "Sarees"}</p>
              </div>
              <button className="text-amber-700 hover:text-amber-800 p-2 rounded-full bg-amber-50 border border-amber-100">
                <FiHeart className="text-xl" />
              </button>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-amber-800">₹{product.currentPrice.toLocaleString()}</span>
              {product.actualPrice > product.currentPrice && (
                <>
                  <span className="text-gray-400 line-through text-lg">₹{product.actualPrice.toLocaleString()}</span>
                  {discount > 0 && <span className="text-green-600 font-semibold">{discount}% OFF</span>}
                </>
              )}
            </div>

            <p className="text-gray-700 leading-relaxed">
              {product.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <InfoPill icon={<FiTruck />} title="Delivery" value="3-5 business days" />
              <InfoPill icon={<BsCart2 />} title="Returns" value="7-day easy returns" />
              <InfoPill icon={<FiShield />} title="Quality" value="Premium fabrics" />
            </div>

            <div className="flex items-center gap-4">
              <div className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50/60">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-2 text-amber-800 hover:text-amber-900"
                >
                  -
                </button>
                <span className="px-4 py-2 text-gray-900 font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-2 text-amber-800 hover:text-amber-900"
                >
                  +
                </button>
              </div>
              <div className="space-y-1 text-sm text-gray-500">
                <div>Inclusive of all taxes</div>
                <div>Cash on Delivery available</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button onClick={addItem} className="inline-flex items-center justify-center px-5 py-3 rounded-full bg-gradient-to-r from-amber-600 to-orange-500 text-white font-semibold shadow-lg hover:shadow-xl transition">
                Add to Cart
              </button>
              <button className="inline-flex items-center justify-center px-5 py-3 rounded-full border border-amber-200 text-amber-800 font-semibold hover:bg-amber-50 transition">
                Buy Now
              </button>
            </div>

            <div className="mt-6 p-4 rounded-2xl bg-white border border-amber-100 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Product Details</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>Fabric: Premium blend</li>
                <li>Care: Dry clean recommended</li>
                <li>Origin: Handcrafted in India</li>
                <li>Inclusions: Saree with running blouse piece</li>
              </ul>
            </div>
          </div>
        </div>

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
              {reviews.length} review{reviews.length !== 1 ? "s" : ""}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-2xl border border-amber-100 shadow-md p-5 space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-semibold text-gray-900">{review.name}</div>
                    <div className="text-xs text-gray-500">{review.date}</div>
                  </div>
                  <div className="flex items-center gap-1 text-amber-500">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <BsStarFill
                        key={idx}
                        className={`text-sm ${idx < review.rating ? "opacity-100" : "opacity-20"}`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{review.comment}</p>
                {review.images?.length > 0 && (
                  <div className="grid grid-cols-3 gap-2">
                    {review.images.slice(0, 3).map((img, idx) => (
                      <div key={idx} className="rounded-xl overflow-hidden bg-amber-50 h-24">
                        <img src={img} alt={`review-${idx}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const InfoPill = ({ icon, title, value }) => (
  <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white border border-amber-100 shadow-sm">
    <span className="text-amber-700 text-xl">{icon}</span>
    <div className="text-sm">
      <div className="font-semibold text-gray-900">{title}</div>
      <div className="text-gray-600">{value}</div>
    </div>
  </div>
);