import React from "react";
import { 
  FaCcVisa, FaCcMastercard, FaCcPaypal, FaCcAmex, FaStripe, 
  FaFacebookF, FaInstagram, FaTwitter, FaWhatsapp 
} from "react-icons/fa";
import { FiArrowUp, FiMail, FiPhone, FiMapPin } from "react-icons/fi";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white border-t border-gray-100 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* TOP SECTION: BRAND & LINKS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          
          {/* Brand Column */}
          <div className="col-span-1 lg:col-span-1">
            <h3 className="text-xl font-black uppercase tracking-tighter mb-6">
              AfrikTasty<span className="text-[#ac0121]">Bite</span>
            </h3>
            <p className="text-gray-400 text-sm font-medium leading-relaxed mb-8 max-w-xs">
              Authentic West African flavors delivered with modern soul. Crafting the best food, cakes, and pastries in Belleville.
            </p>
            <div className="flex gap-4">
              {[FaFacebookF, FaInstagram, FaTwitter, FaWhatsapp].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:text-[#ac0121] hover:border-[#ac0121] transition-all">
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-900 mb-8">Navigation</h4>
            <ul className="space-y-4 text-sm font-bold text-gray-400">
              <li><a href="#" className="hover:text-[#ac0121] transition-colors">Our Menu</a></li>
              <li><a href="#" className="hover:text-[#ac0121] transition-colors">Catering Services</a></li>
              <li><a href="#" className="hover:text-[#ac0121] transition-colors">Order Online</a></li>
              <li><a href="#" className="hover:text-[#ac0121] transition-colors">Our Story</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-900 mb-8">Get In Touch</h4>
            <ul className="space-y-4 text-sm font-bold text-gray-400">
              <li className="flex items-center gap-3"><FiMail className="text-[#ac0121]" /> kelly@afriktastybites.com</li>
              <li className="flex items-center gap-3"><FiPhone className="text-[#ac0121]" /> +1 (416) 992-2774</li>
              <li className="flex items-center gap-3"><FiMapPin className="text-[#ac0121]" /> Belleville, ON, Canada</li>
            </ul>
          </div>

          {/* Back to Top / Newsletter */}
          <div className="flex flex-col items-start lg:items-end">
             <button 
              onClick={scrollToTop}
              className="group flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-[#ac0121] transition-all"
             >
                Back to Top 
                <div className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center group-hover:border-[#ac0121] group-hover:bg-[#ac0121] group-hover:text-white transition-all">
                  <FiArrowUp />
                </div>
             </button>
          </div>
        </div>

        {/* BOTTOM SECTION: PAYMENT & COPYRIGHT */}
        <div className="pt-10 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-8">
          
          {/* Payment Providers - Minimalist Style */}
          <div className="flex items-center gap-6 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
            <FaCcVisa size={32} />
            <FaCcMastercard size={32} />
            <FaCcPaypal size={32} />
            <FaCcAmex size={32} />
            <FaStripe size={40} />
          </div>

          {/* Copyright */}
          <div className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">
            &copy; {currentYear} AfrikTastyBite. Built with Soul.
          </div>

          {/* Legal */}
          <div className="flex gap-6 text-[10px] font-black uppercase tracking-[0.1em] text-gray-300">
            <a href="#" className="hover:text-gray-900 transition-colors">Privacy</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Terms</a>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;