import React from "react";

const ModernCTA = () => {
  return (
    <section className="bg-white py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto">
        {/* CTA Card */}
        <div className="relative bg-gradient-to-r from-[#ac0121] to-[#e02e3c] text-white rounded-3xl shadow-xl py-14 px-8 md:px-16 overflow-hidden">
          {/* Glow Accent */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-30"></div>

          <div className="relative z-10 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Taste the Authentic Flavour of Africa
            </h2>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-10">
              From spicy jollof to freshly baked pastries — order your favorite African dishes and experience
              tradition redefined in Canada.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <button className="bg-white text-[#ac0121] hover:bg-gray-100 transition px-8 py-3 rounded-full text-lg font-semibold shadow">
                Order Now
              </button>
              <button className="border border-white hover:bg-white/10 transition px-8 py-3 rounded-full text-lg font-semibold">
                Learn More
              </button>
            </div>
          </div>

          {/* Accent Circle for Modern Feel */}
          <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-white/10 rounded-full blur-2xl"></div>
        </div>
      </div>
    </section>
  );
};

export default ModernCTA;
