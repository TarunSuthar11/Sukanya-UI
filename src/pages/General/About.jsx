

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Phone } from "lucide-react";
import { FaGem, FaCheckCircle, FaHeart } from "react-icons/fa";

const qualities = [
  {
    title: "Premium Quality Products",
    description:
      "We use carefully selected materials to ensure durability, comfort, and a premium feel in every product.",
    icon: <FaGem className="text-pink-500 text-3xl" />,
  },
  {
    title: "Strict Quality Assurance",
    description:
      "Every product goes through multiple quality checks before delivery, so you always receive the best.",
    icon: <FaCheckCircle className="text-green-500 text-3xl" />,
  },
  {
    title: "Trusted by Customers",
    description:
      "Thousands of satisfied customers trust Sukanya for consistent quality, honest pricing, and great service.",
    icon: <FaHeart className="text-red-500 text-3xl" />,
  },
];

export default function AboutUs() {
  return (
    <div className="min-h-screen px-4 flex flex-col justify-center mx-auto bg-gray-50">

      <section className="py-16 px-4 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <motion.img
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=600&q=80"
          alt="Founder"
          className="w-full h-[350px] object-cover rounded-2xl shadow-lg"
        />
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold">Our Founder</h2>
          <p className="mt-4 text-gray-600">
            Sukanya was founded by <span className="font-semibold text-gray-800">Anand Suthar</span> with a deep passion for traditional Indian craftsmanship
            and timeless elegance. Our founder envisioned a place where women could find authentic,
            high-quality sarees that reflect culture, grace, and trust.
          </p>

          <p className="mt-2 text-gray-600">
            Each Saree at Sukanya is carefully handpicked, quality-checked, and offered with complete
            transparency, ensuring you receive beauty, comfort, and confidence in every drape.
          </p>
        </motion.div>
      </section>

      {/* Product Quality Section */}

      <section className="bg-gray-50 py-4 px-4">
        <div className="mx-auto text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            Why Customers Trust Sukanya
          </h2>
          <p className="mt-3 text-gray-500 max-w-2xl mx-auto">
            We believe trust is built through quality, transparency, and customer satisfaction.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {qualities.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-lg transition duration-300"
            >
              <div className="flex justify-center mb-4">
                <div className="bg-gray-100 p-4 rounded-full">
                  {item.icon}
                </div>
              </div>

              <span className="text-xl font-semibold text-gray-600">
                {item.title}
              </span>

              <p className="mt-3 text-gray-500 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>



      {/* Video Section */}
      {/* <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold text-center">Inside Our Shop</h2>
        <div className="mt-6 relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="Shop Video"
            allowFullScreen
          />
        </div>
      </section> */}

      {/* Location & Contact Section */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold">Visit Our Shop</h2>
            <p className="mt-4 text-gray-600 flex items-center gap-2">
              <MapPin className="w-5 h-5" /> Near SBI Bank, IOC Rd, Chandkheda,
              <br />
              Ahmedabad, Gujarat 382424
            </p>
            <p className="mt-2 text-gray-600 flex items-center gap-2">
              <Phone className="w-5 h-5" /> +91 9166799789
            </p>
            <a
              href="tel:+919166799789"
              className="inline-block mt-4 btn-primary text-white px-6 py-2 rounded-xl"
            >
              Call Now
            </a>
          </div>
          <div className="w-full h-[300px] rounded-2xl overflow-hidden shadow-lg">
            <iframe
              className="w-full h-full"
              src="https://www.google.com/maps?q=Sukanya+Sarees+and+Cholis,+Nr+SBI+Bank,+IOC+Rd,+Chandkheda,+Ahmedabad,+Gujarat+382424&output=embed"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Footer Text */}
      <section className="py-3 text-center text-gray-600">
        <p>Sukanya is not just a shop — it’s a promise of quality, trust, and happiness.</p>
      </section>
    </div>
  );
}
