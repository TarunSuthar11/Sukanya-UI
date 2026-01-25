import { Link, useNavigate } from "react-router-dom";
import React, { useContext, useState, useEffect } from "react";
import { BsCart2 } from "react-icons/bs";
import { IoHeartOutline, IoSearchOutline, IoPeopleOutline } from "react-icons/io5";
import { TfiMenu } from "react-icons/tfi";
import { IoClose } from "react-icons/io5";

import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishlistContext";
import { AuthContext } from "../../context/AuthContext";

import { fetchSuggestions } from "../../service/ProductService";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isSearchLoading, setIsSearchLoading] = useState(false);

  const { cartItems, openCart } = useContext(CartContext);
  const { wishlistItems } = useContext(WishlistContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.length > 2) {
        setIsSearchLoading(true);
        const results = await fetchSuggestions(searchQuery);
        setSuggestions(results?.data || []);
        setIsSearchLoading(false);
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleSearch = (query) => {
    if (!query.trim()) return;
    setSuggestions([]);
    setShowSearch(false);
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'glass shadow-lg' : 'bg-white shadow-sm'
        }`}>
        <div className="flex items-center justify-between mx-auto h-18 px-4 md:px-8  max-w-7xl">
          {/* Left Section - Menu + Logo */}
          <div className="relative flex items-center gap-4 md:w-1/3">
            <button
              onClick={() => setIsOpen(true)}
              className="md:hidden text-xl text-primary-600 hover:text-primary-700 transition-colors"
              aria-label="Open menu"
            >
              <TfiMenu />
            </button>
            {/* <Link to="/" className="flex items-center">
              <img
                src="Sukanya.png"
                alt="Sukanya Logo"
                className="h-11 md:h-13  object-contain"
              />
            </Link> */}
            <h2 className="text-2xl mt-1 lg:text-3xl flex items-center tracking-wider font-bold text-primary-700 ">
              Sukanya
            </h2>
          </div>

          {/* Center Section - Search (Desktop) */}
          <div className="hidden md:flex w-1/3 justify-center relative">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
                placeholder="Search Sarees..."
                className="w-full px-5 pr-12 py-2.5 rounded-full bg-neutral-100 border-2 border-transparent focus:border-primary-300 focus:bg-white focus:ring-4 focus:ring-primary-100 transition-all duration-300 outline-none text-sm"
              />
              <button
                onClick={() => handleSearch(searchQuery)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-neutral-400 hover:text-primary-600 transition-colors"
              >
                <IoSearchOutline />
              </button>
            </div>

            {/* Desktop Suggestions Dropdown */}
            {searchQuery.length > 2 && (suggestions.length > 0 || isSearchLoading || searchQuery) && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-neutral-100 overflow-hidden z-50">
                {isSearchLoading ? (
                  <div className="p-4 text-center">
                    <div className="w-5 h-5 border-2 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                  </div>
                ) : suggestions.length > 0 ? (
                  <div className="max-h-96 overflow-y-auto scrollbar-thin">
                    {suggestions.map((product) => (
                      <Link
                        key={product._id}
                        to={`/products/${product._id}`}
                        onClick={() => {
                          setSearchQuery("");
                          setSuggestions([]);
                        }}
                        className="flex items-center gap-4 p-3 hover:bg-neutral-50 transition-colors border-b border-neutral-50 last:border-0"
                      >
                        <img src={product.productImages[0]?.url} alt="" className="w-10 h-10 rounded-lg object-cover" />
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-neutral-800 line-clamp-1">{product.productName}</p>
                          <p className="text-[10px] text-neutral-500 uppercase tracking-wider">{product.productCategory?.categoryName || 'Saree'}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-sm text-neutral-500">
                    No suggestions found for "{searchQuery}"
                  </div>
                )}

                {!isSearchLoading && (
                  <button
                    onClick={() => handleSearch(searchQuery)}
                    className="w-full p-3 text-xs font-bold text-primary-600 hover:bg-primary-50 transition-colors text-center uppercase tracking-widest border-t border-neutral-100"
                  >
                    View all results
                  </button>
                )}
              </div>
            )}
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
                <span className="absolute -top-2 -right-2 bg-gradient-primary text-white text-xs font-bold px-1.5 py-0.5 rounded-full min-w-5 text-center shadow-md">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            <button onClick={openCart} className="relative group p-0 bg-transparent border-none">
              <BsCart2 className="text-2xl text-primary-600 group-hover:text-magenta-600 transition-colors group-hover:scale-110 duration-300" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-primary text-white text-xs font-bold px-1.5 py-0.5 rounded-full min-w-5 text-center shadow-md">
                  {cartItems.length}
                </span>
              )}
            </button>

            {user ? (
              <Link to="/profile" className="hidden lg:flex items-center gap-2 group">
                <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-primary-100 group-hover:border-primary-600 transition-all">
                  <img src={user.avatar} alt={user.firstName} className="w-full h-full object-cover" />
                </div>
              </Link>
            ) : (
              <Link
                to="/signin"
                className="hidden lg:flex p-2 px-6 btn-primary text-sm"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>

        {/* Navigation Links (Desktop) */}
        <div className="hidden md:flex justify-center gap-8 py-3 border-t border-neutral-100">
          <NavLink to="/" label="Best Seller" />
          <NavLink to="/shop" label="Shop" />
          <NavLink to="/category" label="Categories" />
          <NavLink to="/about" label="About" />
          <NavLink to="/my-orders" label="My Orders" />
          {user ? (
            <NavLink to="/profile" label="Profile" />
          ) : (
            <NavLink to="/signin" label="Sign In" />
          )}
        </div>

        {/* Mobile Search */}
        {showSearch && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-neutral-100 shadow-xl z-40 animate-fade-in">
            <div className="p-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
                  placeholder="Search for sarees..."
                  autoFocus
                  className="w-full px-4 pr-10 py-3 rounded-xl bg-neutral-100 border-2 border-transparent focus:border-primary-300 focus:bg-white focus:ring-4 focus:ring-primary-100 transition-all duration-300 outline-none text-base"
                />
                <button
                  onClick={() => handleSearch(searchQuery)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-neutral-400"
                >
                  <IoSearchOutline />
                </button>
              </div>
            </div>

            {/* Mobile Suggestions Dropdown */}
            {suggestions.length > 0 && searchQuery && (
              <div className="max-h-[60vh] overflow-y-auto border-t border-neutral-50">
                {suggestions.map((product) => (
                  <Link
                    key={product._id}
                    to={`/products/${product._id}`}
                    onClick={() => {
                      setSearchQuery("");
                      setSuggestions([]);
                      setShowSearch(false);
                    }}
                    className="flex items-center gap-4 p-4 hover:bg-neutral-50 transition-colors border-b border-neutral-50 last:border-0"
                  >
                    <img src={product.productImages[0]?.url} alt="" className="w-12 h-12 rounded-lg object-cover bg-neutral-100" />
                    <div>
                      <p className="text-sm font-bold text-neutral-800 line-clamp-1">{product.productName}</p>
                      <p className="text-[10px] text-neutral-500 uppercase tracking-wider">{product.productCategory?.categoryName || 'Saree'}</p>
                    </div>
                  </Link>
                ))}
                <button
                  onClick={() => handleSearch(searchQuery)}
                  className="w-full p-4 text-xs font-bold text-primary-600 bg-primary-50 text-center uppercase tracking-widest"
                >
                  View all results for "{searchQuery}"
                </button>
              </div>
            )}
          </div>
        )}
      </nav>

      {/* Overlay - Moved outside <nav> to escape its stacking context/glass effect */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-neutral-900/60 z-100 backdrop-blur-sm animate-fade-in"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Drawer - Moved outside <nav> to escape its stacking context/glass effect */}
      <div
        className={`fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-white z-110 transform transition-transform duration-300 shadow-2xl flex flex-col ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="p-5 px-8  flex justify-between items-center border-b border-neutral-200 shrink-0">
          {/* <h2 className="font-bold text-2xl text-gradient-primary font-serif">Sukanya</h2> */}
          <img
            src="pink_favicon.png"
            alt="Sukanya Logo"
            className="h-8 md:h-10 rounded-lg "
          />
          <button
            onClick={() => setIsOpen(false)}
            className="text-2xl text-neutral-600 hover:text-primary-600 transition-colors"
            aria-label="Close menu"
          >
            <IoClose />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-1 text-sm font-medium">
          <MobileLink to="/" label="Best Seller" close={() => setIsOpen(false)} />
          <MobileLink to="/category" label="Categories" close={() => setIsOpen(false)} />
          <MobileLink to="/shop" label="Shop" close={() => setIsOpen(false)} />
          <MobileLink to="/about" label="About" close={() => setIsOpen(false)} />
          <MobileLink to="/my-orders" label="My Orders" close={() => setIsOpen(false)} />
          {/* <button
            onClick={() => {
              setIsOpen(false);
              openCart();
            }}
            className="text-lg font-medium text-neutral-700 hover:text-primary-600 py-3 px-4 rounded-lg hover:bg-primary-50 transition-all duration-300 flex items-center justify-between">
            <span>My Bag</span>
            <span className="bg-primary-100 text-primary-700 text-xs font-bold px-2 py-0.5 rounded-full">
              {cartItems.length}
            </span>
          </button> */}
        </div>

        {/* User Profile Section at bottom of sidebar */}
        <div className="p-6 border-t border-neutral-100 bg-neutral-50/50 shrink-0">
          {user ? (
            <Link
              to="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-4 p-3 bg-white rounded-2xl border border-neutral-100 shadow-sm hover:border-primary-200 transition-all group"
            >
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary-50 group-hover:border-primary-400 transition-all shrink-0">
                <img src={user.avatar} alt={user.firstName} className="w-full h-full object-cover" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-black text-primary-600 uppercase tracking-widest mb-0.5">My Account</p>
                <p className="text-sm font-bold text-neutral-800 truncate">{user.firstName} {user.lastName}</p>
              </div>
            </Link>
          ) : (
            <Link
              to="/signin"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-4 p-4 bg-primary-600 text-white rounded-2xl shadow-lg shadow-primary-100 hover:bg-primary-700 transition-all group"
            >
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                <IoPeopleOutline size={20} />
              </div>
              <span className="text-xs font-black uppercase tracking-widest">Login / Sign Up</span>
            </Link>
          )}
        </div>
      </div>
    </>
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
    className="text-lg font-medium border-b border-neutral-100 text-neutral-700 hover:text-primary-600 py-3 px-4 rounded-lg hover:bg-primary-50 transition-all duration-300"
  >
    {label}
  </Link>
);

export default Navbar;