import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import slider1 from "../../assets/slider1.png";
import slider2 from "../../assets/slider2.png";
import slider3 from "../../assets/slider3.png";
import slider4 from "../../assets/slider4.png";

const slides = [
  {
    id: 1,
    title: "Elegant Silk Collection",
    subtitle: "Timeless Beauty, Modern Elegance",
    description: "Discover our exquisite collection of handcrafted silk sarees",
    image: slider1,
    cta: "Shop Silk Sarees",
    link: "/shop",
    bgGradient: "from-purple-900/60 via-magenta-900/40 to-transparent"
  },
  {
    id: 2,
    title: "Premium Banarasi Collection",
    subtitle: "Royal Heritage, Contemporary Style",
    description: "Luxurious Banarasi sarees with intricate zari work",
    image: slider2,
    cta: "Explore Collection",
    link: "/shop",
    bgGradient: "from-primary-900/60 via-magenta-900/40 to-transparent"
  },
  {
    id: 3,
    title: "Summer Chiffon Collection",
    subtitle: "Light & Airy, Perfect for Every Occasion",
    description: "Beautiful chiffon sarees for your summer wardrobe",
    image: slider3,
    cta: "Shop Now",
    link: "/shop",
    bgGradient: "from-secondary-900/60 via-primary-900/40 to-transparent"
  },
  {
    id: 4,
    title: "Handloom Cotton Collection",
    subtitle: "Comfort Meets Tradition",
    description: "Eco-friendly handloom cotton sarees for everyday elegance",
    image: slider4,
    cta: "View Collection",
    link: "/shop",
    bgGradient: "from-teal-900/60 via-secondary-900/40 to-transparent"
  }
];

export default function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
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
    <div className="relative w-full h-[450px] md:h-[550px] lg:h-[650px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
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
          <div className="relative z-10 h-full flex items-center justify-center md:justify-start px-6 md:px-12 lg:px-20">
            <div className="max-w-2xl text-center md:text-left text-white">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-4 border border-white/20"
              >
                New Collection
              </motion.div>

              <motion.h2
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                {slides[currentSlide].title}
              </motion.h2>

              <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-lg md:text-xl lg:text-2xl mb-3 font-light text-white/90"
              >
                {slides[currentSlide].subtitle}
              </motion.p>

              <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-sm md:text-base mb-8 max-w-xl text-white/80"
              >
                {slides[currentSlide].description}
              </motion.p>

              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <Link
                  to={slides[currentSlide].link}
                  className="inline-block bg-white text-primary-700 px-8 py-4 rounded-full font-semibold text-base md:text-lg hover:bg-accent-400 hover:text-white hover:scale-105 transition-all duration-300 shadow-2xl"
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
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full p-3 md:p-4 text-white transition-all duration-300 hover:scale-110 border border-white/30"
        aria-label="Previous slide"
      >
        <IoIosArrowBack className="text-xl md:text-2xl" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full p-3 md:p-4 text-white transition-all duration-300 hover:scale-110 border border-white/30"
        aria-label="Next slide"
      >
        <IoIosArrowForward className="text-xl md:text-2xl" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 md:h-2.5 rounded-full transition-all duration-300 ${index === currentSlide
              ? "w-8 md:w-10 bg-white shadow-lg"
              : "w-2 md:w-2.5 bg-white/50 hover:bg-white/75"
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
