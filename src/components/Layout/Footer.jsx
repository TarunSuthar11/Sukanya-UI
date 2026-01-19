import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gradient-elegant text-white py-16 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

          {/* Brand / About */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
              Sukanya
            </h2>
            <p className="text-sm leading-relaxed text-white/80">
              Your trusted destination for premium handcrafted sarees.
              Discover timeless elegance, traditional craftsmanship, and modern designs
              that celebrate the beauty of Indian heritage.
            </p>
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-3 text-sm text-white/90">
                <FiPhone className="text-lg text-accent-400" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/90">
                <FiMail className="text-lg text-accent-400" />
                <span>care@sukanya.in</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/90">
                <FiMapPin className="text-lg text-accent-400" />
                <span>Mumbai, Maharashtra</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm text-white/80">
              <li>
                <Link to="/shop" className="hover:text-accent-300 transition-colors duration-300 hover:translate-x-1 inline-block">
                  Shop All Sarees
                </Link>
              </li>
              <li>
                <Link to="/category" className="hover:text-accent-300 transition-colors duration-300 hover:translate-x-1 inline-block">
                  Browse Categories
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-accent-300 transition-colors duration-300 hover:translate-x-1 inline-block">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-accent-300 transition-colors duration-300 hover:translate-x-1 inline-block">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link to="/sign-in" className="hover:text-accent-300 transition-colors duration-300 hover:translate-x-1 inline-block">
                  My Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Customer Support
            </h3>
            <ul className="space-y-2.5 text-sm text-white/80">
              <li className="hover:text-accent-300 cursor-pointer transition-colors duration-300 hover:translate-x-1 inline-block">
                Help Center
              </li>
              <li className="hover:text-accent-300 cursor-pointer transition-colors duration-300 hover:translate-x-1 inline-block">
                Return Policy
              </li>
              <li className="hover:text-accent-300 cursor-pointer transition-colors duration-300 hover:translate-x-1 inline-block">
                Shipping Info
              </li>
              <li className="hover:text-accent-300 cursor-pointer transition-colors duration-300 hover:translate-x-1 inline-block">
                Track Order
              </li>
              <li className="hover:text-accent-300 cursor-pointer transition-colors duration-300 hover:translate-x-1 inline-block">
                Contact Us
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Stay Connected
            </h3>
            <p className="text-sm text-white/80 mb-4">
              Subscribe to get special offers, free giveaways, and exclusive deals.
            </p>

            <div className="flex items-center rounded-full overflow-hidden bg-white/10 border border-white/20 backdrop-blur-sm mb-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 text-sm bg-transparent text-white placeholder:text-white/60 focus:outline-none"
              />
              <button className="px-5 py-3 bg-accent-500 hover:bg-accent-600 text-white text-sm font-semibold transition-colors duration-300">
                Subscribe
              </button>
            </div>
            <p className="text-xs text-white/60">
              We respect your privacy. Unsubscribe anytime.
            </p>

            {/* Social Links */}
            <div className="flex gap-3 mt-6">
              <FooterIcon Icon={FaFacebookF} />
              <FooterIcon Icon={FaInstagram} />
              <FooterIcon Icon={FaTwitter} />
              <FooterIcon Icon={FaLinkedinIn} />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <p className="text-sm text-white/80">
            © {new Date().getFullYear()} Sukanya. All Rights Reserved. Crafted with love for saree enthusiasts.
          </p>

          {/* Payment Methods */}
          <div className="flex items-center gap-2 text-xs text-white/60">
            <span>We accept:</span>
            <div className="flex gap-2">
              <div className="px-2 py-1 bg-white/10 rounded text-white/80">Visa</div>
              <div className="px-2 py-1 bg-white/10 rounded text-white/80">Mastercard</div>
              <div className="px-2 py-1 bg-white/10 rounded text-white/80">UPI</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

const FooterIcon = ({ Icon }) => (
  <a
    href="#"
    className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-white/10 border border-white/20 text-white hover:bg-accent-500 hover:border-accent-500 transition-all duration-300 hover:scale-110"
  >
    <Icon />
  </a>
);