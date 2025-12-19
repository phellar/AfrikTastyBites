import React, { useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { FiCheckCircle, FiArrowRight, FiShoppingBag, FiDownload } from "react-icons/fi";
import confetti from "canvas-confetti";

export default function Success() {
  const location = useLocation();
  const navigate = useNavigate();
  const amount = location.state?.amount || "0.00";
  const orderNumber = Math.floor(Math.random() * 1000000); 

  useEffect(() => {
    // Trigger confetti on mount
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) return clearInterval(interval);

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 overflow-hidden border border-gray-100">
          
          {/* Success Header */}
          <div className="bg-[#ac0121]/5 py-12 flex flex-col items-center text-center px-6">
            <div className="w-20 h-20 bg-[#ac0121] rounded-full flex items-center justify-center mb-6 shadow-lg shadow-red-200 animate-bounce-short">
              <FiCheckCircle size={40} className="text-white" />
            </div>
            <h1 className="text-3xl font-black text-gray-900 mb-2">Order Confirmed!</h1>
            <p className="text-gray-500 font-medium">
              Thank you for your purchase. We've sent a receipt to your email.
            </p>
          </div>

          {/* Order Details Card */}
          <div className="p-8">
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center pb-4 border-b border-gray-50">
                <span className="text-gray-400 font-medium text-sm italic">Order Number</span>
                <span className="font-bold text-gray-800 text-sm">#ORD-{orderNumber}</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-gray-50">
                <span className="text-gray-400 font-medium text-sm italic">Amount Paid</span>
                <span className="font-black text-gray-900 text-lg">${Number(amount).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 font-medium text-sm italic">Status</span>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  Paid
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Link
                to="/"
                className="w-full bg-[#ac0121] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#8b011a] transition-all shadow-md active:scale-[0.98]"
              >
                Continue Shopping
                <FiArrowRight />
              </Link>
              
              <button className="w-full bg-white text-gray-600 font-semibold py-4 rounded-xl flex items-center justify-center gap-2 border border-gray-200 hover:bg-gray-50 transition-all">
                <FiDownload />
                Download Invoice
              </button>
            </div>
          </div>
        </div>

        {/* Support Link */}
        <p className="text-center mt-8 text-sm text-gray-400">
          Having trouble? <button className="text-[#ac0121] font-bold hover:underline">Contact Support</button>
        </p>
      </div>
    </div>
  );
}