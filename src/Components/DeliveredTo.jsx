import React from "react";

// Replace with local or online flag URLs
const provinces = [
  { name: "Ontario", flag: "https://upload.wikimedia.org/wikipedia/commons/8/88/Flag_of_Ontario.svg" },
  { name: "Quebec", flag: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Flag_of_Quebec.svg" },
  { name: "British Columbia", flag: "https://upload.wikimedia.org/wikipedia/commons/b/b8/Flag_of_British_Columbia.svg" },
  { name: "Alberta", flag: "https://upload.wikimedia.org/wikipedia/commons/f/f5/Flag_of_Alberta.svg" },
  { name: "Manitoba", flag: "https://upload.wikimedia.org/wikipedia/commons/c/c4/Flag_of_Manitoba.svg" },
  { name: "Saskatchewan", flag: "https://upload.wikimedia.org/wikipedia/commons/b/bb/Flag_of_Saskatchewan.svg" },
  { name: "Nova Scotia", flag: "https://upload.wikimedia.org/wikipedia/commons/c/cf/Flag_of_Nova_Scotia.svg" },
  { name: "New Brunswick", flag: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Flag_of_New_Brunswick.svg" },
  { name: "Prince Edward Island", flag: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Flag_of_Prince_Edward_Island.svg" },
  { name: "Newfoundland and Labrador", flag: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Flag_of_Newfoundland_and_Labrador.svg" },
  { name: "Northwest Territories", flag: "https://upload.wikimedia.org/wikipedia/commons/c/cf/Flag_of_the_Northwest_Territories.svg" },
  { name: "Yukon", flag: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Flag_of_Yukon.svg" },
  { name: "Nunavut", flag: "https://upload.wikimedia.org/wikipedia/commons/9/9c/Flag_of_Nunavut.svg" },
];

const DeliverToSection = () => {
  return (
    <section className="py-20 bg-black flex justify-center">
      <div className="max-w-6xl w-full px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-semibold mb-12 text-white">
        We deliver to anywhere in <span className="text-[#ac0121]">Canada</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-4">
          {provinces.map((province, i) => (
            <div
              key={i}
              className="flex items-center gap-3 bg-white rounded-lg px-4 py-2 shadow-md hover:scale-105 transition-transform duration-300"
            >
              <img
                src={province.flag}
                alt={`${province.name} flag`}
                className="w-8 h-8 object-contain rounded-sm"
              />
              <span className="text-black font-medium">{province.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DeliverToSection;
