import React, { useEffect } from "react";
import { useCart } from "../Contexts/CartContext";
import Cart from "./Cart";
import { FiX } from "react-icons/fi";

const CartDrawer = () => {
  const { isCartOpen, closeCart } = useCart();

  // Prevent background body scroll when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isCartOpen]);

  return (
    <>
      {/* 1. DARK OVERLAY - Fixes the 'not closing' issue by allowing clicks outside */}
      <div 
        onClick={closeCart}
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-500 z-[80] ${
          isCartOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* 2. THE DRAWER - Higher z-index to stay on top of Header/Icons */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl transform transition-transform duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] z-[90]
        ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Sleek Close Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-gray-900">
            Cart
          </h3>
          <button
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-50 transition-colors"
            onClick={closeCart}
          >
            <FiX size={24} className="text-gray-900" />
          </button>
        </div>

        {/* The Cart Content Section */}
        <div className="h-[calc(100%-80px)] overflow-y-auto">
          <Cart />
        </div>
      </div>
    </>
  );
};

export default CartDrawer;