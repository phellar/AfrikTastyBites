import React, { useState } from "react";
import { useCart } from "../Contexts/CartContext";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { items, totalAmount } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    // simulate payment and redirect
    setTimeout(() => {
      navigate("/payment-success", {
        state: { amount: totalAmount.toFixed(2) },
      });
    }, 1500);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">

      {/* Billing Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow p-5 rounded-lg"
      >
        <h2 className="text-xl font-semibold mb-4">Billing Details</h2>

        <div className="flex flex-col gap-3">
          <input
            name="name"
            onChange={handleChange}
            value={form.name}
            className="border p-3 rounded"
            placeholder="Full Name"
          />
          <input
            name="email"
            onChange={handleChange}
            value={form.email}
            className="border p-3 rounded"
            placeholder="Email Address"
          />
          <input
            name="phone"
            onChange={handleChange}
            value={form.phone}
            className="border p-3 rounded"
            placeholder="Phone Number"
          />
          <input
            name="address"
            onChange={handleChange}
            value={form.address}
            className="border p-3 rounded"
            placeholder="Delivery Address"
          />
        </div>

        <button className="mt-6 bg-[#ac0121] text-white px-4 py-3 rounded-lg w-full">
          Simulate Payment
        </button>
      </form>

      {/* Order Summary */}
      <div className="bg-white shadow p-5 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

        {items.length === 0 ? (
          <p>No items in cart</p>
        ) : (
          <div className="flex flex-col gap-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b pb-2"
              >
                <p>{item.product_name}</p>
                <p>₦{(item.price * item.qty).toFixed(2)}</p>
              </div>
            ))}

            <h3 className="text-lg font-bold mt-4">
              Total: ₦{totalAmount.toFixed(2)}
            </h3>
          </div>
        )}
      </div>

    </div>
  );
}
