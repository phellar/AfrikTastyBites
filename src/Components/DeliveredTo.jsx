import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiMapPin } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

const provinces = [
  "Ontario", "Quebec", "British Columbia", "Alberta", "Manitoba", 
  "Saskatchewan", "Nova Scotia", "New Brunswick", "Prince Edward Island", 
  "Newfoundland and Labrador", "Northwest Territories", "Yukon", "Nunavut"
];

const DeliverToSection = () => {
  const sectionRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      itemsRef.current,
      { opacity: 0, scale: 0.9, y: 20 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        stagger: 0.05,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      }
    );
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative py-24 bg-[#0a0a0a] overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#ac0121]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        {/* Header Block */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ac0121]/10 border border-[#ac0121]/20 mb-6">
            <FiMapPin className="text-[#ac0121]" size={14} />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#ac0121]">
              Coast to Coast
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-4">
            Delivering across <span className="text-[#ac0121]">Canada</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto font-medium italic">
            Bringing the taste of home to every province and territory.
          </p>
        </div>

        {/* Province Grid */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-5xl mx-auto">
          {provinces.map((province, i) => (
            <div
              key={i}
              ref={(el) => (itemsRef.current[i] = el)}
              className="group flex items-center gap-3 bg-white/[0.03] backdrop-blur-md border border-white/[0.08] rounded-2xl px-6 py-4 transition-all duration-300 hover:bg-[#ac0121] hover:border-[#ac0121] hover:-translate-y-1 cursor-default"
            >
              {/* Modern Dot instead of loud flags */}
              <div className="w-2 h-2 rounded-full bg-[#ac0121] group-hover:bg-white transition-colors" />
              
              <span className="text-gray-300 font-bold text-xs uppercase tracking-widest group-hover:text-white transition-colors">
                {province}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom Callout */}
        <div className="mt-16 text-gray-600 text-[10px] font-black uppercase tracking-[0.4em]">
          Next Day Delivery Available in Major Cities
        </div>
      </div>
    </section>
  );
};

export default DeliverToSection;