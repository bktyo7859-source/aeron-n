import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('aeron_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('aeron_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart', e);
    }
  }, [cart]);

  const addToCart = (product, selectedColor = 'black', selectedSize = 42, quantity = 1) => {
    setCart((prev) => {
      const itemKey = `${product.id}-${selectedColor}-${selectedSize}`;
      const existing = prev.find((item) => item.key === itemKey);

      if (existing) {
        return prev.map((item) =>
          item.key === itemKey ? { ...item, quantity: item.quantity + quantity } : item
        );
      }

      return [
        ...prev,
        {
          key: itemKey,
          product,
          id: product.id,
          name: product.name,
          price: product.price,
          color: selectedColor,
          size: selectedSize,
          image: product.images?.[selectedColor]?.side || product.images?.white?.side || product.images?.black?.side,
          quantity
        }
      ];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (itemKey) => {
    setCart((prev) => prev.filter((item) => item.key !== itemKey));
  };

  const updateQuantity = (itemKey, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.key === itemKey) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingCost = subtotal > 15000 ? 0 : 499;
  const grandTotal = subtotal + shippingCost;

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        shippingCost,
        grandTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
