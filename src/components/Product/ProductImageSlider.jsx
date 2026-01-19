import { useState } from "react";
import { motion } from "framer-motion";

export default function ProductImageSlider({ images = [] }) {
  const [active, setActive] = useState(0);

  if (!images.length) return null;

  return (
    <div className="flex gap-2 "> 
      {/* Thumbnails */}
      <div className="flex flex-col gap-2">
        {images.map((img, i) => (
          <button
            key={i}
            onMouseEnter={() => setActive(i)}
            onClick={() => setActive(i)}
            className={`border rounded-md overflow-hidden w-12 h-16 lg:w-18 lg:h-24 ${
              active === i ? "border-amber-500" : "border-gray-200"
            }`}
          >
            <img src={img} className="w-full h-full  object-cover" />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="relative flex-1 aspect-4/5 rounded-sm overflow-hidden bg-gray-100 shadow-lg">
        <motion.img
          key={active}
          src={images[active]}
          initial={{ opacity: 0.6, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className=" w-full h-full object-cover aspect-4/5"
        />

        {/* Arrows */}
        {/* <button
          onClick={() => setActive(a => (a > 0 ? a - 1 : images.length - 1))}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow"
        >
          ‹
        </button>
        <button
          onClick={() => setActive(a => (a < images.length - 1 ? a + 1 : 0))}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow"
        >
          ›
        </button> */}
      </div>
    </div>
  );
}