import { useState } from "react";
import { BsStarFill } from "react-icons/bs";

export default function ReviewPage({ product }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [images, setImages] = useState([]);
  const [review, setReview] = useState("");

  const handleImages = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length > 3) return alert("Only 3 images allowed");

    const previews = files.map(file => ({
      file,
      url: URL.createObjectURL(file)
    }));
    setImages(prev => [...prev, ...previews]);
  };

  const removeImage = (i) => {
    setImages(prev => prev.filter((_, idx) => idx !== i));
  };

  const submitReview = () => {
    if (!rating) return alert("Please give rating");
    if (!review.trim()) return alert("Please write review");

    const formData = new FormData();
    formData.append("rating", rating);
    formData.append("review", review);
    images.forEach(img => formData.append("images", img.file));

    console.log("Ready to send:", { rating, review, images });
    alert("Review Submitted (demo)");
  };

  return (
    <div className="  mx-auto px-4">
      <div className="  max-w-6xl  p-6 space-y-6">

        {/* Product Info */}
        <div className="flex items-center gap-4">
          <img
            src={product?.image || "https://via.placeholder.com/80"}
            alt="product"
            className="w-20 h-20 object-cover rounded-xl border"
          />
          <div>
            <h2 className="text-lg font-semibold text-gray-700">
              {product?.name || "Product Name"}
            </h2>
            <p className="text-sm text-gray-500">Write your honest review</p>
          </div>
        </div>

        {/* Rating */}
        <div>
          <p className="text-gray-600 font-medium mb-2">Your Rating</p>
          <div className="flex gap-2">
            {[1,2,3,4,5].map((num) => (
              <BsStarFill
                key={num}
                className={`text-3xl cursor-pointer transition ${
                  (hover || rating) >= num ? "text-emerald-500" : "text-gray-300"
                }`}
                onClick={() => setRating(num)}
                onMouseEnter={() => setHover(num)}
                onMouseLeave={() => setHover(0)}
              />
            ))}
          </div>
        </div>

        {/* Upload Images */}
        <div>
          <p className="text-gray-600 font-medium mb-2">Upload Images (Max 3)</p>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImages}
            className="block w-full text-sm text-gray-500"
          />

          <div className="flex gap-3 mt-3 flex-wrap">
            {images.map((img, i) => (
              <div key={i} className="relative">
                <img
                  src={img.url}
                  className="w-24 h-24 object-cover rounded-lg border"
                />
                <button
                  onClick={() => removeImage(i)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 text-xs rounded-full"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Review Text */}
        <div>
          <p className="text-gray-600 font-medium mb-2">Your Review</p>
          <textarea
            rows="5"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Write about quality, fitting, delivery, experience..."
            className="w-full border rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
        </div>

        {/* Submit */}
        <button
          onClick={submitReview}
          className="w-full py-3 rounded-full bg-linear-to-r from-emerald-400 to-green-500 text-white font-semibold shadow-lg hover:scale-105 transition"
        >
          Submit Review
        </button>
      </div>
    </div>
  );
}