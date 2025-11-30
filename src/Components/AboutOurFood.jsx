import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AfricanDishes from "../assets/ewa.jpeg";
import Cake from "../assets/cake-1.jpeg";
import Chops from "../assets/full-chops.jpeg";
import CateringService from "../assets/jollof-pack.jpeg";
// import HomeDelivery from "../assets/home-delivery.jpg";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "African Dishes",
    desc: "Savor the rich flavors of Nigeria traditional dishes made fresh, just like home.",
    img: AfricanDishes,
  },
  {
    title: "Cakes",
    desc: "Delight in every bite — our cakes are baked to perfection for every celebration.",
    img: Cake,
  },
  {
    title: "Small Chops",
    desc: "Perfectly crafted bite-sized snacks, ideal for parties or a quick treat.",
    img: Chops,
  },
  {
    title: "Catering Service",
    desc: "From intimate gatherings to grand events, we bring authentic cuisine to your table.",
    img: CateringService,
  },
];


const ServiceCards = () => {
  const cardRefs = useRef([]);
  const imgRefs = useRef([]);

  useEffect(() => {
    cardRefs.current.forEach((card, i) => {
      const img = imgRefs.current[i];

      // Animate card text and container
      gsap.fromTo(
        card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          delay: i * 0.15,
        }
      );

      // Animate image sliding from left/right
      gsap.fromTo(
        img,
        { x: i % 2 === 0 ? -100 : 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          delay: i * 0.15 + 0.2,
        }
      );
    });
  }, []);

  return (
    <section className="py-24 bg-white flex flex-col items-center px-6 md:px-12">
      {/* Heading */}
      <div className="text-center mb-16 max-w-3xl">
        <h2 className="text-4xl md:text-5xl font-semibold text-gray-900">
          Our <span className="text-[#ac0121]">Services</span>
        </h2>
        <p className="text-gray-600 mt-4 text-lg leading-relaxed">
          Discover what we do best, from delicious African meals to full event
          catering and fast home delivery. Each service is designed to give you
          the best experience with care and style.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl w-full">
        {services.map((service, i) => (
          <div
            key={i}
            ref={(el) => (cardRefs.current[i] = el)}
            className="relative overflow-hidden rounded-3xl shadow-lg cursor-pointer p-8 flex flex-col justify-end h-96 bg-white/30 backdrop-blur-md border border-white/20 transform transition hover:scale-105 hover:shadow-2xl duration-300"
          >
            {/* Background Image */}
            <img
              ref={(el) => (imgRefs.current[i] = el)}
              src={service.img}
              alt={service.title}
              className="absolute inset-0 w-full h-full object-cover rounded-3xl z-0"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-3xl z-10"></div>

            {/* Text content */}
            <div className="relative z-20 text-white">
              <h3 className="text-3xl font-semibold mb-2">{service.title}</h3>
              <p className="text-base opacity-90 leading-relaxed">{service.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServiceCards;
