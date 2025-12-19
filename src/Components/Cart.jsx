import React from "react";
import { useCart } from "../Contexts/CartContext";
import { RiDeleteBin6Line } from "react-icons/ri"; 
import { FiX, FiShoppingBag } from "react-icons/fi"; 
import { Link } from "react-router-dom";

const Cart = ({ onClose }) => {
  const { items = [], totalQty, totalAmount, removeFromCart } = useCart();

  // Clean currency formatter
  const formatCurrency = (amount) => `₦${Number(amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}`;

  return (
    <div className="p-8 bg-white shadow-2xl rounded-3xl max-w-lg mx-auto mt-10 relative border border-gray-100">
      {/* Close button for drawer */}
      {onClose && (
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-[#ac0121] transition-colors p-1"
        >
          <FiX size={26} />
        </button>
      )}

      <h2 className="text-2xl font-black text-gray-800 mb-8 flex items-center gap-2">
        Your Cart
      </h2>

      {items.length === 0 ? (
        <div className="text-center py-10">
          <FiShoppingBag className="mx-auto text-gray-200 mb-3" size={48} />
          <p className="text-gray-500 font-medium">Your cart is empty.</p>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center pb-4 border-b border-gray-100 last:border-0"
              >
                {/* Product Image */}
                <div className="w-20 h-20 flex-shrink-0 bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
                  <img
                    src={item.image}
                    alt={item.product_name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 px-4">
                  <p className="font-bold text-gray-800 text-base leading-tight">
                    {item.product_name}
                  </p>
                  <p className="text-gray-500 text-sm mt-1">
                    {formatCurrency(item.price)} <span className="text-gray-300 mx-1">×</span> {item.qty}
                  </p>
                </div>

                {/* Remove Button - Red Background as requested */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="ml-2 bg-[#ac0121] hover:bg-[#8b011a] p-2.5 text-white rounded-xl shadow-lg shadow-red-100 transition-all active:scale-95"
                  title="Remove Item"
                >
                  <RiDeleteBin6Line size={20} />
                </button>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="border-t border-gray-100 pt-6 mt-6 space-y-2">
            <p className="flex justify-between items-center text-gray-600 font-medium">
              Total Items: 
              <span className="text-[#ac0121] font-bold bg-red-50 px-3 py-0.5 rounded-full text-sm">
                {totalQty}
              </span>
            </p>
            <p className="flex justify-between items-center text-gray-900 text-lg font-bold">
              Total Amount: 
              <span className="text-[#ac0121] text-2xl font-black">
                {formatCurrency(totalAmount)}
              </span>
            </p>
            
            <Link
              to="/checkout"
              className="block mt-8 bg-[#ac0121] text-white text-center py-4 rounded-2xl font-bold text-lg hover:bg-[#8a0018] shadow-xl shadow-red-50 transition-all active:transform active:scale-[0.99]"
            >
              Proceed to Checkout
            </Link>
            
            <p className="text-center text-[10px] text-gray-400 mt-4 uppercase tracking-[2px]">
              100% Secure Checkout
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;