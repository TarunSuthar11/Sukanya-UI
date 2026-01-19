import { useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiHeart, FiArrowLeft, FiShoppingBag } from "react-icons/fi";
import { WishlistContext } from "../../context/WishlistContext";
import ProductCard from "../../components/Product/ProductCard";

export default function WishlistPage() {
    const { wishlistItems } = useContext(WishlistContext);

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
                    className="mb-10"
                >
                    <div className="flex items-center gap-3 mb-2">
                        <FiHeart className="text-3xl md:text-4xl text-primary-600" />
                        <h1 className="text-4xl md:text-5xl font-bold text-neutral-900">My Wishlist</h1>
                    </div>
                    <p className="text-neutral-600 text-lg">
                        Your curated collection of favorites ({wishlistItems.length} items)
                    </p>
                </motion.div>

                {wishlistItems.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="card-elegant p-12 text-center flex flex-col items-center justify-center min-h-[400px]"
                    >
                        <div className="w-20 h-20 bg-primary-50 rounded-full flex items-center justify-center mb-6">
                            <FiHeart className="text-4xl text-primary-300" />
                        </div>
                        <h2 className="text-2xl font-bold text-neutral-900 mb-2">Your wishlist is empty</h2>
                        <p className="text-neutral-600 mb-8 max-w-md">
                            Save items you love here to review or buy later. Start exploring our collection to find your perfect saree.
                        </p>
                        <Link to="/shop" className="btn-primary inline-flex items-center gap-2">
                            <FiShoppingBag />
                            Explore Collection
                        </Link>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                    >
                        {wishlistItems.map((product) => (
                            <ProductCard key={product.id || product._id} product={product} />
                        ))}
                    </motion.div>
                )}
            </div>
        </div>
    );
}
