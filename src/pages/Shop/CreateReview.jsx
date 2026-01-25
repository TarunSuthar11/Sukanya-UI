import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useGetProductDetails } from "../../hooks/useProductHooks";
import { useCreateReview } from "../../hooks/useReviewHooks";
import { BsStarFill, BsStar } from "react-icons/bs";
import { FaArrowLeft, FaCloudUploadAlt, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function CreateReview() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [images, setImages] = useState([]);

  const { data: productData, isLoading: productLoading } = useGetProductDetails(productId);
  const createReviewMutation = useCreateReview();

  const product = productData?.data;

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > 3) {
      alert("Authentic reviews only allow up to 3 images.");
      return;
    }

    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    setImages([...images, ...newImages]);
  };

  const removeImage = (index) => {
    const newImages = [...images];
    URL.revokeObjectURL(newImages[index].preview);
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) return alert("Please select a rating to share your experience.");
    if (comment.length < 10) return alert("Please share a bit more about your experience (min 10 characters).");

    const formData = new FormData();
    formData.append("productId", productId);
    formData.append("rating", rating);
    formData.append("comment", comment);
    images.forEach(img => {
      formData.append("reviewImage", img.file);
    });

    createReviewMutation.mutate(formData, {
      onSuccess: () => {
        setTimeout(() => navigate(-1), 2000);
      }
    });
  };

  if (productLoading) return (
    <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-primary-100 border-t-primary-600 rounded-full animate-spin"></div>
        <p className="font-serif text-neutral-500">Preparing atelier for your review...</p>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-[#FAF9F6] pt-24 pb-20 px-4 sm:px-8 lg:px-16"
    >
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-neutral-400 hover:text-black transition-all text-[10px] font-black uppercase tracking-[0.2em] mb-12 group"
        >
          <FaArrowLeft size={10} className="group-hover:-translate-x-1 transition-transform" />
          Back to Order
        </button>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Sidebar: Product Info */}
          <div className="lg:col-span-2">
            <div className="sticky top-32 space-y-8">
              <div className="aspect-[3/4] rounded-[2rem] overflow-hidden shadow-2xl border border-white">
                <img
                  src={product?.productImages[0]?.url}
                  alt={product?.productName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-600 mb-2 block">The Masterpiece</span>
                <h1 className="text-3xl font-bold text-neutral-900 leading-tight mb-4" style={{ fontFamily: 'Tenor Sans, sans-serif' }}>
                  {product?.productName}
                </h1>
                <p className="text-xs text-neutral-500 font-light leading-relaxed">
                  Your feedback helps our artisans refine their craft and assists the community in making informed choices.
                </p>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-neutral-100 shadow-[0_20px_60px_rgba(0,0,0,0.02)]">
              <form onSubmit={handleSubmit} className="space-y-10">
                {/* Rating Selection */}
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-300 ml-1">Overall Experience</label>
                  <div className="flex gap-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className="transition-transform active:scale-90"
                        onMouseEnter={() => setHover(star)}
                        onMouseLeave={() => setHover(0)}
                        onClick={() => setRating(star)}
                      >
                        {(hover || rating) >= star ? (
                          <BsStarFill className="text-3xl text-neutral-900" />
                        ) : (
                          <BsStar className="text-3xl text-neutral-200" />
                        )}
                      </button>
                    ))}
                    <span className="ml-4 text-xs font-bold text-neutral-400 self-center">
                      {rating === 5 ? "Exquisite" : rating === 4 ? "Beautiful" : rating === 3 ? "Authentic" : rating === 2 ? "Modest" : rating === 1 ? "Disappointing" : "Choose Level"}
                    </span>
                  </div>
                </div>

                {/* Comment */}
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-300 ml-1">Your Detailed Feedback</label>
                  <textarea
                    rows="6"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Describe the fabric, the fall, the drape, and your overall emotion..."
                    className="w-full bg-neutral-50 border border-neutral-100 rounded-2xl p-6 text-sm focus:ring-2 focus:ring-primary-50 focus:border-primary-200 outline-none transition-all placeholder:text-neutral-300 resize-none font-light"
                  />
                </div>

                {/* Image Upload */}
                <div className="space-y-6">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-300 ml-1">Gallery Contribution (Max 3)</label>
                  <div className="grid grid-cols-4 gap-4">
                    {images.map((img, idx) => (
                      <div key={idx} className="relative aspect-square rounded-xl overflow-hidden group">
                        <img src={img.preview} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => removeImage(idx)}
                          className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"
                        >
                          <FaTimes size={16} />
                        </button>
                      </div>
                    ))}
                    {images.length < 3 && (
                      <label className="aspect-square rounded-xl border-2 border-dashed border-neutral-100 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-neutral-50 hover:border-primary-200 transition-all text-neutral-300 hover:text-primary-500 group">
                        <FaCloudUploadAlt size={24} className="group-hover:-translate-y-1 transition-transform" />
                        <span className="text-[8px] font-black uppercase tracking-widest">Add Muse</span>
                        <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageChange} />
                      </label>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={createReviewMutation.isPending}
                  className="w-full py-5 bg-neutral-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] hover:bg-black transition-all active:scale-95 shadow-xl shadow-neutral-200 disabled:opacity-50"
                >
                  {createReviewMutation.isPending ? "CURATING FEEDBACK..." : "PUBLISH REVIEW"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}