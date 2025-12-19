import React, { useState } from "react";
import { useCart } from "../Contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { FiUser, FiMail, FiPhone, FiMapPin, FiCreditCard, FiLoader, FiLock } from "react-icons/fi";

// Initialize Stripe outside of component to avoid re-creation on render
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

function CheckoutForm() {
  const { items, totalAmount } = useCart();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);
    setError(null);

    // Step 1: Create Payment Method via Stripe
    const cardElement = elements.getElement(CardElement);
    const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: {
        name: form.name,
        email: form.email,
        phone: form.phone,
        address: { line1: form.address },
      },
    });

    if (stripeError) {
      setError(stripeError.message);
      setIsProcessing(false);
    } else {
      // Step 2: In a real app, you'd send paymentMethod.id to your server here
      console.log("Payment Success:", paymentMethod);
      
      // Simulate server confirmation
      setTimeout(() => {
        setIsProcessing(false);
        navigate("/payment-success", {
          state: { amount: totalAmount.toFixed(2) },
        });
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT: Forms */}
          <div className="lg:col-span-8 space-y-6">
            <form onSubmit={handleSubmit}>
              {/* Billing Section */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <FiUser className="text-[#ac0121]" /> Shipping Details
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2 relative">
                    <FiUser className="absolute left-4 top-4 text-gray-400" />
                    <input
                      required
                      name="name"
                      placeholder="Full Name"
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#ac0121] outline-none transition-all"
                    />
                  </div>
                  
                  <div className="relative">
                    <FiMail className="absolute left-4 top-4 text-gray-400" />
                    <input
                      required
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#ac0121] outline-none"
                    />
                  </div>

                  <div className="relative">
                    <FiPhone className="absolute left-4 top-4 text-gray-400" />
                    <input
                      required
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#ac0121] outline-none"
                    />
                  </div>

                  <div className="md:col-span-2 relative">
                    <FiMapPin className="absolute left-4 top-4 text-gray-400" />
                    <textarea
                      required
                      name="address"
                      placeholder="Street Address, City, State"
                      rows="2"
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#ac0121] outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Stripe Payment Section */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <FiCreditCard className="text-[#ac0121]" /> Payment Method
                </h2>
                
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl">
                  <CardElement 
                    options={{
                      style: {
                        base: {
                          fontSize: '16px',
                          color: '#374151',
                          '::placeholder': { color: '#9ca3af' },
                        },
                        invalid: { color: '#ac0121' },
                      },
                    }}
                  />
                </div>
                {error && <p className="mt-2 text-sm text-[#ac0121] font-medium">{error}</p>}
              </div>

              <button
                disabled={isProcessing || !stripe}
                className="w-full mt-8 bg-[#ac0121] hover:bg-[#8b011a] text-white font-bold py-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isProcessing ? (
                  <FiLoader className="animate-spin" size={20} />
                ) : (
                  <>
                    <FiLock size={18} />
                    Complete Payment - ${totalAmount.toLocaleString()}
                  </>
                )}
              </button>
            </form>
          </div>

          {/* RIGHT: Summary */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-10">
              <h2 className="text-lg font-bold text-gray-800 mb-4 uppercase tracking-wider">Your Order</h2>
              
              <div className="divide-y divide-gray-100 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                {items.map((item) => (
                  <div key={item.id} className="py-4 flex justify-between">
                    <div>
                      <p className="font-semibold text-gray-700">{item.product_name}</p>
                      <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                    </div>
                    <p className="font-bold text-gray-800">${(item.price * item.qty).toLocaleString()}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
                <div className="flex justify-between text-gray-500 font-medium">
                  <span>Subtotal</span>
                  <span>${totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-green-600 font-medium italic">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between text-2xl font-black text-gray-900 pt-2 border-t border-gray-50">
                  <span>Total</span>
                  <span>${totalAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// Final Wrapper Export
export default function Checkout() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}