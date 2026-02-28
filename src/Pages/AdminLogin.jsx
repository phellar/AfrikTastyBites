import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiLock, FiMail, FiArrowRight } from "react-icons/fi";
import Logo from "../assets/Logo.png";
import JollofPack from "../assets/full-chops.jpeg";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const brandColor = "#ac0121";

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_END_API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Invalid credentials");

      localStorage.setItem("adminToken", data.token);
      navigate("/admin-dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white font-sans">
      
      {/* LEFT SIDE: Clean Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <img src={Logo} alt="Logo" className="w-16 mb-6" />
            <h2 className="text-3xl font-black text-gray-900 tracking-tight mb-2">Admin Login</h2>
            <p className="text-gray-400 text-xs font-medium uppercase tracking-[0.2em]">Secure Access Portal</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-[#ac0121] text-[#ac0121] text-xs font-bold uppercase tracking-wider">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Email Address</label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:border-[#ac0121] transition-all outline-none text-sm font-medium"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Password</label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:border-[#ac0121] transition-all outline-none text-sm font-medium"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{ backgroundColor: brandColor }}
              className="w-full py-5 rounded-2xl text-white text-[11px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:opacity-90 transition-all shadow-xl shadow-red-200/40 disabled:opacity-50"
            >
              {loading ? "Authenticating..." : (
                <>
                  Enter Dashboard <FiArrowRight size={18} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* RIGHT SIDE: Food Background with Dark Overlay */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-gray-900">
        <img 
          src={JollofPack}
          alt="Food" 
          className="absolute inset-0 w-full h-full object-cover" 
        />
        {/* Darkened Overlay */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
        
        {/* Content over the food background */}
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center p-12">
            <h1 className="text-white text-5xl font-black uppercase tracking-tighter leading-none mb-4">
              AfrikTasty<span className="text-[#ac0121]">Bites</span>
            </h1>
            <div className="w-12 h-[2px] bg-[#ac0121] mb-6"></div>
            <p className="text-gray-300 text-sm font-medium tracking-wide max-w-xs">
             Management systems for AfrikTastyBites.
            </p>
        </div>
      </div>

    </div>
  );
};

export default AdminLogin;