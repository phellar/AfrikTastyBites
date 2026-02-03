import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppBtn = () => {
  const buttonRef = useRef(null);

  useEffect(() => {

    gsap.fromTo(
      buttonRef.current,
      { opacity: 0, x: 50, scale: 0.8 },
      { 
        opacity: 1, 
        x: 0, 
        scale: 1, 
        duration: 1, 
        delay: 2, 
        ease: "power4.out" 
      }
    );
  }, []);

  const handleWhatsAppClick = () => {
    const phoneNumber = "15146193013"; 
    const message = encodeURIComponent("Hello! I'd like to place an order for.");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <div
      ref={buttonRef}
      className="fixed bottom-8 right-8 z-[50] group"
    >

      <div className="absolute right-16 top-1/2 -translate-y-1/2 px-4 py-2 bg-white shadow-xl rounded-xl border border-gray-100 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap">
        <p className="text-[10px] font-black uppercase tracking-widest text-gray-900">
          Chat with us
        </p>
      </div>

      {/* The Button */}
      <button
        onClick={handleWhatsAppClick}
        className="relative w-14 h-14 bg-white/90 backdrop-blur-md border border-gray-100 rounded-full flex items-center justify-center text-gray-900 shadow-2xl transition-all duration-500 hover:bg-[#25D366] hover:text-white hover:rotate-[360deg] active:scale-95"
      >
        <FaWhatsapp size={26} />
        
        {/* Subtle Brand Red Pulse */}
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ac0121] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-[#ac0121] border-2 border-white"></span>
        </span>
      </button>
    </div>
  );
};

export default WhatsAppBtn;