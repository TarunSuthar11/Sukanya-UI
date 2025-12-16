import { Link } from "react-router-dom";
import React, { useState } from "react";
import { BsCart2 } from "react-icons/bs";
import { IoHeartOutline } from "react-icons/io5";



const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 left-0 z-50 w-full backdrop-blur-md bg-white/70 border-b border-white/40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-amber-900 focus:outline-none transition-transform duration-300 hover:scale-110"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link to="/">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-amber-600 to-orange-500 text-white font-bold shadow-lg">
                S
              </span>
            </Link>
            <Link to="/">
              <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                Sukanya
              </h1>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <NavLink to="/category" label="Categories" />
            <NavLink to="/shop" label="Shop" />
            <NavLink to="/about" label="About" />
            <NavLink to="/sign-in" label="Sign in" />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 md:gap-4">
            <Link className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md border border-amber-100 hover:shadow-lg transition">
              <IoHeartOutline className="text-amber-800 text-xl" />
            </Link>
            <Link
              to="/cart"
              className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md border border-amber-100 hover:shadow-lg transition"
            >
              <BsCart2 className="text-amber-800 text-xl" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[11px] font-bold rounded-full px-1.5">
                2
              </span>
            </Link>
            <Link
              to="/shop"
              className="hidden lg:inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-amber-600 to-orange-500 text-white font-semibold shadow-lg hover:shadow-xl transition"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-amber-100/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Menu Slide-in */}
      <div
        className={`fixed top-0 left-0 h-full min-h-screen w-3/4 sm:w-1/2 text-amber-900 shadow-2xl z-50 transform transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } bg-gradient-to-b from-amber-50 via-amber-100 to-orange-50`}
      >
        <div className="flex items-center justify-between h-16 px-4 bg-white/70 backdrop-blur-md border-b border-amber-100">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-amber-100 text-amber-800 font-bold shadow-inner">
              S
            </span>
            <span className="text-xl font-semibold text-amber-900">Sukanya</span>
          </div>
          <button onClick={() => setIsOpen(false)} aria-label="Close menu">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="p-6 flex flex-col gap-4 overflow-y-auto h-[calc(100%-64px)]">
          <MobileLink to="/category" label="Categories" onClick={() => setIsOpen(false)} />
          <MobileLink to="/shop" label="Shop" onClick={() => setIsOpen(false)} />
          <MobileLink to="/about" label="About" onClick={() => setIsOpen(false)} />
          <MobileLink to="/sign-in" label="Sign in" onClick={() => setIsOpen(false)} />
          <Link
            to="/shop"
            onClick={() => setIsOpen(false)}
            className="mt-4 inline-flex items-center justify-center px-4 py-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-400 text-white font-semibold shadow-lg hover:shadow-xl transition"
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
    className="text-gray-800 font-medium text-lg relative group"
  >
    <span className="transition-colors group-hover:text-amber-700">{label}</span>
    <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-amber-600 to-orange-500 transition-all duration-300 group-hover:w-full" />
  </Link>
);

const MobileLink = ({ to, label, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="text-amber-900 font-semibold text-lg px-4 py-3 rounded-xl bg-white/80 hover:bg-white border border-amber-100 transition backdrop-blur-sm"
  >
    {label}
  </Link>
);

export default Navbar;