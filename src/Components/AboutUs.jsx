
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import AboutImage from "../assets/Kelly.jpeg";

const AboutUs = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    // IMAGE slides in from left (with vertical fade)
    gsap.fromTo(
      imageRef.current,
      { opacity: 0, x: -80, y: 50 },
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // TEXT slides in from right (with vertical fade)
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, x: 80, y: 50 },
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.1,
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-white flex flex-col-reverse md:flex-row justify-between px-6 md:px-12 overflow-hidden"

    >
      {/* LEFT: Image */}
      <div ref={imageRef} className="md:w-1/2 mb-8 md:mb-0">
        <img
          src={AboutImage}
          alt="About Afrik"
          className="w-full h-[600px] rounded-2xl shadow-md object-cover"
        />
      </div>

      {/* RIGHT: Content */}
      <div
        ref={contentRef}
       className="md:w-1/2 md:pl-12 text-gray-800 text-left"
      >
        <h2 className="text-4xl font-semibold mb-6">
          About <span className="text-[#ac0121]">AfrikTastyBites</span>
        </h2>
        <p className="text-gray-600 mb-4 leading-relaxed">
          Afrik is dedicated to connecting people with the vibrant culture,
          innovative businesses, and unique stories of Africa. Our mission is
          to empower communities and promote growth through technology and
          creativity.
        </p>
        <p className="text-gray-600 mb-4 leading-relaxed">
          From promoting local entrepreneurs to highlighting African art and
          culture, Afrik strives to be the go-to platform for discovering the
          best of Africa while fostering sustainable development and
          collaboration across the continent.
        </p>
        <p className="text-gray-600 mb-4 leading-relaxed">
          From promoting local entrepreneurs to highlighting African art and
          culture, Afrik strives to be the go-to platform for discovering the
          best of Africa while fostering sustainable development and
          collaboration across the continent.
        </p>
        <p className="text-gray-600 mb-4 leading-relaxed">
          From promoting local entrepreneurs to highlighting African art and
          culture, Afrik strives to be the go-to platform for discovering the
          best of Africa while fostering sustainable development and
          collaboration across the continent.
        </p>
       
      </div>
    </section>
  );
};

export default AboutUs;
