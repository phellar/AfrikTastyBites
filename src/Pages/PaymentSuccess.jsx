import React from "react";
import { useLocation, Link } from "react-router-dom";

export default function PaymentSuccess() {
  const location = useLocation();
  const amount = location.state?.amount;

  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center p-6">
      <h1 className="text-3xl font-bold text-green-600 mb-4">
        Payment Successful 🎉
      </h1>

      <p className="text-lg mb-2">
        Thank you for your order!
      </p>

      <p className="text-xl font-semibold mb-6">
        Amount Paid: ₦{amount}
      </p>

      <Link
        to="/"
        className="bg-[#ac0121] text-white px-6 py-3 rounded-lg"
      >
        Back to Home
      </Link>
    </div>
  );
}
