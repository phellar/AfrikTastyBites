import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiMenu, FiX, FiShoppingCart } from "react-icons/fi";
import Logo from "../assets/Logo.png";
import { useCart } from "../Contexts/CartContext";
import CartDrawer from "./CartDrawer"; 

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { totalQty, openCart } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = !isOpen ? "hidden" : "unset";
  };

  const textColor = scrolled ? "text-gray-900" : "text-white";
  const iconColor = scrolled ? "text-gray-900" : "text-white";
  const borderColor = scrolled ? "border-gray-100" : "border-white/10";

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Menu", path: "/menu" },
    { name: "About", path: "/#about" },
    { name: "Contact", path: "/#contact" },
  ];

  return (
    <>
      <header 
        className={`fixed top-0 w-full z-[60] transition-all duration-500 border-b ${borderColor} ${
          scrolled 
          ? "bg-white/90 backdrop-blur-xl py-3 shadow-sm" 
          : "bg-transparent py-6"
        }`}
      >
        <nav className="max-w-7xl mx-auto flex justify-between items-center px-6 md:px-12">
          
          <div className="flex items-center cursor-pointer group">
            <img src={Logo} alt="Afrik Logo" className="w-10 md:w-12" />
            <span className={`ml-3 text-lg font-black uppercase tracking-tighter transition-colors duration-500 ${textColor}`}>
              AfrikTasty<span className="text-[#ac0121]">Bites</span>
            </span>
          </div>

          <ul className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <li key={link.name}>
                <NavLink 
                  to={link.path}
                  className={({ isActive }) => `
                    text-[11px] font-black uppercase tracking-[0.2em] transition-colors duration-300
                    ${isActive && link.path === '/menu' ? "text-[#ac0121]" : scrolled ? "text-gray-500 hover:text-[#ac0121]" : "text-white/80 hover:text-white"}
                  `}
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center space-x-6">
            <div className="relative cursor-pointer group" onClick={openCart}>
              <FiShoppingCart 
                size={22} 
                className={`transition-colors duration-300 ${iconColor} group-hover:text-[#ac0121]`} 
              />
              {totalQty > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#ac0121] text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-lg shadow-red-200">
                  {totalQty}
                </span>
              )}
            </div>

            <button 
              onClick={toggleMenu} 
              className={`md:hidden focus:outline-none transition-colors duration-500 ${iconColor}`}
            >
              {isOpen ? <FiX size={26} /> : <FiMenu size={26} />}
            </button>
          </div>
        </nav>

        <div 
          className={`fixed inset-0 bg-white z-[70] flex flex-col items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] ${
            isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
          }`}
        >
          <button onClick={toggleMenu} className="absolute top-8 right-8 text-gray-900">
            <FiX size={32} />
          </button>
          
          <ul className="flex flex-col items-center space-y-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link 
                  to={link.path} 
                  onClick={toggleMenu} 
                  className="text-4xl font-black text-gray-900 hover:text-[#ac0121] transition-colors"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </header>

      <CartDrawer />
    </>
  );
};

export default Header;