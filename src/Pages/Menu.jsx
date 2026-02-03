import React, { useState } from "react";
import { FiShoppingBag, FiPlus, FiArrowRight, FiStar } from "react-icons/fi";

const MENU_CATEGORIES = ["Signature", "Small Chops", "Large Plates", "Sides", "Drinks"];

const MENU_ITEMS = {
  Signature: [
    { id: 1, name: "Smokey Jollof Risotto", price: 24, calories: "450 kcal", desc: "Infused with scotch bonnet oil and topped with gold-leaf garnished plantain.", image: "https://images.unsplash.com/photo-1567070508765-ff0ad5801e8a?q=80&w=500" },
    { id: 2, name: "Braised Oxtail Pappardelle", price: 32, calories: "720 kcal", desc: "Slow-rendered for 14 hours in a rich Guinness and hibiscus reduction.", image: "https://images.unsplash.com/photo-1534939561126-855b8675edd7?q=80&w=500" },
  ],
  "Small Chops": [
    { id: 3, name: "Suya Wagyu Sliders", price: 18, calories: "320 kcal", desc: "Yaji-spiced wagyu beef, caramelised onions, and micro-greens.", image: "https://images.unsplash.com/photo-1550507992-eb63ffee0847?q=80&w=500" },
  ],
};

const AfrikTastyBiteMenu = () => {
  const [activeTab, setActiveTab] = useState("Signature");
  const [hoveredItem, setHoveredItem] = useState(null);

  return (
    <div className="min-h-screen bg-[#faf9f6] text-[#1a1a1a] selection:bg-[#ac0121] selection:text-white">
      {/* --- MODERN NAV --- */}
      <nav className="flex justify-between items-center px-8 py-6 sticky top-0 bg-white/80 backdrop-blur-xl z-50 border-b border-gray-100">
        <div className="text-2xl font-black tracking-tighter uppercase">
          Afrik<span className="text-[#ac0121]">Tasty</span>Bite
        </div>
        <div className="hidden md:flex space-x-8 font-bold text-xs uppercase tracking-widest text-gray-500">
          <button className="hover:text-[#ac0121] transition-colors">Our Story</button>
          <button className="text-[#ac0121]">Menu</button>
          <button className="hover:text-[#ac0121] transition-colors">Reservations</button>
        </div>
        <button className="relative p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-all">
          <FiShoppingBag size={20} />
          <span className="absolute -top-1 -right-1 bg-[#ac0121] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">2</span>
        </button>
      </nav>

      {/* --- HERO SECTION --- */}
      <header className="relative h-[40vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none flex justify-center items-center">
            <h1 className="text-[20rem] font-black uppercase tracking-tighter">Taste</h1>
        </div>
        <h2 className="text-5xl md:text-7xl font-black text-gray-900 mb-4 tracking-tight">
            Curated <span className="text-[#ac0121]">Flavors</span>
        </h2>
        <p className="text-gray-500 font-medium max-w-lg mx-auto italic">
            Where heritage meets contemporary culinary artistry.
        </p>
      </header>

      {/* --- INTERACTIVE CATEGORIES --- */}
      <div className="flex justify-center items-center space-x-2 md:space-x-4 mb-12 px-4 overflow-x-auto no-scrollbar">
        {MENU_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-500 ${
              activeTab === cat 
              ? "bg-[#ac0121] text-white shadow-lg shadow-red-200 scale-105" 
              : "bg-white text-gray-400 hover:bg-gray-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* --- MAIN MENU GRID --- */}
      <main className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {(MENU_ITEMS[activeTab] || []).map((item) => (
            <div 
              key={item.id}
              className="relative group bg-white rounded-[2rem] p-4 border border-gray-100 hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 ease-out flex flex-col"
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {/* Image Container */}
              <div className="relative h-64 w-full overflow-hidden rounded-[1.5rem] mb-6">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className={`w-full h-full object-cover transition-transform duration-700 ease-in-out ${hoveredItem === item.id ? 'scale-110' : 'scale-100'}`}
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                    <FiStar className="text-yellow-500 fill-yellow-500" size={12} />
                    <span className="text-[10px] font-black">POPULAR</span>
                </div>
              </div>

              {/* Content */}
              <div className="px-2 flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-2xl font-black text-gray-900 leading-tight tracking-tight">
                        {item.name}
                    </h3>
                    <span className="text-[#ac0121] font-black text-xl">${item.price}</span>
                </div>
                <p className="text-gray-400 text-xs font-bold uppercase mb-4 tracking-tighter">{item.calories}</p>
                <p className="text-gray-500 text-sm leading-relaxed mb-8 line-clamp-2 italic font-medium">
                    {item.desc}
                </p>
              </div>

              {/* Action Button */}
              <button className="w-full bg-gray-900 group-hover:bg-[#ac0121] text-white py-4 rounded-2xl flex items-center justify-center gap-2 font-black uppercase text-xs tracking-[0.2em] transition-all duration-300 active:scale-95 shadow-lg">
                <FiPlus size={18} /> Add to Selection
              </button>
            </div>
          ))}

          {/* Empty State / Coming Soon */}
          {(!MENU_ITEMS[activeTab]) && (
            <div className="col-span-full py-20 text-center border-2 border-dashed border-gray-200 rounded-[3rem]">
                <p className="text-gray-400 font-bold italic">Seasonal dishes arriving soon...</p>
            </div>
          )}
        </div>
      </main>

      {/* --- CLASSIC FOOTER CTA --- */}
      <section className="bg-white border-t border-gray-100 py-20 px-6 text-center">
         <h4 className="text-sm font-black text-[#ac0121] uppercase tracking-[0.3em] mb-4">The Experience</h4>
         <p className="text-3xl md:text-5xl font-black text-gray-900 max-w-3xl mx-auto leading-tight mb-10">
            Ready for a taste that lingers?
         </p>
         <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <button className="px-10 py-5 bg-[#ac0121] text-white rounded-full font-black uppercase text-xs tracking-widest flex items-center gap-3 hover:shadow-xl hover:shadow-red-200 transition-all">
                Book a Table <FiArrowRight />
            </button>
            <button className="px-10 py-5 bg-white border border-gray-200 text-gray-900 rounded-full font-black uppercase text-xs tracking-widest hover:bg-gray-50 transition-all">
                View Full Wine List
            </button>
         </div>
      </section>
    </div>
  );
};

export default AfrikTastyBiteMenu;