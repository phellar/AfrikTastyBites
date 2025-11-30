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


const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const sidebarItems = [
    { name: "Home", icon: <AiOutlineHome size={20} />, path: "/admin-dashboard" },
    { name: "Orders", icon: <AiOutlineShoppingCart size={20} />, path: "/admin-dashboard/orders" },
    { name: "Earnings", icon: <AiOutlineDollar size={20} />, path: "/admin-dashboard/earnings" },
    { name: "Profile", icon: <AiOutlineUser size={20} />, path: "/admin-dashboard/profile" },
    { name: "Products", icon: <LuPackage size={20} />, path: "/admin-dashboard/admin-products" },
    { name: "Transactions", icon: <LuReceipt size={20} />, path: "/admin-dashboard/transactions" },
    
  ];

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(prev => {
      const newMode = !prev;
      if (newMode) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      return newMode;
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin-login");
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">

      {/* Sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full bg-white dark:bg-gray-800 shadow-lg flex flex-col z-50 transform lg:translate-x-0 transition-transform duration-300
          ${sidebarOpen ? "translate-x-0 w-64" : "-translate-x-full w-64"}`}>

        {/* Logo */}
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/afrik-logo.png" alt="Afrik Admin" className="w-10 h-10" />
            {/* <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">Afrik Admin</span> */}
          </div>
          <button className="lg:hidden text-gray-600 dark:text-gray-200" onClick={() => setSidebarOpen(false)}>✕</button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 px-4 space-y-2">
          {sidebarItems.map(item => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/admin-dashboard"} 
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-100 dark:hover:bg-gray-700 transition ${
                  isActive ? "bg-blue-100 dark:bg-gray-700 font-semibold text-blue-600 dark:text-blue-400" : "text-gray-700 dark:text-gray-300"
                }`
              }
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
        </nav>

        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 m-4 text-red-500 hover:bg-red-100 dark:hover:bg-red-700 rounded-xl transition"
        >
          <AiOutlineLogout size={20} />
          Logout
        </button>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-auto lg:ml-64">
        <header className="flex justify-between items-center bg-white dark:bg-gray-800 shadow px-6 py-6 md:py-8">
          <div className="flex items-center gap-4">
            <button className="lg:hidden text-gray-600 dark:text-gray-200" onClick={() => setSidebarOpen(true)}>
              <AiOutlineMenu size={28} />
            </button>
            {/* <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-100">Dashboard</h1> */}
          </div>

          <div className="flex items-center gap-3">
            {/* Font Awesome brightness icon beside toggle */}
            <i className="fa-solid fa-brightness text-gray-600 dark:text-gray-300 text-lg"></i>

            {/* Slider toggle */}
            <button 
              onClick={toggleDarkMode}
              className={`w-12 h-6 rounded-full p-1 transition-colors ${darkMode ? "bg-gray-700" : "bg-gray-300"}`}
            >
              <div className={`w-4 h-4 bg-white dark:bg-yellow-400 rounded-full shadow transform transition-transform ${darkMode ? "translate-x-6" : "translate-x-0"}`} />
            </button>
          </div>
        </header>

        <main className="p-6 sm:p-8 flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
