import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FiTrash2, FiArrowLeft, FiMinus, FiPlus } from "react-icons/fi";
import products from "../data/products";
import { CartContext } from "../context/CartContext";
import { useContext } from "react";

const initialItems = products.slice(0, 3).map((p) => ({
  ...p,
  quantity: 1
}));

const currency = (value) => `₹${value.toLocaleString()}`;

export default function Cart() {



  const { cartItems ,removeFromCart } = useContext(CartContext);

  const [items, setItems] = useState(cartItems);

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
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(1, item.quantity + delta) }
            : item
        )
    );
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-b from-amber-50 via-white to-orange-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10 md:py-14">
        <div className="flex items-center gap-3 mb-6 text-amber-800">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold hover:text-amber-700">
            <FiArrowLeft />
            Continue Shopping
          </Link>
        </div>

        <div className="flex flex-col gap-6 md:gap-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Your Cart</h1>
            <p className="text-gray-600 mt-2">
              Review your selections and proceed to secure checkout.
            </p>
          </div>

          {items.length === 0 ? (
            <div className="bg-white/70 backdrop-blur rounded-2xl border border-amber-100 shadow-lg p-8 text-center">
              <p className="text-gray-700 text-lg mb-4">Your cart is empty.</p>
              <Link
                to="/shop"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-gradient-to-r from-amber-600 to-orange-500 text-white font-semibold shadow-lg hover:shadow-xl transition"
              >
                Browse Sarees
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {items.map((item) => {
                  const discount = Math.max(
                    0,
                    Math.ceil(((item.actualPrice - item.currentPrice) * 100) / item.actualPrice)
                  );
                  return (
                    <div
                      key={item.id}
                      className="bg-white rounded-2xl border border-amber-100 shadow-md p-4 md:p-5 flex flex-col sm:flex-row gap-4 md:gap-6"
                    >
                      <div className="w-full sm:w-40 h-52 sm:h-40 rounded-xl overflow-hidden bg-amber-50">
                        <Link to={`/products/${item.id}`}>
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </Link>
                      </div>

                      <div className="flex-1 min-w-0 flex flex-col gap-3">
                        <div className="flex justify-between gap-3">
                          <div className="min-w-0">
                            <h3 className="text-lg md:text-xl font-semibold text-gray-900 line-clamp-2">
                              {item.name}
                            </h3>
                            <p className="text-sm text-gray-500 mt-1 truncate">{item.category}</p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-400 hover:text-red-500 transition"
                            aria-label="Remove item"
                          >
                            <FiTrash2 className="text-lg" />
                          </button>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-xl font-bold text-amber-800">
                            {currency(item.currentPrice)}
                          </span>
                          {item.actualPrice > item.currentPrice && (
                            <>
                              <span className="text-gray-400 line-through text-sm">
                                {currency(item.actualPrice)}
                              </span>
                              {discount > 0 && (
                                <span className="text-green-600 text-sm font-semibold">
                                  {discount}% OFF
                                </span>
                              )}
                            </>
                          )}
                        </div>

                        <div className="flex items-center gap-4 flex-wrap">
                          <div className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50/60">
                            <button
                              onClick={() => updateQty(item.id, -1)}
                              className="p-2 text-amber-800 hover:text-amber-900"
                              aria-label="Decrease quantity"
                            >
                              <FiMinus />
                            </button>
                            <span className="px-3 py-1 text-gray-800 font-semibold">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQty(item.id, 1)}
                              className="p-2 text-amber-800 hover:text-amber-900"
                              aria-label="Increase quantity"
                            >
                              <FiPlus />
                            </button>
                          </div>
                          <div className="text-sm text-gray-500">
                            Total:{" "}
                            <span className="font-semibold text-gray-800">
                              {currency(item.currentPrice * item.quantity)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Summary */}
              <div className="bg-white rounded-2xl border border-amber-100 shadow-lg p-5 md:p-6 h-fit">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h3>
                <div className="space-y-3 text-sm text-gray-700">
                  <Row label="Subtotal" value={currency(totals.subtotal)} />
                  <Row label="Savings" value={`- ${currency(totals.savings)}`} highlight />
                  <Row label="Shipping" value={totals.shipping === 0 ? "Free" : currency(totals.shipping)} />
                  <hr className="border-amber-100" />
                  <Row label="Total" value={currency(totals.total)} strong />
                </div>
                <Link
                  to="/checkout"
                  className="mt-5 inline-flex w-full items-center justify-center px-4 py-3 rounded-full bg-gradient-to-r from-amber-600 to-orange-500 text-white font-semibold shadow-lg hover:shadow-xl transition"
                >
                  Proceed to Checkout
                </Link>
                <p className="text-xs text-gray-500 mt-3 text-center">
                  Secure payment • Easy returns • Delivery in 3-5 days
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const Row = ({ label, value, highlight = false, strong = false }) => (
  <div className="flex justify-between items-center">
    <span className={`text-gray-600 ${highlight ? "text-green-600 font-semibold" : ""}`}>
      {label}
    </span>
    <span className={`${strong ? "text-lg font-bold text-gray-900" : ""}`}>
      {value}
    </span>
  </div>
);