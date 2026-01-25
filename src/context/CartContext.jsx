import { createContext, useState, useEffect, useMemo } from 'react';
import { useAddToCart, useGetCart, useRemoveFromCart, useUpdateCart, useClearCart } from '../hooks/useCartHooks';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const addToCartMutation = useAddToCart();
  const removeFromCartMutation = useRemoveFromCart();
  const updateCartMutation = useUpdateCart();
  const clearCartMutation = useClearCart();

  const { data: cartData, isLoading } = useGetCart();

  // Map backend items to include id/_id for UI compatibility
  const items = useMemo(() => {
    const rawItems = cartData?.data?.items || [];
    return rawItems.map(item => ({
      ...item,
      id: item.productId,
      _id: item.productId
    }));
  }, [cartData]);

  const [cartItems, setCartItems] = useState([]);

  // Sync local state with remote data
  useEffect(() => {
    if (items) {
      setCartItems(items);
    }
  }, [items]);

  // cart drawer state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const isInCart = (productId) => {
    return cartItems.some(item => (item.productId === productId || item._id === productId || item.id === productId));
  };

  const addToCart = async (productOrId, quantity = 1) => {
    const productId = typeof productOrId === 'object' ? (productOrId._id || productOrId.id) : productOrId;
    if (!productId) {
      console.error("No productId provided to addToCart");
      return;
    }

    if (isInCart(productId)) {
      openCart();
      return;
    }

    try {
      await addToCartMutation.mutateAsync({ productId, quantity });
      openCart();
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  }

  const removeFromCart = async (productId) => {
    try {
      await removeFromCartMutation.mutateAsync(productId);
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) {
      return removeFromCart(productId);
    }
    try {
      await updateCartMutation.mutateAsync({ productId, quantity });
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const clearCart = async () => {
    try {
      await clearCartMutation.mutateAsync();
      setCartItems([]);
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  }

  // Use finalAmount from backend if available, otherwise calculate locally
  const cartTotal = cartData?.data?.finalAmount ?? cartItems.reduce((total, item) => total + (item.currentPrice * item.quantity), 0);

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
      cartTotal,
      isLoading,
      isInCart
    }}>
      {children}
    </CartContext.Provider>
  );
};