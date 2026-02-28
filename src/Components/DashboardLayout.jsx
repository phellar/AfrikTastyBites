import React, { useState, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { 
  AiOutlineHome, 
  AiOutlineShoppingCart, 
  AiOutlineDollar, 
  AiOutlineUser, 
  AiOutlineLogout, 
  AiOutlineMenu
} from "react-icons/ai";
import { LuPackage, LuReceipt } from "react-icons/lu";
import { FiMoon, FiSun, FiX } from "react-icons/fi";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true); 
  const navigate = useNavigate();

  // Updated paths to be relative to /admin-dashboard
  const sidebarItems = [
    { name: "Home", icon: <AiOutlineHome size={18} />, path: "" }, // "" means the index
    { name: "Orders", icon: <AiOutlineShoppingCart size={18} />, path: "orders" },
    { name: "Products", icon: <LuPackage size={18} />, path: "admin-products" },
    { name: "Earnings", icon: <AiOutlineDollar size={18} />, path: "earnings" },
    { name: "Transactions", icon: <LuReceipt size={18} />, path: "transactions" },
    { name: "Profile", icon: <AiOutlineUser size={18} />, path: "profile" },
  ];

  useEffect(() => {
    const theme = localStorage.getItem("theme") || "dark";
    if (theme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(prev => {
      const newMode = !prev;
      document.documentElement.classList.toggle("dark", newMode);
      localStorage.setItem("theme", newMode ? "dark" : "light");
      return newMode;
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin-login");
  };

  return (
    <div className="flex h-screen bg-[#fafaf9] dark:bg-[#0f1115] text-gray-900 dark:text-gray-100 font-sans transition-colors duration-500 overflow-hidden">

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - PERSISTENT */}
      <aside className={`fixed top-0 left-0 h-full bg-white dark:bg-[#14171d] border-r border-gray-200 dark:border-white/5 shadow-2xl flex flex-col z-50 transform lg:translate-x-0 transition-all duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0 w-72" : "-translate-x-full w-72 lg:w-64"}`}>

        <div className="p-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#ac0121] rounded-xl flex items-center justify-center shadow-lg shadow-[#ac0121]/20">
               <img src="/afrik-logo.png" alt="Logo" className="w-7 h-7 object-contain" />
            </div>
            <div>
              <span className="text-sm font-black tracking-[0.2em] uppercase block">AfrikTasty</span>
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Admin Portal</span>
            </div>
          </div>
          <button className="lg:hidden text-gray-400" onClick={() => setSidebarOpen(false)}>
            <FiX size={20} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          <p className="px-4 text-[9px] font-black uppercase tracking-[0.3em] text-gray-400 mb-4">Main Menu</p>
          {sidebarItems.map(item => (
            <NavLink
              key={item.name}
              to={item.path}
              end // Essential for the "Home" item to not always stay active
              onClick={() => setSidebarOpen(false)} // Close mobile menu on click
              className={({ isActive }) =>
                `flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-300 group ${
                  isActive 
                    ? "bg-[#ac0121] text-white shadow-lg shadow-[#ac0121]/20" 
                    : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white"
                }`
              }
            >
              <span className="transition-transform group-hover:scale-110">{item.icon}</span>
              <span className="text-xs font-bold uppercase tracking-widest">{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100 dark:border-white/5">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-5 py-4 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-2xl transition-all font-bold text-xs uppercase tracking-widest"
          >
            <AiOutlineLogout size={18} />
            Logout Session
          </button>
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex-1 flex flex-col h-full lg:ml-64">
        
        {/* Top Navbar - PERSISTENT */}
        <header className="flex-shrink-0 flex justify-between items-center bg-white/80 dark:bg-[#0f1115]/80 backdrop-blur-md border-b border-gray-100 dark:border-white/5 px-8 py-5 z-30">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden p-2 bg-gray-100 dark:bg-white/5 rounded-xl text-gray-600 dark:text-gray-200" 
              onClick={() => setSidebarOpen(true)}
            >
              <AiOutlineMenu size={22} />
            </button>
            <div className="hidden md:block">
               <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">System Status</p>
               <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  <span className="text-xs font-bold uppercase tracking-tighter">Ontario Server Online</span>
               </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 bg-gray-100 dark:bg-white/5 p-1.5 rounded-2xl border border-gray-200 dark:border-white/10">
               <button 
                onClick={() => darkMode && toggleDarkMode()}
                className={`p-2 rounded-xl transition-all ${!darkMode ? "bg-white text-[#ac0121] shadow-sm" : "text-gray-500"}`}
               >
                 <FiSun size={16} />
               </button>
               <button 
                onClick={() => !darkMode && toggleDarkMode()}
                className={`p-2 rounded-xl transition-all ${darkMode ? "bg-[#ac0121] text-white shadow-md" : "text-gray-500"}`}
               >
                 <FiMoon size={16} />
               </button>
            </div>
            
            <div className="h-8 w-[1px] bg-gray-200 dark:bg-white/10 hidden sm:block"></div>
            
            <div className="flex items-center gap-3">
               <div className="text-right hidden sm:block">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Admin Account</p>
                  <p className="text-xs font-bold uppercase tracking-tighter text-[#ac0121]">Afrik Manager</p>
               </div>
               <div className="w-10 h-10 rounded-2xl bg-[#ac0121] border-2 border-white dark:border-white/10 overflow-hidden shadow-lg">
                  <img src="https://ui-avatars.com/api/?name=Admin&background=ac0121&color=fff" alt="User" />
               </div>
            </div>
          </div>
        </header>

        {/* This is where Home, Orders, and Products are injected */}
        <main className="flex-1 overflow-y-auto bg-[#fafaf9] dark:bg-[#0f1115] p-6 md:p-10 scrollbar-hide">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;