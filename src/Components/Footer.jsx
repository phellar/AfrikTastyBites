import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaApple, FaGooglePlay, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      footerRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
        },
      }
    );
  }, []);

  return (
    <footer ref={footerRef} className="bg-[#111] text-gray-300 py-16 px-6 md:px-16 text-center">
      <h3 className="text-xl font-medium mb-6">So what are you waiting for? Come on over and try something new today!</h3>
      <p className="text-sm mb-8">We’ve got deals every month. Check out our website often!</p>

      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <button className="border-2 border-[#ac0121] text-[#ac0121] px-6 py-2 rounded-full font-medium hover:bg-[#ac0121] hover:text-white transition">
          Get Started
        </button>
        <button className="bg-[#ac0121] text-white px-6 py-2 rounded-full font-medium hover:bg-[#92011c] transition">
          How to Order
        </button>
      </div>

      <div className="flex justify-center gap-6 text-2xl mb-8">
        <FaApple className="hover:text-white transition" />
        <FaGooglePlay className="hover:text-white transition" />
        <FaFacebook className="hover:text-[#ac0121] transition" />
        <FaTwitter className="hover:text-[#ac0121] transition" />
        <FaInstagram className="hover:text-[#ac0121] transition" />
      </div>

      <p className="text-sm">© 2025 Afrik. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
