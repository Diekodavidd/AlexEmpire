import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartLoaded, setIsCartLoaded] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
    setIsCartLoaded(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (isCartLoaded) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems, isCartLoaded]);

  const addToCart = (product) => {
    const exists = cartItems.find((item) => item._id === product._id);
    if (exists) {
      alert("Product already in cart");
      return;
    }
    setCartItems([...cartItems, {
      ...product,
      quantity: 1,
      image: product.imageUrl?.[0] || "",
    }]);
  };

  const updateQuantity = (_id, action) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === _id
          ? {
              ...item,
              quantity: action === "inc"
                ? item.quantity + 1
                : item.quantity > 1 ? item.quantity - 1 : item.quantity
            }
          : item
      )
    );
  };

  const removeFromCart = (_id) => {
    setCartItems(cartItems.filter((item) => item._id !== _id));
  };

  const getTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        getTotal,
        setCartItems
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
