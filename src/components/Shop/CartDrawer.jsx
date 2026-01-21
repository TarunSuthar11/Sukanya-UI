import { useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose, IoTrashOutline } from 'react-icons/io5';
import { FiMinus, FiPlus, FiShoppingBag } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';

export default function CartDrawer() {
    const { cartItems, isCartOpen, closeCart, removeFromCart, updateQuantity, cartTotal } = useContext(CartContext);
    const navigate = useNavigate();

    const handleCheckout = () => {
        closeCart();
        navigate('/checkout');
    };

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeCart}
                        className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm z-[120]"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[130] flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-neutral-100">
                            <div className="flex items-center gap-2">
                                <FiShoppingBag className="text-primary-600 text-xl" />
                                <h2 className="text-xl font-bold text-neutral-900">Your Bag ({cartItems.length})</h2>
                            </div>
                            <button
                                onClick={closeCart}
                                className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
                                aria-label="Close cart"
                            >
                                <IoClose size={24} />
                            </button>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {cartItems.length > 0 ? (
                                cartItems.map((item) => (
                                    <div key={item._id || item.id} className="flex gap-4 group">
                                        <div className="w-24 h-32 rounded-xl overflow-hidden bg-neutral-50 shrink-0">
                                            <img
                                                src={item.productImages?.[0]?.url || item.imageUrl}
                                                alt={item.productName}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0 flex flex-col">
                                            <div className="flex items-start justify-between gap-2">
                                                <Link
                                                    to={`/products/${item._id || item.id}`}
                                                    onClick={closeCart}
                                                    className="text-sm font-bold text-neutral-800 hover:text-primary-600 transition-colors line-clamp-2"
                                                >
                                                    {item.productName}
                                                </Link>
                                                <button
                                                    onClick={() => removeFromCart(item._id || item.id)}
                                                    className="text-neutral-400 hover:text-red-500 transition-colors"
                                                    aria-label="Remove item"
                                                >
                                                    <IoTrashOutline size={18} />
                                                </button>
                                            </div>
                                            <p className="text-xs text-neutral-500 mt-1">{item.category}</p>
                                            <div className="mt-auto flex items-center justify-between">
                                                <div className="flex items-center border border-neutral-200 rounded-full p-1 bg-neutral-50">
                                                    <button
                                                        onClick={() => updateQuantity(item._id || item.id, item.quantity - 1)}
                                                        className="w-7 h-7 flex items-center justify-center hover:bg-white rounded-full transition-colors"
                                                    >
                                                        <FiMinus size={14} />
                                                    </button>
                                                    <span className="w-10 text-center text-xs font-bold">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item._id || item.id, item.quantity + 1)}
                                                        className="w-7 h-7 flex items-center justify-center hover:bg-white rounded-full transition-colors"
                                                    >
                                                        <FiPlus size={14} />
                                                    </button>
                                                </div>
                                                <span className="font-bold text-primary-700">₹{(item.currentPrice * item.quantity).toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-center">
                                    <div className="w-20 h-20 bg-neutral-50 rounded-full flex items-center justify-center mb-4">
                                        <FiShoppingBag className="text-neutral-300 text-3xl" />
                                    </div>
                                    <h3 className="text-lg font-bold text-neutral-800 mb-2">Your Bag is Empty</h3>
                                    <p className="text-neutral-500 text-sm mb-6">Looks like you haven't added anything to your bag yet.</p>
                                    <button
                                        onClick={closeCart}
                                        className="btn-primary px-8 py-3"
                                    >
                                        Continue Shopping
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {cartItems.length > 0 && (
                            <div className="p-6 border-t border-neutral-100 bg-neutral-50/50">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-neutral-500 font-medium">Subtotal</span>
                                    <span className="text-2xl font-black text-neutral-900">₹{cartTotal.toLocaleString()}</span>
                                </div>
                                <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-bold mb-6 text-center">
                                    Shipping and taxes calculated at checkout
                                </p>
                                <div className="grid grid-cols-2 gap-4">
                                    <Link
                                        to="/cart"
                                        onClick={closeCart}
                                        className="flex items-center justify-center py-4 rounded-xl border-2 border-primary-100 font-black text-xs uppercase tracking-widest text-primary-600 hover:bg-primary-50 transition-colors"
                                    >
                                        View Bag
                                    </Link>
                                    <button
                                        onClick={handleCheckout}
                                        className="flex items-center justify-center py-4 rounded-xl bg-gradient-primary text-white font-black text-xs uppercase tracking-widest shadow-lg shadow-primary-100 hover:scale-[1.02] active:scale-95 transition-all"
                                    >
                                        Checkout Now
                                    </button>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
