// FeaturedProducts.jsx
import React, { useEffect, useRef } from "react";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const products = [
  { id: 1, name: "Red Velvet Cake", price: "$22.99", image: "https://images.unsplash.com/photo-1605475128026-9f6e0ab63aa1?auto=format&fit=crop&w=800&q=60" },
  { id: 2, name: "Strawberry Delight", price: "$18.50", image: "https://images.unsplash.com/photo-1605478043618-38b8eb35ad96?auto=format&fit=crop&w=800&q=60" },
  { id: 3, name: "Chocolate Fudge", price: "$25.00", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=60" },
  { id: 4, name: "Vanilla Slice", price: "$17.99", image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=60" },
  { id: 5, name: "Cheese Cupcake", price: "$19.99", image: "https://images.unsplash.com/photo-1599785209707-28b3f5fa8861?auto=format&fit=crop&w=800&q=60" },
  { id: 6, name: "Fruit Tart", price: "$23.49", image: "https://images.unsplash.com/photo-1606813902911-d4b30b52c823?auto=format&fit=crop&w=800&q=60" },
];

const FeaturedProducts = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    cardsRef.current.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          delay: i * 0.1,
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-semibold text-gray-900 mb-10">
          Featured <span className="text-[#ac0121]">Products</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition rounded-2xl overflow-hidden"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-56 object-cover"
              />
              <div className="p-5 text-left">
                <h3 className="text-lg font-medium text-gray-800">
                  {product.name}
                </h3>
                <p className="text-gray-500 mt-1">{product.price}</p>
                <div className="flex items-center justify-between mt-4">
                  <button className="text-[#ac0121] border border-[#ac0121] px-3 py-1.5 rounded-lg text-sm hover:bg-[#ac0121] hover:text-white transition">
                    Add to Cart
                  </button>
                  <div className="flex space-x-3 text-gray-600">
                    <FiHeart size={18} className="cursor-pointer hover:text-[#ac0121]" />
                    <FiShoppingCart size={18} className="cursor-pointer hover:text-[#ac0121]" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
