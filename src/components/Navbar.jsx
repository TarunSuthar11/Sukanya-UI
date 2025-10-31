import { Link } from "react-router-dom";
import React, { useState } from "react";
import { BsCart2 } from "react-icons/bs";
import { IoHeartOutline } from "react-icons/io5";



const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-pink-100 shadow-md sticky w-full top-0 left-0 z-50 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className=" flex justify-between items-center h-16">


          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-800 focus:outline-none transition-transform duration-300"
            >

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 "
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
          <div className="justify-center items-center">
            <Link to='/'>
            <h1 className="text-2xl font-bold text-gray-800">Sukanya</h1>
            </Link>
          </div>



          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link
              to="/category"
              className="text-gray-800 font-medium text-lg hover:text-blue-600 hover:scale-105 transition-colors duration-300">
              Category
            </Link>

            <Link
              to="/shop"
              className="text-gray-800 font-medium text-lg hover:text-amber-200  transition-colors duration-300">
              Shop
            </Link>

            <Link
              to="/about"
              className="text-gray-800 font-medium text-lg hover:text-blue-600 hover:scale-105 transition-colors duration-300">
              About
            </Link>

            <Link
              to="/sign-in"
              className="text-gray-800 font-medium text-lg hover:text-blue-600 hover:scale-105 transition-colors duration-300">
              Sign in
            </Link>
          </div>



          <div className="flex gap-2 md:gap-4 ">

            <Link >
              <IoHeartOutline className="size-6 " />
            </Link>

            <Link  to="/cart" className="flex">
                <BsCart2 className="size-6 " />
                <sub className="text-[14px]">2</sub>
            </Link>

          </div>


        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? "opacity-50 visible" : "opacity-0 invisible"
          }`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Mobile Menu Slide-in */}
      <div
        className={`fixed top-0 left-0 h-full w-3/4 sm:w-1/2 bg-white shadow-lg z-50 transform transition-transform duration-500 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex  h-16 p-4 bg-amber-200">
          <button onClick={() => setIsOpen(false)}>

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
        <div className="p-6 flex flex-col items-center space-y-6 ">
          
          <Link
            to="/category"
            className="text-gray-800 font-medium text-lg hover:text-blue-600 hover:scale-105 transition-colors duration-300"
            onClick={() => setIsOpen(false)}>
            Category
          </Link>
          <Link
            to="/shop"
            className="text-gray-800 font-medium text-lg hover:text-amber-700  transition-colors duration-300"
            onClick={() => setIsOpen(false)}>
            Shop
          </Link>
          <Link
            to="/about"
            className="text-gray-800 font-medium text-lg hover:text-blue-600 hover:scale-105 transition-colors duration-300"
            onClick={() => setIsOpen(false)}>
            About
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;