import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiLock, FiMail, FiArrowRight, FiEye, FiEyeOff } from "react-icons/fi";
import Logo from "../assets/Logo.png";
import JollofPack from "../assets/full-chops.jpeg";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
    <div className="min-h-screen flex bg-gray-50/50 font-sans text-gray-900">
      
      {/* LEFT SIDE: Modern Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 md:p-16 bg-white">
        <div className="w-full max-w-md">
          <div className="mb-10">
            <img src={Logo} alt="AfrikTastyBites Logo" className="w-14 h-14 object-contain mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">
              Welcome back
            </h2>
            <p className="text-gray-500 text-sm">
              Sign in to access the AfrikTastyBites admin portal.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 text-[#ac0121] text-sm font-medium flex items-center gap-2">
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email address
              </label>
              <div className="relative">
                <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:border-[#ac0121] focus:ring-4 focus:ring-[#ac0121]/10 transition-all outline-none"
                  placeholder="admin@afriktastybites.com"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
              </div>
              <div className="relative">
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-11 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:border-[#ac0121] focus:ring-4 focus:ring-[#ac0121]/10 transition-all outline-none"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 mt-2 rounded-xl bg-[#ac0121] hover:bg-[#8f011b] active:scale-[0.99] text-white text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#ac0121]/20 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                "Signing in..."
              ) : (
                <>
                  Sign in to dashboard <FiArrowRight size={18} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* RIGHT SIDE: Food Background with Modern Gradient Overlay */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-gray-900">
        <img 
          src={JollofPack}
          alt="AfrikTastyBites Jollof Pack" 
          className="absolute inset-0 w-full h-full object-cover scale-105" 
        />
        {/* Smooth Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/30 backdrop-blur-[1px]"></div>
        
        {/* Brand Content */}
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center p-12">
          <div className="max-w-md flex flex-col items-center">
            <h1 className="text-white text-4xl xl:text-5xl font-semibold tracking-tight leading-tight mb-4">
              AfrikTasty<span className="text-[#ac0121]">Bites</span>
            </h1>
            <div className="w-12 h-1 rounded-full bg-[#ac0121] mb-5"></div>
            <p className="text-gray-200 text-base font-normal leading-relaxed">
              Manage orders, update your menu, and track daily kitchen operations in one place.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AdminLogin;
