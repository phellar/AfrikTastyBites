import React from "react";
import CTAImage from "../assets/kelly.jpeg"; // replace with your asset

const ModernCTA = () => {
  return (
    <section className="py-16 px-6 md:px-12 lg:px-24 bg-white">
      <div className="max-w-6xl mx-auto relative rounded-3xl overflow-hidden flex flex-col md:flex-row items-center p-8 gap-8 bg-[#ac0121] shadow-xl">
        
        {/* LEFT: Content */}
        <div className="md:w-1/2 text-left">
          <h2 className="text-3xl md:text-4xl font-semibold mb-3 text-white">
            Crave the True Taste of Africa
          </h2>
          <p className="text-base md:text-lg text-white mb-6 leading-relaxed">
            From jollof rice to pastries and small chops, indulge in authentic Nigerian flavors, freshly crafted and ready to delight your taste buds in Canada.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/order"
              className="bg-white text-[#ac0121] hover:bg-gray-100 transition px-6 py-2 rounded-full font-medium text-base shadow-md"
            >
              Order Now
            </a>
            <a
              href="/menu"
              className="border border-white hover:bg-white/20 transition px-6 py-2 rounded-full font-medium text-base text-white"
            >
              Explore Menu
            </a>
          </div>
        </div>

        {/* RIGHT: Image */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src={CTAImage}
            alt="Delicious African food"
            className="rounded-2xl object-cover w-full max-w-md shadow-lg"
          />
        </div>

        {/* Optional subtle accent shapes */}
        <div className="absolute -bottom-16 -right-16 w-60 h-60 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -top-16 -left-16 w-60 h-60 bg-white/10 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
};

export default ModernCTA;
