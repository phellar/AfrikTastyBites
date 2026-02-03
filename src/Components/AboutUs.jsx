import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AboutImage from "../assets/kelly.jpeg";
import { FiArrowRight } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

const AboutUs = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const accentRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    tl.fromTo(
      imageRef.current,
      { opacity: 0, scale: 1.1, x: -50 },
      { opacity: 1, scale: 1, x: 0, duration: 1.2, ease: "power4.out" }
    )
    .fromTo(
      contentRef.current.children,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: 0.2, duration: 0.8, ease: "power3.out" },
      "-=0.8"
    )
    .fromTo(
      accentRef.current,
      { width: 0 },
      { width: "80px", duration: 0.8, ease: "expo.out" },
      "-=0.5"
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 bg-[#fafaf9] px-6 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 md:gap-24">
        
        {/* LEFT: Styled Image Container */}
        <div className="relative w-full md:w-5/12">
          {/* Decorative frame background */}
          <div className="absolute -top-6 -left-6 w-32 h-32 border-t-2 border-l-2 border-[#ac0121]/20 rounded-tl-3xl" />
          
          <div ref={imageRef} className="relative z-10 overflow-hidden rounded-[2.5rem] shadow-2xl shadow-gray-200">
            <img
              src={AboutImage}
              alt="About AfrikTastyBites"
              className="w-full h-[500px] md:h-[650px] object-cover hover:scale-105 transition-transform duration-700"
            />
            {/* Soft overlay on image bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
          </div>

          {/* Floating stat card */}
          <div className="absolute -bottom-10 -right-6 md:-right-12 bg-white p-8 rounded-3xl shadow-xl z-20 hidden md:block border border-gray-50">
            <p className="text-4xl font-black text-[#ac0121] mb-1">10+</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Years of Authenticity</p>
          </div>
        </div>

        {/* RIGHT: Content */}
        <div
          ref={contentRef}
          className="w-full md:w-7/12 flex flex-col items-start"
        >
          <div ref={accentRef} className="h-1 bg-[#ac0121] mb-8" />
          
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-8 tracking-tight">
            The heart behind <br />
            <span className="text-[#ac0121]">AfrikTastyBites</span>
          </h2>

          <div className="space-y-6 max-w-xl">
            <p className="text-gray-500 text-lg font-medium leading-relaxed italic">
              "We don't just serve food; we bridge cultures through every spice, 
              grain, and perfectly baked crumb."
            </p>
            
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
              Afrik is dedicated to connecting people with the vibrant culture,
              innovative businesses, and unique stories of Africa. Our mission is
              to empower communities and promote growth through technology and
              creativity.
            </p>

            <p className="text-gray-600 leading-relaxed text-sm md:text-base opacity-80">
              From promoting local entrepreneurs to highlighting African art and
              culture, Afrik strives to be the go-to platform for discovering the
              best of Africa while fostering sustainable development.
            </p>
          </div>

          <button className="mt-12 group flex items-center gap-4 text-sm font-black uppercase tracking-[0.2em] text-[#ac0121] hover:text-black transition-colors">
            Learn More About Our Journey 
            <span className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-[#ac0121] group-hover:text-white transition-all">
              <FiArrowRight />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;