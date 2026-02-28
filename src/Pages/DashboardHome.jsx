import React, { useEffect, useState } from "react";
import {
  FiShoppingBag,
  FiTrendingUp,
  FiUsers,
  FiArrowUpRight,
  FiBox,
} from "react-icons/fi";
import gsap from "gsap";

const DashboardHome = () => {
  // State for real data
  const [statsData, setStatsData] = useState({
    totalOrders: 0,
    totalEarnings: 0,
    totalProducts: 0,
  });
  const [recentProducts, setRecentProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const brandRed = "#ac0121";

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const headers = { Authorization: `Bearer ${token}` };

        // Fetch stats and products from your backend
        const res = await fetch(`${import.meta.env.VITE_BACKEND_END_API_URL}/dashboard-stats`, { headers });
        const data = await res.json();

        if (res.ok) {
          setStatsData({
            totalOrders: data.totalOrders || 0,
            totalEarnings: data.totalEarnings || 0,
            totalProducts: data.totalProducts || 0,
          });
          setRecentProducts(data.recentProducts || []);
        }
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
        // Trigger animations after data is set
        gsap.fromTo(
          ".fade-in",
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.08, ease: "power3.out" }
        );
      }
    };

    fetchDashboardData();
  }, []);

  const stats = [
    { 
        title: "Total Revenue", 
        value: `CA$${statsData.totalEarnings.toLocaleString()}`, 
        icon: <FiTrendingUp /> 
    },
    { 
        title: "Total Orders", 
        value: statsData.totalOrders, 
        icon: <FiShoppingBag /> 
    },
    { 
        title: "Total Products", 
        value: statsData.totalProducts, 
        icon: <FiBox /> 
    },
  ];

  if (loading) return (
    <div className="min-h-screen bg-[#0f1115] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#ac0121] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0f1115] text-gray-100 p-6 md:p-12 font-sans">
      
      {/* Header */}
      <header className="fade-in mb-14 flex justify-between items-end border-b border-white/5 pb-10">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#ac0121] mb-3">
            Admin System
          </p>
          <h1 className="text-4xl font-bold tracking-tighter text-white">
            Dashboard <span className="text-gray-500 italic font-medium">Overview</span>
          </h1>
        </div>
        <div className="hidden md:block text-right">
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">
            Region / Canada
          </p>
          <div className="flex items-center gap-2 justify-end">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-xs font-bold">Systems Live</span>
          </div>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-16">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="fade-in bg-[#181c23] rounded-[2.5rem] p-8 border border-white/5 hover:border-[#ac0121]/40 transition-all duration-500 group"
          >
            <div className="flex justify-between items-center mb-10">
              <div className="text-[#ac0121] bg-[#ac0121]/10 p-3 rounded-2xl group-hover:bg-[#ac0121] group-hover:text-white transition-all duration-300 text-xl">
                {stat.icon}
              </div>
              <FiArrowUpRight className="text-gray-700 group-hover:text-[#ac0121] transition-colors" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-2">
              {stat.title}
            </p>
            <h2 className="text-4xl font-bold tracking-tighter text-white uppercase italic">
              {stat.value}
            </h2>
          </div>
        ))}
      </div>

      {/* Product List Section */}
      <section className="fade-in max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-gray-500">
            Inventory Collection
          </h2>
          <button className="text-[10px] font-black uppercase tracking-widest text-[#ac0121] hover:text-white transition-colors underline underline-offset-8">
            Manage All
          </button>
        </div>

        <div className="grid gap-4">
          {recentProducts.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between bg-[#14171d] p-5 rounded-[2rem] border border-white/5 hover:border-white/10 hover:bg-[#181c23] transition-all duration-300 group"
            >
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl overflow-hidden bg-black border border-white/5">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition duration-700"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-white tracking-tight">
                    {product.name}
                  </h3>
                  <p className="text-[10px] text-[#ac0121] font-black uppercase tracking-widest mt-1">
                    {product.category}
                  </p>
                </div>
              </div>

              <div className="text-right pr-4">
                <p className="font-bold text-lg text-white tracking-tighter">
                  CA${parseFloat(product.price).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default DashboardHome;