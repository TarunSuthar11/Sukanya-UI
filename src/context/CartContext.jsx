import { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const addToCart = (item, quantity) => {
    const itemId = item._id || item.id;
    const existingItem = cartItems.find(cartItem => (cartItem._id || cartItem.id) === itemId);

    if (existingItem) {
      setCartItems((prev) =>
        prev.map(cartItem =>
          (cartItem._id || cartItem.id) === itemId
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        )
      );
    } else {
      setCartItems((prev) => [...prev, { ...item, quantity }]);
    }

    // Automatically open the cart drawer when an item is added
    openCart();
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => prev.filter(item => (item._id || item.id) !== itemId));
  };

  const updateQuantity = (itemId, quantity) => {
    if (quantity < 1) return;
    setCartItems((prev) =>
      prev.map(item => (item._id || item.id) === itemId ? { ...item, quantity } : item)
    );
  };

  const clearCart = () => setCartItems([]);

  const cartTotal = cartItems.reduce((total, item) => total + (item.currentPrice * item.quantity), 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      isCartOpen,
      openCart,
      closeCart,
      cartTotal
    }}>
      {children}
    </CartContext.Provider>
  );
};