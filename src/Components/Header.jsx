import React, { useState } from "react";
import { FiMenu, FiX, FiShoppingCart } from "react-icons/fi";
import Logo from "../assets/Logo.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="fixed top-0 w-full bg-white/10 backdrop-blur-md border-b border-black/20 z-50">
      <nav className="flex justify-between items-center px-6 md:px-12 py-4">
        {/* Logo */}
        <div className="flex items-center">
          <img src={Logo} alt="Afrik Logo" width={40} />
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-8 text-black font-medium">
          <li>
            <a href="#home" className="hover:text-orange-500 transition">
              Home
            </a>
          </li>
          <li>
            <a href="#menu" className="hover:text-orange-500 transition">
              Menu
            </a>
          </li>
          <li>
            <a href="#about" className="hover:text-orange-500 transition">
              About
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:text-orange-500 transition">
              Contact
            </a>
          </li>
        </ul>

        {/* Icons */}
        <div className="flex items-center space-x-4">
          {/* Cart Icon */}
          <FiShoppingCart
            className="text-black cursor-pointer hover:text-orange-500 transition"
            size={24}
          />

          {/* Mobile Toggle */}
          <button
            onClick={toggleMenu}
            className="md:hidden bg-black text-white p-2 rounded-md transition"
          >
            {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md md:hidden">
          <ul className="flex flex-col items-center py-6 space-y-4 text-black font-medium">
            <li>
              <a
                href="#home"
                onClick={toggleMenu}
                className="hover:text-orange-500 transition"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#menu"
                onClick={toggleMenu}
                className="hover:text-orange-500 transition"
              >
                Menu
              </a>
            </li>
            <li>
              <a
                href="#about"
                onClick={toggleMenu}
                className="hover:text-orange-500 transition"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#contact"
                onClick={toggleMenu}
                className="hover:text-orange-500 transition"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
