import React, { useState } from "react";

const GallerySection = () => {
  const [activeTab, setActiveTab] = useState("food");
  const [showAll, setShowAll] = useState(false);

  const brandColor = "#ac0121";

  const gallery = {
    food: [
      "https://images.unsplash.com/photo-1606851094462-0b9a64e64f2a",
      "https://images.unsplash.com/photo-1625944229603-8b1e8a26d90e",
      "https://images.unsplash.com/photo-1551218808-94e220e084d2",
      "https://images.unsplash.com/photo-1633437269679-b1f7d4b25a1a",
      "https://images.unsplash.com/photo-1553163147-622ab57be1c7",
      "https://images.unsplash.com/photo-1617196034796-73d1dc38353d",
      "https://images.unsplash.com/photo-1525755662778-989d0524087e",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587",
      "https://images.unsplash.com/photo-1625938145277-4ecbdf4e90a3",
      "https://images.unsplash.com/photo-1633437269679-b1f7d4b25a1a",
      "https://images.unsplash.com/photo-1525755662778-989d0524087e",
    ],
    cake: [
      "https://images.unsplash.com/photo-1606312619070-df3a8c9923d4",
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587",
      "https://images.unsplash.com/photo-1599785209707-28f0efdc88ce",
      "https://images.unsplash.com/photo-1621996346565-6f7d1df08c1b",
      "https://images.unsplash.com/photo-1601972599720-84f423a57d72",
      "https://images.unsplash.com/photo-1559622214-f8c3e6b7f52d",
      "https://images.unsplash.com/photo-1551024601-bec78aea704b",
      "https://images.unsplash.com/photo-1586190848861-99aa4a171e90",
      "https://images.unsplash.com/photo-1606312619070-df3a8c9923d4",
      "https://images.unsplash.com/photo-1601972599720-84f423a57d72",
      "https://images.unsplash.com/photo-1621996346565-6f7d1df08c1b",
    ],
    pastry: [
      "https://images.unsplash.com/photo-1588195537643-2f950c417cb0",
      "https://images.unsplash.com/photo-1509440159596-0249088772ff",
      "https://images.unsplash.com/photo-1588600878108-578307a3cc9b",
      "https://images.unsplash.com/photo-1551218808-94e220e084d2",
      "https://images.unsplash.com/photo-1625938145277-4ecbdf4e90a3",
      "https://images.unsplash.com/photo-1600101591730-19ce10c63f17",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
      "https://images.unsplash.com/photo-1617196034796-73d1dc38353d",
      "https://images.unsplash.com/photo-1590080875838-6614d478504b",
      "https://images.unsplash.com/photo-1621996346565-6f7d1df08c1b",
      "https://images.unsplash.com/photo-1600101591730-19ce10c63f17",
    ],
  };

  const images = gallery[activeTab];
  const visibleImages = showAll ? images : images.slice(0, 10);

  return (
    <section className="bg-black text-white py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-10">
          Our Delicious Gallery
        </h2>

        {/* Tabs */}
        <div className="flex justify-center space-x-4 mb-10 flex-wrap">
          {["food", "cake", "pastry"].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setShowAll(false);
              }}
              className={`px-6 py-2 rounded-full font-medium transition border ${
                activeTab === tab
                  ? "text-black"
                  : "text-white border-gray-700 hover:bg-gray-800"
              }`}
              style={
                activeTab === tab
                  ? { backgroundColor: brandColor, borderColor: brandColor }
                  : {}
              }
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Masonry-style Gallery */}
        <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-4 space-y-4 mb-10">
          {visibleImages.map((img, index) => (
            <div key={index} className="overflow-hidden rounded-lg break-inside-avoid">
              <img
                src={img + "?auto=format&fit=crop&w=800&q=80"}
                alt={`${activeTab}-${index}`}
                className="w-full mb-4 rounded-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
              />
            </div>
          ))}
        </div>

        {/* Show More Button */}
        {images.length > 10 && (
          <button
            onClick={() => setShowAll(!showAll)}
            style={{ backgroundColor: brandColor }}
            className="px-8 py-2 text-white font-semibold rounded-full hover:opacity-90 transition"
          >
            {showAll ? "Show Less" : "Show More"}
          </button>
        )}
      </div>
    </section>
  );
};

export default GallerySection;
