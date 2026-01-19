import { createContext, useState, useEffect } from "react";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const [wishlistItems, setWishlistItems] = useState([]);

    // Load from local storage on mount
    useEffect(() => {
        const keptItems = localStorage.getItem("wishlistItems");
        if (keptItems) {
            setWishlistItems(JSON.parse(keptItems));
        }
    }, []);

    // Save to local storage whenever items change
    useEffect(() => {
        localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
    }, [wishlistItems]);

    const addToWishlist = (product) => {
        // Check if already in wishlist to avoid duplicates
        if (!isInWishlist(product.id || product._id)) {
            setWishlistItems((prev) => [...prev, product]);
        }
    };

    const removeFromWishlist = (productId) => {
        setWishlistItems((prev) =>
            prev.filter((item) => (item.id || item._id) !== productId)
        );
    };

    const toggleWishlist = (product) => {
        const id = product.id || product._id;
        if (isInWishlist(id)) {
            removeFromWishlist(id);
        } else {
            addToWishlist(product);
        }
    };

    const isInWishlist = (productId) => {
        return wishlistItems.some((item) => (item.id || item._id) === productId);
    };

    return (
        <WishlistContext.Provider
            value={{
                wishlistItems,
                addToWishlist,
                removeFromWishlist,
                toggleWishlist,
                isInWishlist,
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
};
