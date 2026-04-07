"use client";

import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);

// all plan ids
const PLAN_IDS = ["trial", "year1", "year2", "year3"];

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load from localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;

    const saved = localStorage.getItem("kravy-cart");

    if (saved) {
      try {
        setCartItems(JSON.parse(saved));
      } catch {
        setCartItems([]);
      }
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;

    localStorage.setItem("kravy-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Add item
  const addToCart = ({ id, name, price }) => {
    setCartItems((prev) => {
      let updated = [...prev];

      const isPlan = PLAN_IDS.includes(id);

      // If item is a plan → remove previous plans
      if (isPlan) {
        updated = updated.filter((item) => !PLAN_IDS.includes(item.id));
      }

      const existing = updated.find((item) => item.id === id);

      if (existing) {
        return updated.map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...updated, { id, name, price, quantity: 1 }];
    });
  };

  const increaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCartItems([]);

  const totalItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        increaseQty,
        decreaseQty,
        removeFromCart,
        clearCart,
        totalItems,
        totalAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);

  if (!ctx) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return ctx;
}