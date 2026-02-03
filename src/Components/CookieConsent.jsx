import React, { useState, useEffect } from "react";
import gsap from "gsap";
import { FiCheck, FiInfo } from "react-icons/fi";

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user already accepted
    const hasConsent = localStorage.getItem("cookie-consent");
    if (!hasConsent) {
      setIsVisible(true);
      

      gsap.fromTo(
        "#cookie-card",
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 2, ease: "power4.out" }
      );
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "true");
    gsap.to("#cookie-card", {
      y: 100,
      opacity: 0,
      duration: 0.5,
      ease: "power4.in",
      onComplete: () => setIsVisible(false),
    });
  };

  if (!isVisible) return null;

  return (
    <div
      id="cookie-card"
      className="fixed bottom-6 left-6 right-6 md:left-auto md:right-12 md:max-w-md z-[100]"
    >
      <div className="bg-white/80 backdrop-blur-xl border border-gray-100 p-6 rounded-[2rem] shadow-2xl flex flex-col gap-4">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-[#ac0121]/10 flex items-center justify-center shrink-0">
            <FiInfo className="text-[#ac0121]" size={20} />
          </div>
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-gray-900 mb-1">
              Privacy & Cookies
            </h4>
            <p className="text-[13px] text-gray-500 font-medium leading-relaxed">
              We use cookies to improve your experience on our site. By continuing to browse, you agree to our 
              <span className="text-[#ac0121] cursor-pointer hover:underline ml-1">Privacy Policy</span> in accordance with Canadian laws.
            </p>
          </div>
        </div>

        <div className="flex gap-3 mt-2">
          <button
            onClick={handleAccept}
            className="flex-1 h-12 bg-gray-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#ac0121] transition-all duration-300 flex items-center justify-center gap-2"
          >
            <FiCheck size={16} /> Accept All
          </button>
          <button
            onClick={handleAccept}
            className="px-6 h-12 border border-gray-100 text-gray-400 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 transition-all"
          >
            Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;