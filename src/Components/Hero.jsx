import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import Header from "./Header";
import Heroimage from "../assets/hero-image (2).png";
import "./Hero.css";
import AboutOurFood from "./AboutOurFood";

const HeroSection = () => {
  const textRef = useRef(null);
  const paragraphRef = useRef(null);
  const btnRef = useRef(null);
  const imageRef = useRef(null);
  const introRef = useRef(null);

  useEffect(() => {
    const words = textRef.current.querySelectorAll("span");
    const paragraph = paragraphRef.current;
    const buttons = btnRef.current.children;
    const image = imageRef.current;
    const intro = introRef.current;

    gsap.set([words, paragraph, buttons, image, intro], {
      opacity: 0,
      y: 60,
    });

    const tl = gsap.timeline({ delay: 0.3 });
    tl.to(intro, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
    })
      .to(
        words,
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 1,
          ease: "power4.out",
        },
        "-=0.4"
      )
      .to(
        paragraph,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.5"
      )
      .to(
        buttons,
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.3"
      )
      .to(
        image,
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.4"
      );
  }, []);

  return (
    <>
      <section id="hero-section">
        <div className="hero-content">
          <div className="hero-text-container">
            <h3 ref={textRef} className="hero-title">
              {[
                "The",
                "Best",
                "Food,",
                "Cake",
                "&",
                "Pastry",
                "in",
                "Belleville",
              ].map((word, i) => (
                <span key={i} className="hero-word">
                  {word === "Belleville" ? (
                    <div className="highlight">{word}</div>
                  ) : (
                    <>{word}&nbsp;</>
                  )}
                </span>
              ))}
            </h3>

            <p ref={paragraphRef} className="hero-subtext">
              Taste the difference — freshly baked, locally made, and perfectly
              delivered to your door.
            </p>

            <div ref={btnRef} className="hero-buttons">
              <button className="btn primary">Order Now</button>
              <button className="btn secondary">View Menu</button>
            </div>
          </div>
        </div>

        <div className="hero-image-container">
          {/* <img ref={imageRef} src={Heroimage} alt="Main Dish" className="hero-image" /> */}
        </div>
      </section>
    </>
  );
};

export default HeroSection;
