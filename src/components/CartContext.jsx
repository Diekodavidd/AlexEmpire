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

  // Save to localStorage whenever cartItems state changes
  useEffect(() => {
    if (isCartLoaded) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems, isCartLoaded]);

  const addToCart = (product) => {
    const exists = cartItems.find((item) => item._id === product._id);
    if (exists) {
      // Optionally, you can increase the quantity if the product already exists in the cart
      setCartItems(prevItems =>
        prevItems.map(item =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, {
        ...product,
        productId: product._id,   
        quantity: 1,
        image: product.imageUrl?.[0] || "default-image.jpg",  // Use a default image if undefined
      }]);
    }
  };

  const updateQuantity = (_id, action) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === _id
          ? {
              ...item,
              quantity:
                action === "inc"
                  ? item.quantity + 1
                  : Math.max(item.quantity - 1, 1)  // Ensure quantity doesn't go below 1
            }
          : item
      )
    );
  };

  const removeFromCart = (_id) => {
    setCartItems((prevItems) => {
      const updatedCart = prevItems.filter((item) => item._id !== _id);
      // Update localStorage immediately after removing the item
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const getTotald = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };
  const getTotal = () => {
    return cartItems.reduce((total, item) => total + item.productId.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        getTotal,
        getTotald,
        setCartItems
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
