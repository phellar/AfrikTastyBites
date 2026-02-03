import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import Heroimage from "../assets/hero-image (2).png";
import { FiArrowRight, FiPlay } from "react-icons/fi";

const HeroSection = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const subtextRef = useRef(null);
  const btnRef = useRef(null);
  const imageRef = useRef(null);
  const shadowRef = useRef(null);

  useEffect(() => {
    const words = textRef.current.querySelectorAll(".hero-word");
    const tl = gsap.timeline({ delay: 0.2 });

    tl.fromTo(containerRef.current, { opacity: 0 }, { opacity: 1, duration: 1 })
      .fromTo(shadowRef.current, 
        { opacity: 0, scale: 1.1 }, 
        { opacity: 0.04, scale: 1, duration: 1.5, ease: "power3.out" }, 
        "0"
      )
      .fromTo(words, 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.8, ease: "power3.out" },
        "-=1"
      )
      .fromTo(subtextRef.current, { opacity: 0 }, { opacity: 1, duration: 0.7 }, "-=0.5")
      .fromTo(btnRef.current.children, 
        { opacity: 0, y: 10 }, 
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.6 }, 
        "-=0.4"
      )
      .fromTo(imageRef.current, 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" }, 
        "-=0.7"
      );
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen w-full flex flex-col items-center justify-start bg-[#fafaf9] pt-28 px-6 overflow-hidden">
      
      {/* THE OVERLAY (Background Watermark) */}
      {/* 'absolute inset-0' ensures it doesn't take up space or divide content */}
      <div 
        ref={shadowRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0"
      >
        <h2 className="text-[18vw] font-black uppercase leading-none text-gray-900 tracking-tighter">
          AfrikTasty
        </h2>
      </div>

      {/* FOREGROUND CONTENT STACK */}
      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center text-center">
        
        {/* Modern Badge */}
        <div className="px-4 py-1.5 rounded-full border border-gray-100 bg-white/60 backdrop-blur-md mb-6 shadow-sm">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#ac0121]">
            EST. 2026 • Premium Quality
          </p>
        </div>

        {/* Centered Headline */}
        <h1 ref={textRef} className="text-5xl md:text-7xl font-bold text-gray-900 leading-[1.1] tracking-tight mb-4">
          {["The", "Best", "Food,", "Cake", "&", "Pastry", "In", "Belleville"].map((word, i) => (
            <span key={i} className={`hero-word inline-block mr-2 ${word === 'Belleville' ? 'text-[#ac0121]' : ''}`}>
              {word}
            </span>
          ))}
        </h1>

        {/* Subtext */}
        <p ref={subtextRef} className="text-gray-500 text-base md:text-lg font-medium max-w-lg mb-8">
          Freshly baked, locally made, and perfectly delivered.
        </p>

        {/* Buttons */}
        <div ref={btnRef} className="flex flex-row items-center gap-4 mb-0 z-20">
          <button className="h-12 px-8 bg-[#ac0121] text-white rounded-full font-bold text-xs tracking-widest flex items-center justify-center gap-2 hover:bg-black transition-all shadow-lg shadow-red-200/30">
            Order Now <FiArrowRight />
          </button>
          <button className="h-12 px-8 bg-white/80 backdrop-blur-md text-gray-900 border border-gray-200 rounded-full font-bold text-xs tracking-widest flex items-center justify-center gap-2 hover:bg-gray-50 transition-all">
            <FiPlay className="text-[#ac0121] fill-[#ac0121]" /> Menu
          </button>
        </div>

        {/* HERO IMAGE - Sitting immediately below buttons */}
        <div className="relative w-full max-w-2xl mx-auto  md:-mt-6">
            <img 
              ref={imageRef} 
              src={Heroimage} 
              alt="Signature Dish" 
              className="relative z-10 w-full h-auto drop-shadow-[0_30px_50px_rgba(0,0,0,0.12)]"
            />
            {/* Subtle glow effect behind the image */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#ac0121] opacity-5 blur-[100px] rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;