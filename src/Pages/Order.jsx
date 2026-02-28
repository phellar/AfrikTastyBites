import React, { useEffect, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { FiHash, FiUser, FiShoppingBag, FiCheckCircle } from "react-icons/fi";
import gsap from "gsap";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const brandRed = "#ac0121";

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(import.meta.env.VITE_BACKEND_END_API_URL + "/orders", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("adminToken")
          }
        });

        if (!res.ok) throw new Error("Failed to fetch orders");

        const data = await res.json();
        setOrders(data.data || []);
      } catch (err) {
        console.error(err);
        setError(err.message);
        setOrders([]);
      } finally {
        setLoading(false);
        // Staggered entrance for rows
        gsap.fromTo(".order-row", 
          { opacity: 0, y: 15 }, 
          { opacity: 1, y: 0, stagger: 0.06, duration: 0.6, ease: "power2.out" }
        );
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-[#0f1115] text-gray-100 p-6 md:p-12 font-sans">
      
      {/* Editorial Header */}
      <header className="mb-14 flex justify-between items-end border-b border-white/5 pb-10">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#ac0121] mb-3 block">
            Transaction Logs
          </p>
          <h1 className="text-4xl font-bold tracking-tighter text-white uppercase">
            Customer <span className="text-gray-500 italic font-medium">Orders</span>
          </h1>
        </div>
        <div className="hidden md:block text-right">
          <div className="bg-white/5 px-4 py-2 rounded-2xl border border-white/5">
             <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Active Queue</p>
             <p className="text-sm font-bold text-white">{orders.length} Total</p>
          </div>
        </div>
      </header>

      {/* Error State */}
      {error && (
        <div className="mb-8 p-4 bg-red-950/20 border border-red-500/30 text-red-400 rounded-2xl text-[10px] font-black uppercase tracking-widest">
          {error}
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="w-10 h-10 border-4 border-[#ac0121] border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-24 bg-[#181c23] rounded-[3rem] border border-white/5">
          <FiShoppingBag className="mx-auto text-gray-800 mb-4" size={48} />
          <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">No orders processed yet</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-y-3">
            <thead>
              <tr className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-500">
                <th className="px-8 pb-4 font-black">Ref ID</th>
                <th className="px-8 pb-4 font-black">Customer</th>
                <th className="px-8 pb-4 font-black">Total (CAD)</th>
                <th className="px-8 pb-4 font-black">Status</th>
                <th className="px-8 pb-4 text-center font-black">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="order-row group cursor-pointer">
                  {/* Order Ref */}
                  <td className="bg-[#181c23] border-y border-l border-white/5 rounded-l-[2rem] px-8 py-6 transition-all group-hover:bg-[#1c2129]">
                    <div className="flex items-center gap-3">
                      <FiHash className="text-[#ac0121]" />
                      <span className="font-bold text-white tracking-tighter">{order.Ref}</span>
                    </div>
                  </td>

                  {/* Customer */}
                  <td className="bg-[#181c23] border-y border-white/5 px-8 py-6 group-hover:bg-[#1c2129] transition-all">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-[10px] font-bold border border-white/5">
                        {order.customer_name?.charAt(0)}
                      </div>
                      <span className="text-sm font-bold text-gray-300 tracking-tight">{order.customer_name}</span>
                    </div>
                  </td>

                  {/* Total */}
                  <td className="bg-[#181c23] border-y border-white/5 px-8 py-6 group-hover:bg-[#1c2129] transition-all">
                    <span className="text-sm font-black text-white italic uppercase">CA${parseFloat(order.total).toLocaleString()}</span>
                  </td>

                  {/* Status Pill */}
                  <td className="bg-[#181c23] border-y border-white/5 px-8 py-6 group-hover:bg-[#1c2129] transition-all">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
                       <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                       <span className="text-[9px] font-black uppercase tracking-widest text-green-500">Completed</span>
                    </div>
                  </td>

                  {/* Action */}
                  <td className="bg-[#181c23] border-y border-r border-white/5 rounded-r-[2rem] px-8 py-6 text-center group-hover:bg-[#1c2129] transition-all">
                    <button className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#ac0121] hover:text-white transition-colors duration-300">
                      <AiOutlineEye size={18} />
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;