import React, { useState } from "react";
import { FiMenu, FiX, FiShoppingCart } from "react-icons/fi";
import Logo from "../assets/Logo.png";
import { useCart } from "../Contexts/CartContext";
import CartDrawer from "./CartDrawer"; 

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const { totalQty, openCart } = useCart();

  return (
    <>
      <header className="fixed top-0 w-full bg-black text-white border-b border-black/20 z-50">
        <nav className="flex justify-between items-center px-6 md:px-12 py-4">
          {/* Logo */}
          <div className="flex items-center">
            <img src={Logo} alt="Afrik Logo" width={50} />
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-8 text-white font-medium">
            <li><a href="#home" className="hover:text-orange-500 transition">Home</a></li>
            <li><a href="#menu" className="hover:text-orange-500 transition">Menu</a></li>
            <li><a href="#about" className="hover:text-orange-500 transition">About</a></li>
            <li><a href="#contact" className="hover:text-orange-500 transition">Contact</a></li>
          </ul>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            {/* Cart Icon With Badge */}
            <div className="relative cursor-pointer" onClick={openCart}>
              <FiShoppingCart className="text-white hover:text-orange-500 transition" size={24} />
              {totalQty > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {totalQty}
                </span>
              )}
            </div>

            {/* Mobile Toggle */}
            <button onClick={toggleMenu} className="md:hidden bg-black text-white p-2 rounded-md transition">
              {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-md md:hidden">
            <ul className="flex flex-col items-center py-6 space-y-4 text-black font-medium">
              <li><a href="#home" onClick={toggleMenu} className="hover:text-orange-500 transition">Home</a></li>
              <li><a href="#menu" onClick={toggleMenu} className="hover:text-orange-500 transition">Menu</a></li>
              <li><a href="#about" onClick={toggleMenu} className="hover:text-orange-500 transition">About</a></li>
              <li><a href="#contact" onClick={toggleMenu} className="hover:text-orange-500 transition">Contact</a></li>
            </ul>
          </div>
        )}
      </header>

      {/* Cart Drawer (mounted here so accessible globally) */}
      <CartDrawer />
    </>
  );
};

export default Header;
