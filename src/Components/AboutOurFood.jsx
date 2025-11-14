import React, { useRef, useEffect } from "react";
import gsap from "gsap";

const cards = [
  {
    title: "African Dishes",
    desc: "Authentic African meals freshly prepared for you with love and culture.",
    color: "#ac0121",
    img: "https://source.unsplash.com/350x350/?african-food",
  },
  {
    title: "Cakes & Pastries",
    desc: "Soft, sweet, and baked to perfection — celebrate every moment deliciously.",
    color: "#000000",
    img: "https://source.unsplash.com/350x350/?cake",
  },
  {
    title: "Catering Service",
    desc: "Let us handle your events — from small gatherings to grand celebrations.",
    color: "#ac0121",
    img: "https://source.unsplash.com/350x350/?catering",
  },
  {
    title: "Home Delivery",
    desc: "Enjoy convenience at your doorstep — fresh food delivered with care.",
    color: "#000000",
    img: "https://source.unsplash.com/350x350/?delivery",
  },
];

const ServiceCards = () => {
  const cardRefs = useRef([]);
  const imgRefs = useRef([]);

  useEffect(() => {
    cardRefs.current.forEach((card, i) => {
      const img = imgRefs.current[i];
      gsap.set(img, { y: "100%", opacity: 0 });

      const enter = () => {
        gsap.to(card, {
          backgroundColor: cards[i].color,
          color: "#fff",
          duration: 0.4,
          ease: "power2.out",
        });
        gsap.to(img, {
          y: "0%",
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
        });
      };

      const leave = () => {
        gsap.to(card, {
          backgroundColor: "#f9f9f9",
          color: "#111",
          duration: 0.4,
          ease: "power2.inOut",
        });
        gsap.to(img, {
          y: "100%",
          opacity: 0,
          duration: 0.7,
          ease: "power3.inOut",
        });
      };

      card.addEventListener("mouseenter", enter);
      card.addEventListener("mouseleave", leave);
    });
  }, []);

  return (
    <section className="py-24 bg-white flex justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
        {cards.map((card, i) => (
          <div
            key={i}
            ref={(el) => (cardRefs.current[i] = el)}
            className="relative w-full max-w-[500px] min-h-[380px] bg-[#f9f9f9] rounded-3xl overflow-hidden shadow-sm cursor-pointer p-8 flex flex-col justify-between transition-all duration-500"
          >
            {/* Text section at the top */}
            <div className="z-10">
              <h3 className="text-2xl font-medium mb-2">{card.title}</h3>
              <p className="text-sm opacity-80 leading-relaxed">{card.desc}</p>
            </div>

            {/* Image appears below text */}
            <div className="flex justify-center mt-6">
              <img
                ref={(el) => (imgRefs.current[i] = el)}
                src={card.img}
                alt={card.title}
                className="rounded-xl w-[350px] h-[350px] object-cover opacity-0"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServiceCards;
