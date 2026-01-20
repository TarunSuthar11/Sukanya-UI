import { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiTrash2, FiArrowLeft, FiMinus, FiPlus, FiShoppingBag } from "react-icons/fi";
import { CartContext } from "../../context/CartContext";
import { useContext } from "react";
import { motion } from "framer-motion";

const currency = (value) => `₹${value.toLocaleString()}`;

export default function Cart() {
  const { cartItems, removeFromCart } = useContext(CartContext);
  const [items, setItems] = useState(cartItems);

  useEffect(() => {
    setItems(cartItems);
  }, [cartItems]);

  const totals = useMemo(() => {
    const subtotal = items.reduce((sum, item) => sum + item.currentPrice * item.quantity, 0);
    const mrp = items.reduce((sum, item) => sum + item.actualPrice * item.quantity, 0);
    const savings = Math.max(mrp - subtotal, 0);
    const shipping = subtotal > 0 ? 0 : 0;
    const total = subtotal + shipping;
    return { subtotal, mrp, savings, shipping, total };
  }, [items]);

  const updateQty = (id, delta) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id || item._id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-soft">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10 md:py-14">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 mb-8"
        >
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors"
          >
            <FiArrowLeft className="text-lg" />
            Continue Shopping
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-2">Shopping Cart</h1>
          <p className="text-neutral-600 text-lg">
            Review your selections and proceed to secure checkout
          </p>
        </motion.div>

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card-elegant p-12 text-center"
          >
            <div className="text-6xl mb-4">🛍️</div>
            <h2 className="text-2xl font-bold text-neutral-900 mb-2">Your cart is empty</h2>
            <p className="text-neutral-600 mb-6">Looks like you haven't added any sarees yet</p>
            <Link to="/shop" className="btn-primary inline-flex items-center gap-2">
              <FiShoppingBag />
              Browse Sarees
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item, index) => {
                const discount = Math.max(
                  0,
                  Math.ceil(((item.actualPrice - item.currentPrice) * 100) / item.actualPrice)
                );
                return (
                  <motion.div
                    key={item.id || item._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="card-elegant p-4 md:p-5 flex flex-col sm:flex-row gap-4 md:gap-6 hover-lift"
                  >
                    {/* Product Image */}
                    <div className="w-full sm:w-32 md:w-40 h-48 sm:h-32 md:h-40 rounded-xl overflow-hidden bg-neutral-100 shrink-0">
                      <Link to={`/products/${item._id || item.id}`}>
                        <img
                          src={item.productImages?.[0]?.url || item.imageUrl}
                          alt={item.productName || item.name}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        />
                      </Link>
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0 flex flex-col gap-3">
                      <div className="flex justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <h3 className="text-lg md:text-xl font-semibold text-neutral-900 line-clamp-2 mb-1">
                            {item.productName || item.name}
                          </h3>
                          <p className="text-sm text-neutral-500">{item.category || 'Saree'}</p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item._id || item.id)}
                          className="text-neutral-400 hover:text-red-500 transition-colors h-fit"
                          aria-label="Remove item"
                        >
                          <FiTrash2 className="text-xl" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="text-2xl font-bold text-primary-600">
                          {currency(item.currentPrice)}
                        </span>
                        {item.actualPrice > item.currentPrice && (
                          <>
                            <span className="text-neutral-400 line-through text-sm">
                              {currency(item.actualPrice)}
                            </span>
                            {discount > 0 && (
                              <span className="text-green-600 text-sm font-semibold px-2 py-1 bg-green-50 rounded-full">
                                {discount}% OFF
                              </span>
                            )}
                          </>
                        )}
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-4 flex-wrap mt-auto">
                        <div className="inline-flex items-center rounded-full border-2 border-primary-200 bg-white">
                          <button
                            onClick={() => updateQty(item._id || item.id, -1)}
                            className="p-2.5 text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-l-full transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <FiMinus className="text-sm" />
                          </button>
                          <span className="px-4 py-2 text-neutral-800 font-semibold min-w-12 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQty(item._id || item.id, 1)}
                            className="p-2.5 text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-r-full transition-colors"
                            aria-label="Increase quantity"
                          >
                            <FiPlus className="text-sm" />
                          </button>
                        </div>
                        <div className="text-sm text-neutral-600">
                          Subtotal:{" "}
                          <span className="font-bold text-neutral-900">
                            {currency(item.currentPrice * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card-elegant p-6 md:p-7 h-fit sticky top-24"
            >
              <h3 className="text-2xl font-bold text-neutral-900 mb-6">Order Summary</h3>
              <div className="space-y-4 text-base text-neutral-700 mb-6">
                <Row label="Subtotal" value={currency(totals.subtotal)} />
                <Row label="Savings" value={`- ${currency(totals.savings)}`} highlight />
                <Row label="Shipping" value={totals.shipping === 0 ? "Free" : currency(totals.shipping)} />
                <div className="divider-gradient my-4" />
                <Row label="Total" value={currency(totals.total)} strong />
              </div>
              <Link
                to="/checkout"
                className="btn-primary w-full text-center block mb-4"
              >
                Proceed to Checkout
              </Link>
              <p className="text-xs text-neutral-500 text-center leading-relaxed">
                Secure payment • Easy returns • Free delivery
              </p>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}

const Row = ({ label, value, highlight = false, strong = false }) => (
  <div className="flex justify-between items-center">
    <span className={`${highlight ? "text-green-600 font-semibold" : "text-neutral-600"}`}>
      {label}
    </span>
    <span className={`${strong ? "text-2xl font-bold text-neutral-900" : "font-medium"}`}>
      {value}
    </span>
  </div>
);