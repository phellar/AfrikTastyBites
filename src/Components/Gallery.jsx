import React, { useState, useEffect } from "react";
import gsap from "gsap";
import { FiArrowUpRight } from "react-icons/fi";

const productData = {
  food: [
    { title: "Jollof Rice", img: "/assets/jollof.jpg" },
    { title: "Ewa Agoyin", img: "/assets/ewa.jpg" },
    { title: "Fried Plantain", img: "/assets/dodo.jpg" },
    { title: "Beef Suya", img: "/assets/suya.jpg" },
  ],
  cake: [
    { title: "Wedding Tiers", img: "/assets/wedding.jpg" },
    { title: "Vanilla Bean", img: "/assets/vanilla.jpg" },
    { title: "Chocolate Ganache", img: "/assets/chocolate.jpg" },
    { title: "Red Velvet", img: "/assets/velvet.jpg" },
  ],
  pastry: [
    { title: "Meat Pie", img: "/assets/meatpie.jpg" },
    { title: "Sausage Roll", img: "/assets/sausage.jpg" },
    { title: "Scotch Egg", img: "/assets/scotchegg.jpg" },
    { title: "Chicken Pie", img: "/assets/chickenpie.jpg" },
  ],
};

const GallerySection = () => {
  const [activeTab, setActiveTab] = useState("food");

  useEffect(() => {
    gsap.fromTo(
      ".gallery-card",
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "sine.out" }
    );
  }, [activeTab]);

  return (
    <section className="bg-white py-20 px-6 md:px-12 border-t border-gray-100">
      <div className="max-w-6xl mx-auto">
        
        {/* Minimalist Heading */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-light tracking-tight text-gray-900">
            Snapshot of our <span className="font-serif italic text-gray-400">products</span>
          </h2>
          <div className="h-[1px] w-12 bg-[#ac0121] mt-4"></div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-12 mb-12 border-b border-gray-50">
          {Object.keys(productData).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-[10px] font-bold uppercase tracking-[0.3em] transition-all relative ${
                activeTab === tab ? "text-gray-900" : "text-gray-300 hover:text-gray-500"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 w-full h-[1.5px] bg-gray-900" />
              )}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-100 border border-gray-100">
          {productData[activeTab].map((product, index) => (
            <div 
              key={index} 
              className="gallery-card group bg-white p-4 transition-all duration-500 hover:bg-[#fafafa]"
            >
              <div className="aspect-[3/4] overflow-hidden bg-gray-50 mb-4">
                <img
                  src={product.img}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              
              <div className="flex justify-between items-start pt-2">
                <div>
                  <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-1">
                    0{index + 1}
                  </p>
                  <h3 className="text-[11px] font-black uppercase tracking-wider text-gray-800">
                    {product.title}
                  </h3>
                </div>
                <FiArrowUpRight className="text-gray-300 group-hover:text-[#ac0121] transition-colors" size={16} />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default GallerySection;