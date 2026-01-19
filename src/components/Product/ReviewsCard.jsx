import { useState } from 'react'
import { BsStarFill } from 'react-icons/bs'
import { FaChevronCircleLeft, FaChevronCircleRight } from 'react-icons/fa'
import { MdClose } from "react-icons/md";



const ReviewsCard = ({ review }) => {

    const [open, setOpen] = useState(false);
    const [images, setImages] = useState([]);
    const [index, setIndex] = useState(0);
    const [startX, setStartX] = useState(null);

    return (
        <div key={review?._id} className="bg-white rounded-lg border border-gray-100 shadow-md p-4 space-y-3">
            <div className="flex items-start justify-between gap-3">
                <div>
                    <div className="font-semibold text-lg text-gray-800">
                        {review?.user?.firstName ? review.user.firstName : "Guest"}
                        {review?.user?.lastName ? review.user.lastName : ""}
                    </div>
                    <div className="text-xs text-gray-500">{new Date(review.createdAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                    })}</div>
                </div>
                <div className="flex items-center gap-1 text-amber-500">
                    {Array.from({ length: review.rating }).map((_, idx) => (
                        <BsStarFill key={idx} className={`text-sm ${idx < review.rating ? "opacity-100" : "opacity-20"}`} />
                    ))}
                </div>
            </div>

            <p className="text-sm text-gray-700 leading-relaxed">{review.comment}</p>

            {review.reviewImages?.length > 0 && (
                <div className="flex gap-4">
                    {review.reviewImages?.slice(0, 3).map((img, idx) => (
                        <div
                            key={idx}
                            className="rounded-lg overflow-hidden bg-amber-50 shadow-md aspect-4/5 border border-gray-200 h-32"
                        >
                            <img
                                src={img.url}
                                onClick={() => {
                                    setImages(review.reviewImages.map(i => i.url));
                                    setIndex(idx);
                                    setOpen(true);
                                }}
                                alt={`review-${idx}`}
                                className="w-full h-full object-cover cursor-pointer"
                            />
                        </div>
                    ))}
                </div>
            )}

            {open && (
                <div
                    className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center"
                    onClick={() => setOpen(false)}   // click outside closes
                >
                    {/* Stop closing when clicking inside content */}
                    <div
                        className="relative flex items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setOpen(false)}
                            className="absolute -top-10 right-0 text-white text-4xl"
                        >
                            <MdClose />
                        </button>

                        <button
                            onClick={() => setIndex(i => (i > 0 ? i - 1 : images.length - 1))}
                            className="absolute -left-4 text-white/80 text-5xl"
                        >
                            <FaChevronCircleLeft />
                        </button>

                        <img
                            src={images[index]}
                            className="max-h-[90vh] max-w-[90vw] object-contain"
                            onTouchStart={(e) => setStartX(e.touches[0].clientX)}
                            onTouchEnd={(e) => {
                                if (startX === null) return;
                                const endX = e.changedTouches[0].clientX;
                                const diff = startX - endX;

                                if (diff > 50) {
                                    setIndex(i => (i < images.length - 1 ? i + 1 : 0));
                                } else if (diff < -50) {
                                    setIndex(i => (i > 0 ? i - 1 : images.length - 1));
                                }
                                setStartX(null);
                            }}
                        />

                        <button
                            onClick={() => setIndex(i => (i < images.length - 1 ? i + 1 : 0))}
                            className="absolute -right-4 text-white/80 text-5xl"
                        >
                            <FaChevronCircleRight />
                        </button>
                    </div>
                </div>
            )}

        </div>
    )
}

export default ReviewsCard