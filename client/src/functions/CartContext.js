import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((cartItem) => cartItem.id === item.id);

      if (existingItem) {
        return prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      } else {
        return [...prevItems, item];
      }
    });
    setTotalAmount((prevAmount) => prevAmount + item.price * item.quantity);
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => {
      const itemToRemove = prevItems.find((item) => item.id === id);
      setTotalAmount((prevAmount) => prevAmount - itemToRemove.price * itemToRemove.quantity);

      const updatedItems = prevItems.filter((item) => item.id !== id);
      return updatedItems;
    });
  };

  const increaseQuantity = (id) => {
    setCartItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, quantity: item.quantity + 1 };
          setTotalAmount((prevAmount) => prevAmount + item.price);
          return updatedItem;
        }
        return item;
      });
    });
  };

  const decreaseQuantity = (id) => {
    setCartItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.id === id && item.quantity > 1) {
          const updatedItem = { ...item, quantity: item.quantity - 1 };
          setTotalAmount((prevAmount) => prevAmount - item.price);
          return updatedItem;
        }
        return item;
      });
    });
  };

  const clearCart = () => {
    setCartItems([]);
    setTotalAmount(0);
  };

  return (
    <CartContext.Provider value={{ cartItems, totalAmount, addToCart, removeFromCart, increaseQuantity, decreaseQuantity,clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

