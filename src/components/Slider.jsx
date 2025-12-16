import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const slides = [
  {
    id: 1,
    title: "Elegant Silk Collection",
    subtitle: "Timeless Beauty, Modern Elegance",
    description: "Discover our exquisite collection of handcrafted silk sarees",
    image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=1200&h=600&fit=crop",
    cta: "Shop Silk Sarees",
    link: "/category/silk",
    bgGradient: "from-purple-900/80 to-pink-900/80"
  },
  {
    id: 2,
    title: "Premium Banarasi Collection",
    subtitle: "Royal Heritage, Contemporary Style",
    description: "Luxurious Banarasi sarees with intricate zari work",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1200&h=600&fit=crop",
    cta: "Explore Collection",
    link: "/shop",
    bgGradient: "from-amber-900/80 to-orange-900/80"
  },
  {
    id: 3,
    title: "Summer Chiffon Collection",
    subtitle: "Light & Airy, Perfect for Every Occasion",
    description: "Beautiful chiffon sarees for your summer wardrobe",
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=1200&h=600&fit=crop",
    cta: "Shop Now",
    link: "/category/chiffon",
    bgGradient: "from-blue-900/80 to-indigo-900/80"
  },
  {
    id: 4,
    title: "Handloom Cotton Collection",
    subtitle: "Comfort Meets Tradition",
    description: "Eco-friendly handloom cotton sarees for everyday elegance",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=1200&h=600&fit=crop",
    cta: "View Collection",
    link: "/category/cotton",
    bgGradient: "from-green-900/80 to-teal-900/80"
  }
];

export default function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000); // Resume auto-play after 10 seconds
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
          >
            <div className={`absolute inset-0 bg-gradient-to-r ${slides[currentSlide].bgGradient}`} />
          </div>

          {/* Content */}
          <div className="relative z-10 h-full flex items-center justify-center px-4 md:px-8 lg:px-16">
            <div className="max-w-4xl text-center text-white">
              <motion.h2
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4"
              >
                {slides[currentSlide].title}
              </motion.h2>
              <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-lg md:text-2xl lg:text-3xl mb-4 font-light"
              >
                {slides[currentSlide].subtitle}
              </motion.p>
              <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-sm md:text-lg mb-8 max-w-2xl mx-auto"
              >
                {slides[currentSlide].description}
              </motion.p>
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Link
                  to={slides[currentSlide].link}
                  className="inline-block bg-white text-amber-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-amber-100 hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  {slides[currentSlide].cta}
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 text-white transition-all duration-300 hover:scale-110"
        aria-label="Previous slide"
      >
        <IoIosArrowBack className="text-2xl md:text-3xl" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 text-white transition-all duration-300 hover:scale-110"
        aria-label="Next slide"
      >
        <IoIosArrowForward className="text-2xl md:text-3xl" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "w-8 bg-white"
                : "w-3 bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

