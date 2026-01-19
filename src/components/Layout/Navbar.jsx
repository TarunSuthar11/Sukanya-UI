import { Link } from "react-router-dom";
import React, { useContext, useState, useEffect } from "react";
import { BsCart2 } from "react-icons/bs";
import { IoHeartOutline, IoSearchOutline } from "react-icons/io5";
import { TfiMenu } from "react-icons/tfi";
import { IoClose } from "react-icons/io5";

import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishlistContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cartItems } = useContext(CartContext);
  const { wishlistItems } = useContext(WishlistContext);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'glass shadow-lg' : 'bg-white shadow-sm'
      }`}>
      <div className="flex items-center justify-between mx-auto h-20 px-4 md:px-10 lg:px-12 xl:px-16 max-w-8xl">
        {/* Left Section - Menu + Logo */}
        <div className="relative flex items-center gap-4 md:w-1/3">
          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden text-2xl text-primary-600 hover:text-primary-700 transition-colors"
            aria-label="Open menu"
          >
            <TfiMenu />
          </button>
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/sukanya_logo.png"
              alt="Sukanya Logo"
              className="h-12 md:h-14 lg:h-16 object-contain"
            />
          </Link>
        </div>

        {/* Center Section - Search (Desktop) */}
        <div className="hidden md:flex w-1/3 justify-center">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search for sarees..."
              className="w-full px-5 pr-12 py-2.5 rounded-full bg-neutral-100 border-2 border-transparent focus:border-primary-300 focus:bg-white focus:ring-4 focus:ring-primary-100 transition-all duration-300 outline-none text-sm"
            />
            <IoSearchOutline className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-neutral-400" />
          </div>
        </div>

        {/* Right Section - Icons */}
        <div className="flex items-center gap-4 md:gap-5 md:w-1/3 md:justify-end">
          <button
            className="md:hidden text-2xl text-primary-600 hover:text-primary-700 transition-colors"
            onClick={() => setShowSearch(!showSearch)}
            aria-label="Toggle search"
          >
            <IoSearchOutline />
          </button>

          <Link
            to="/favorites"
            className="relative group text-2xl text-primary-600 hover:text-magenta-600 transition-colors hover:scale-110 duration-300"
            aria-label="Favorites"
          >
            <IoHeartOutline />
            {wishlistItems?.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-gradient-primary text-white text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center shadow-md">
                {wishlistItems.length}
              </span>
            )}
          </Link>

          <Link to="/cart" className="relative group">
            <BsCart2 className="text-2xl text-primary-600 group-hover:text-magenta-600 transition-colors group-hover:scale-110 duration-300" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-gradient-primary text-white text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center shadow-md">
                {cartItems.length}
              </span>
            )}
          </Link>

          <Link
            to="/shop"
            className="hidden lg:flex btn-primary text-sm"
          >
            Shop Now
          </Link>
        </div>
      </div>

      {/* Navigation Links (Desktop) */}
      <div className="hidden md:flex justify-center gap-8 py-3 border-t border-neutral-100">
        <NavLink to="/" label="Best Seller" />
        <NavLink to="/shop" label="Shop" />
        <NavLink to="/category" label="Categories" />
        <NavLink to="/about" label="About" />
        <NavLink to="/sign-in" label="Sign In" />
      </div>

      {/* Mobile Search */}
      {showSearch && (
        <div className="md:hidden px-4 py-3 border-t border-neutral-100 animate-fade-in">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for sarees..."
              className="w-full px-4 pr-10 py-2.5 rounded-full bg-neutral-100 border-2 border-transparent focus:border-primary-300 focus:bg-white focus:ring-4 focus:ring-primary-100 transition-all duration-300 outline-none text-sm"
            />
            <IoSearchOutline className="absolute right-4 top-1/2 -translate-y-1/2 text-lg text-neutral-400" />
          </div>
        </div>
      )}

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm animate-fade-in"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-white z-50 transform transition-transform duration-300 shadow-2xl ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="p-6 flex justify-between items-center border-b border-neutral-200">
          <h2 className="font-bold text-2xl text-gradient-primary">Sukanya</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-2xl text-neutral-600 hover:text-primary-600 transition-colors"
            aria-label="Close menu"
          >
            <IoClose />
          </button>
        </div>
        <div className="flex flex-col p-6 gap-1">
          <MobileLink to="/" label="Best Seller" close={() => setIsOpen(false)} />
          <MobileLink to="/category" label="Categories" close={() => setIsOpen(false)} />
          <MobileLink to="/shop" label="Shop" close={() => setIsOpen(false)} />
          <MobileLink to="/about" label="About" close={() => setIsOpen(false)} />
          <MobileLink to="/sign-in" label="Sign In" close={() => setIsOpen(false)} />
          <Link
            to="/shop"
            onClick={() => setIsOpen(false)}
            className="mt-6 btn-primary text-center text-sm"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, label }) => (
  <Link
    to={to}
    className="relative font-medium text-neutral-700 hover:text-primary-600 group transition-colors duration-300"
  >
    {label}
    <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-gradient-primary transition-all duration-300 group-hover:w-full rounded-full" />
  </Link>
);

const MobileLink = ({ to, label, close }) => (
  <Link
    to={to}
    onClick={close}
    className="text-lg font-medium text-neutral-700 hover:text-primary-600 py-3 px-4 rounded-lg hover:bg-primary-50 transition-all duration-300"
  >
    {label}
  </Link>
);

export default Navbar;