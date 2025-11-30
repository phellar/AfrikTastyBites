import React from "react";
import { FaCcVisa, FaCcMastercard, FaCcPaypal, FaCcAmex, FaStripe, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200">
    
      {/* Bottom Section */}
      <div className="bg-gray-50 border-t border-gray-200 py-8">
        {/* We Accept - Centered */}
        <div className="flex flex-col items-center space-y-3 mb-4">
          <span className="text-gray-700 font-semibold text-lg">We Accept:</span>
          <div className="flex space-x-3">
            {[FaCcVisa, FaCcMastercard, FaCcPaypal, FaCcAmex, FaStripe].map((Icon, idx) => (
              <div
                key={idx}
                className="p-3 bg-white rounded-full shadow-sm hover:shadow-md transition cursor-pointer"
              >
                <Icon className="text-gray-700 text-2xl" />
              </div>
            ))}
          </div>
        </div>

        {/* Copyright - Centered */}
        <div className="text-gray-400 text-sm text-center">
          &copy; {currentYear} Afrk. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
