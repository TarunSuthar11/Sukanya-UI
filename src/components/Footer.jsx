import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { FiPhone, FiMail } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-linear-to-r from-emerald-600 to-emerald-700 py-12 text-white">
      
      {/* Styles : bg-linear-to-r from-amber-400 via-amber-300 to-orange-500 text-amber-50 py-12 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand / About */}
          <div className="space-y-3">
            <h2 className="text-2xl font-extrabold text-white">Sukanya</h2>
            <p className="text-sm leading-6 text-amber-50/80">
              Your trusted destination for premium handcrafted sarees.
              Discover timeless elegance, traditional craftsmanship, and modern designs
              that celebrate the beauty of Indian heritage.
            </p>
            <div className="flex items-center gap-3 text-sm text-amber-50/90">
              <FiPhone className="text-lg" />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-amber-50/90">
              <FiMail className="text-lg" />
              <span>care@sukanya.in</span>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Categories</h3>
            <ul className="space-y-2 text-sm text-amber-50/80">
              <li className="hover:text-white cursor-pointer">Silk Sarees</li>
              <li className="hover:text-white cursor-pointer">Cotton Sarees</li>
              <li className="hover:text-white cursor-pointer">Chiffon Sarees</li>
              <li className="hover:text-white cursor-pointer">Banarasi Sarees</li>
              <li className="hover:text-white cursor-pointer">Designer Sarees</li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Customer Support</h3>
            <ul className="space-y-2 text-sm text-amber-50/80">
              <li className="hover:text-white cursor-pointer">Help Center</li>
              <li className="hover:text-white cursor-pointer">Return Policy</li>
              <li className="hover:text-white cursor-pointer">Shipping Info</li>
              <li className="hover:text-white cursor-pointer">Track Order</li>
              <li className="hover:text-white cursor-pointer">Contact Us</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Join Our Newsletter</h3>
            <p className="text-sm text-amber-50/80">Stay updated on new arrivals & exclusive offers.</p>

            <div className="flex items-center mt-4 rounded-full overflow-hidden bg-white/10 border border-white/20 backdrop-blur">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 text-sm bg-transparent text-white placeholder:text-amber-100/70 focus:outline-none"
              />
              <button className="px-4 md:px-5 py-3 bg-white text-amber-700 text-sm font-semibold hover:bg-amber-50 transition">
                Send
              </button>
            </div>
            <p className="text-xs text-amber-50/70 mt-2">We respect your privacy. Unsubscribe anytime.</p>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-white/20 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Social Links */}
          <div className="flex space-x-4 text-xl">
            <FooterIcon Icon={FaFacebookF} />
            <FooterIcon Icon={FaInstagram} />
            <FooterIcon Icon={FaTwitter} />
            <FooterIcon Icon={FaLinkedinIn} />
          </div>

          {/* Copyright */}
          <p className="text-sm text-amber-50/80">
            © {new Date().getFullYear()} Sukanya. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

const FooterIcon = ({ Icon }) => (
  <span className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-white/10 border border-white/15 text-white hover:bg-white/20 transition">
    <Icon />
  </span>
);