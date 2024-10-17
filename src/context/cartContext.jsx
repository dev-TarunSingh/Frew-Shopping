import { createContext, useState } from "react";

export const cartContext = createContext();

export const CartProvider = (props) => {
  const [cartItems, setCartItems] = useState([]);

  function addToCart(product) {
    setCartItems([...cartItems, product]);
  }

  function removeFromCart(product) {
    setCartItems(cartItems.filter((item) => item.id !== product.id));
  }

  const totalPrice = cartItems.reduce((total, product) => total + product.price, 0)

  return (
    <cartContext.Provider value={{ cartItems, setCartItems, addToCart, removeFromCart, totalPrice }}>
      {props.children}
    </cartContext.Provider>
  );
};