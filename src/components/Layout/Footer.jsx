import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-primary-50 border-t border-primary-100 text-neutral-800 py-16 mt-20">
      <div className="max-w-7xl mx-auto px-8">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand ke abre me */}
          <div className="space-y-6">
            <h2 className="text-3xl tracking-wider font-bold text-primary-700 mb-2">
              Sukanya
            </h2>
            <p className="text-sm leading-relaxed text-neutral-600">
              Your trusted destination for premium handcrafted sarees.
              Discover timeless elegance, traditional craftsmanship, and modern designs
              that celebrate the beauty of Indian heritage.
            </p>
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-sm group cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:bg-primary-100 transition-colors">
                  <FiPhone className="text-primary-600" />
                </div>
                <span className="group-hover:text-primary-700 transition-colors">
                  <a href="tel:+919166799789">+91 9166799789</a>
                </span>

              </div>
              <div className="flex items-center gap-3 text-sm group cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:bg-primary-100 transition-colors">
                  <FiMail className="text-primary-600" />
                </div>
                <span className="group-hover:text-primary-700 transition-colors">
                  <a href="mailto:sukanya.saree.store@gmail.com" target="_blank">sukanya.saree.store@gmail.com</a>
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm group cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:bg-primary-100 transition-colors">
                  <FiMapPin className="text-primary-600" />
                </div>
                <span className="group-hover:text-primary-700 transition-colors">Ahmedabad, Gujrat</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-medium  text-primary-900 mb-6 relative inline-block after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-8 after:h-0.5 after:bg-primary-300">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/shop" className="text-neutral-600 hover:text-primary-600 transition-all duration-300 hover:translate-x-1 inline-block">
                  Shop All Sarees
                </Link>
              </li>
              <li>
                <Link to="/category" className="text-neutral-600 hover:text-primary-600 transition-all duration-300 hover:translate-x-1 inline-block">
                  Browse Categories
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-neutral-600 hover:text-primary-600 transition-all duration-300 hover:translate-x-1 inline-block">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-neutral-600 hover:text-primary-600 transition-all duration-300 hover:translate-x-1 inline-block">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link to="/sign-in" className="text-neutral-600 hover:text-primary-600 transition-all duration-300 hover:translate-x-1 inline-block">
                  My Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Support.    pending */}
          <div>
            <h3 className="text-lg font-medium text-primary-900 mb-6 relative inline-block after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-8 after:h-0.5 after:bg-primary-300">
              Support
            </h3>
            <ul className="flex flex-col gap-3 text-sm text-neutral-600">
              <li className="hover:text-primary-600 cursor-pointer transition-all duration-300 hover:translate-x-1 inline-block">
                Help Center
              </li>
              <li className="hover:text-primary-600 cursor-pointer transition-all duration-300 hover:translate-x-1 inline-block">
                Return Policy
              </li>
              <li className="hover:text-primary-600 cursor-pointer transition-all duration-300 hover:translate-x-1 inline-block">
                Shipping Info
              </li>
              <li className="hover:text-primary-600 cursor-pointer transition-all duration-300 hover:translate-x-1 inline-block">
                Track Order
              </li>
              <li className="hover:text-primary-600 cursor-pointer transition-all duration-300 hover:translate-x-1 inline-block">
                Contact Us
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-medium text-primary-900 mb-6 relative inline-block after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-8 after:h-0.5 after:bg-primary-300">
              Stay Connected
            </h3>
            <p className="text-sm text-neutral-600 mb-6">
              Subscribe to get special offers, free giveaways, and exclusive deals.
            </p>

            <div className="flex items-center rounded-xl overflow-hidden bg-white shadow-sm border border-primary-100 mb-3 focus-within:ring-2 focus-within:ring-primary-100 transition-all">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 text-sm bg-transparent text-neutral-800 placeholder:text-neutral-400 focus:outline-none"
              />
              <button className="px-5 py-3 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold transition-colors duration-300">
                Join
              </button>
            </div>
            <p className="text-xs text-neutral-500 mb-6">
              We respect your privacy.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              <FooterIcon Icon={FaFacebookF} />
              <FooterIcon Icon={FaInstagram} />
              <FooterIcon Icon={FaTwitter} />
              <FooterIcon Icon={FaLinkedinIn} />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-primary-100 mt-16 pt-8 flex flex-col md:flex-row justify-center items-center gap-6">
          {/* Copyright */}
          <p className="text-sm text-neutral-500">
            © {new Date().getFullYear()} <span className="text-primary-900 font-medium">Sukanya</span>. All Rights Reserved.
          </p>

          {/* Payment Methods */}
          {/* <div className="flex items-center gap-4">
            <span className="text-xs text-neutral-400 uppercase tracking-widest font-medium">Secure Payments</span>
            <div className="flex gap-3">
              <div className="px-3 py-1 bg-white border border-primary-50 rounded text-[10px] font-bold text-neutral-400 shadow-sm">VISA</div>
              <div className="px-3 py-1 bg-white border border-primary-50 rounded text-[10px] font-bold text-neutral-400 shadow-sm">MASTERCARD</div>
              <div className="px-3 py-1 bg-white border border-primary-50 rounded text-[10px] font-bold text-neutral-400 shadow-sm">UPI</div>
            </div>
          </div> */}
        </div>
      </div>
    </footer>
  );
}

const FooterIcon = ({ Icon }) => (
  <a
    href="#"
    className="w-10 h-10 inline-flex items-center justify-center rounded-xl bg-white border border-primary-100 text-primary-600 shadow-sm hover:bg-primary-600 hover:text-white hover:border-primary-600 transition-all duration-300 hover:-translate-y-1"
  >
    <Icon className="text-lg" />
  </a>
);