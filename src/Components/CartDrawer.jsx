import React from "react";
import { useCart } from "../Contexts/CartContext";
import Cart from "./Cart";

const CartDrawer = () => {
  const { isCartOpen, closeCart } = useCart();

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 z-50
      ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      <button
        className="p-3 bg-gray-200 w-full text-left hover:bg-gray-300"
        onClick={closeCart}
      >
        Close
      </button>

      <Cart />
    </div>
  );
};

export default CartDrawer;
