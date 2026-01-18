import { Link } from "react-router-dom";
import React, { useContext, useState } from "react";
import { BsCart2 } from "react-icons/bs";
import { IoHeartOutline, IoSearchOutline } from "react-icons/io5";
import { TfiMenu } from "react-icons/tfi";

import { CartContext } from "../context/CartContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(true);
  const { cartItems } = useContext(CartContext);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">

      <div className="flex items-center justify-between mx-auto h-18 px-4 md:px-10 lg:px-12 xl:px-15 max-w-8xl">
        {/* Search - Left (Desktop) */}
       

        <div className=" relative flex items-center gap-2 md:w-1/3 md:justify-center">
          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden text-xl"
          >
            <span className="text-amber-800"><TfiMenu /></span>
          </button>
          <Link to="/" className="flex items-center gap-2">
            <img src="/sukanya_logo.png" alt="Sukanya Logo" className="pb-2  w-50 lg:w-55 flex absolute left-0" />
            
          </Link>
        </div>

         <div className="hidden md:flex w-1/3">
          <div className="relative items-center w-full max-w-sm">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 pr-10 py-1.5 items-center rounded-sm bg-gray-100 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
            <IoSearchOutline className="absolute text-xl right-2 top-2 text-gray-600" />
          </div>
        </div>


        {/* Icons - Right */}
        <div className="flex items-center gap-5 md:w-1/3 md:justify-end">
          <button
            className="md:hidden"
            onClick={() => setShowSearch(!showSearch)}
          >
            <IoSearchOutline className="text-2xl text-amber-800" />
          </button>

          <Link  to="/favorites">
            <IoHeartOutline className="text-2xl text-amber-800" />
          </Link>

          <Link to="/cart" className="relative">
            <BsCart2 className="text-2xl text-amber-800" />
            <span className="absolute -top-2 -right-3 bg-amber-500 text-white text-xs px-1.5 rounded-full">
              {cartItems.length}
            </span>
          </Link>

          <Link
            to="/shop"
            className="hidden lg:flex px-4 py-1.5 bg-linear-to-r from-amber-500 to-orange-500 text-white rounded-full font-semibold"
          >
            Shop Now
          </Link>
        </div>
      </div>
      <hr className=" hidden text-gray-200 mx-auto  max-w-6xl md:flex" />

      {/* ===== ROW 2 (Desktop Categories) ===== */}
      <div className="hidden md:flex justify-center gap-8 py-2  ">
        <NavLink to="/#" label="Best Seller" />
        <NavLink to="/shop" label="Shop" />
        <NavLink to="/about" label="About" />
        <NavLink to="/sign-in" label="Sign in" />
      </div>

      {/* ===== Mobile Search ===== */}
      {/* <hr className="text-gray-300" /> */}
      {showSearch && (
        <div className="md:hidden px-4 py-2">
          <input
            type="text"
            placeholder="Search Sarees..."
            className="w-full px-4 py-2 rounded-sm bg-gray-100  focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>
      )}

      {/* ===== Overlay ===== */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* ===== Mobile Drawer ===== */}
      <div
        className={`fixed top-0 left-0 h-full w-3/4 bg-white z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 flex justify-between items-center border-b">
          <span className="font-bold text-lg">Sukanya</span>
          <button onClick={() => setIsOpen(false)}>✕</button>
        </div>
        <div className="flex flex-col p-4 gap-4">
          <MobileLink to="/category" label="Categories" close={() => setIsOpen(false)} />
          <MobileLink to="/shop" label="Shop" close={() => setIsOpen(false)} />
          <MobileLink to="/about" label="About" close={() => setIsOpen(false)} />
          <MobileLink to="/sign-in" label="Sign in" close={() => setIsOpen(false)} />
          <Link
            to="/shop"
            onClick={() => setIsOpen(false)}
            className="mt-4 text-center bg-linear-to-r from-amber-500 to-orange-500 text-white py-2 rounded-full"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, label }) => (
  <Link to={to} className="relative font-medium text-gray-800 group">
    {label}
    <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-amber-500 transition-all group-hover:w-full" />
  </Link>
);

const MobileLink = ({ to, label, close }) => (
  <Link to={to} onClick={close} className="text-lg font-semibold text-gray-800">
    {label}
  </Link>
);

export default Navbar;