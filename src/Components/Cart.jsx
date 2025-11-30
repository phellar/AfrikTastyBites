import React from "react";
import { useCart } from "../Contexts/CartContext";
import { RiDeleteBin6Line } from "react-icons/ri"; // delete icon
import { FiX } from "react-icons/fi"; // close icon

const Cart = ({ onClose }) => {
  const { items = [], totalQty, totalAmount, removeFromCart } = useCart();

  const formatCurrency = (amount) => `$${Number(amount).toFixed(2)}`;

  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-lg mx-auto mt-10 relative">
      {/* Close button for drawer */}
      {onClose && (
        <FiX
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 cursor-pointer"
          size={24}
        />
      )}

      <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>

      {items.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          {items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center mb-4 border-b pb-3"
            >
              {/* Product Image */}
              <img
                src={item.image}
                alt={item.product_name}
                className="w-16 h-16 object-cover rounded-lg mr-4"
              />

              {/* Product Info */}
              <div className="flex-1">
                <p className="font-medium">{item.product_name}</p>
                <p className="text-gray-500">
                  {formatCurrency(item.price)} × {item.qty}
                </p>
              </div>

              {/* Total Price */}
              {/* <p className="font-semibold">{formatCurrency(item.price * item.qty)}</p> */}

              {/* Remove Button */}
              <button
                onClick={() => removeFromCart(item.id)}
                className="ml-4  transition flex items-center 
                            bg-[#ac0121] p-1 text-white rounded-sm"
              >
                <RiDeleteBin6Line size={20} />
              </button>
            </div>
          ))}

          {/* Cart Summary */}
          <div className="border-t pt-4 mt-4">
            <p className="font-semibold text-lg">
              Total Items: <span className="text-[#ac0121]">{totalQty}</span>
            </p>
            <p className="font-semibold text-lg">
              Total Amount: <span className="text-[#ac0121]">{formatCurrency(totalAmount)}</span>
            </p>

            <a
              href="/checkout"
              className="block mt-5 bg-[#ac0121] text-white text-center py-3 rounded-lg font-medium hover:bg-[#8a0018] transition"
            >
              Proceed to Checkout
            </a>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
