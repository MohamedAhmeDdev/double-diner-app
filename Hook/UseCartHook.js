import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

export const UseCartContext = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw Error("useCartContext must be used inside a CartContextProvider ");
  }

  return context;
};