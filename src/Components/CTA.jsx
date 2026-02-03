import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiArrowRight, FiShoppingBag } from "react-icons/fi";
import CTAImage from "../assets/ewa.jpeg";

gsap.registerPlugin(ScrollTrigger);

const ModernCTA = () => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });

    tl.fromTo(containerRef.current, 
      { scale: 0.95, opacity: 0 }, 
      { scale: 1, opacity: 1, duration: 1, ease: "power4.out" }
    )
    .fromTo(contentRef.current.children, 
      { opacity: 0, x: -20 }, 
      { opacity: 1, x: 0, stagger: 0.2, duration: 0.8 }, 
      "-=0.6"
    )
    .fromTo(imageRef.current, 
      { opacity: 0, x: 50, rotate: 3 }, 
      { opacity: 1, x: 0, rotate: 0, duration: 1.2, ease: "expo.out" }, 
      "-=0.8"
    );
  }, []);

  return (
    <section className="py-24 px-6 bg-[#fafaf9] overflow-hidden">
      <div 
        ref={containerRef}
        className="max-w-7xl mx-auto relative bg-[#ac0121] rounded-[3rem] overflow-visible flex flex-col lg:flex-row items-center pt-16 pb-16 lg:pb-0 px-8 lg:px-20 gap-12 shadow-2xl shadow-red-900/20"
      >
        
        {/* Decorative Background Text */}
        <div className="absolute top-0 left-10 text-white/5 text-[10rem] font-black select-none pointer-events-none uppercase">
          Taste
        </div>

        {/* LEFT: Content Block */}
        <div ref={contentRef} className="lg:w-1/2 text-left z-10 lg:py-24">
          <div className="inline-block px-4 py-1 rounded-full bg-white/10 border border-white/20 mb-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white">
              Limited Availability
            </p>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-6">
            Crave the True <br />
            <span className="italic font-medium text-red-200">Taste of Africa</span>
          </h2>
          
          <p className="text-white/80 text-lg font-medium max-w-md mb-10 leading-relaxed">
            Indulge in authentic Nigerian flavors, freshly crafted and delivered straight to your door in Canada.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <button className="h-14 px-10 bg-white text-[#ac0121] rounded-full font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-gray-900 hover:text-white transition-all duration-300 shadow-xl">
              <FiShoppingBag /> Order Now
            </button>
            <button className="h-14 px-10 bg-transparent border border-white/30 text-white rounded-full font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-white/10 transition-all">
              Explore Menu <FiArrowRight />
            </button>
          </div>
        </div>

        {/* RIGHT: Image Block - Floating & Clean */}
        <div className="lg:w-1/2 relative lg:-mb-16">
          <div className="relative group">
            {/* Subtle glow behind image */}
            <div className="absolute inset-0 bg-white/20 blur-3xl rounded-full scale-75 group-hover:scale-90 transition-transform duration-700" />
            
            <img
              ref={imageRef}
              src={CTAImage}
              alt="Authentic African Flavors"
              className="relative z-10 w-full max-w-lg mx-auto rounded-[2rem] shadow-2xl transform transition-transform duration-700 hover:-translate-y-2 object-cover aspect-[4/5]"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default ModernCTA;