import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import AdminLogin from "./Pages/AdminLogin";
import DashboardLayout from "./Components/DashboardLayout";
import DashboardHome from "./Pages/DashboardHome";
import Orders from "./Pages/Order";
import AdminProduct from "./Pages/AdminProduct";
import ProtectedRoutes from "./Components/ProtectedRoutes";
import CheckOut from "./Pages/CheckOut";
import Menu from "./Pages/Menu";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Website Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* Protected Dashboard Section */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoutes>
              <DashboardLayout />
            </ProtectedRoutes>
          }
        >
          {/* This renders at /admin-dashboard */}
          <Route index element={<DashboardHome />} />
          
          {/* These render inside the layout at /admin-dashboard/orders, etc. */}
          <Route path="orders" element={<Orders />} />
          <Route path="admin-products" element={<AdminProduct />} />
          
          {/* Add placeholders for other menu items so they don't break */}
          <Route path="earnings" element={<div>Earnings Page</div>} />
          <Route path="transactions" element={<div>Transactions Page</div>} />
          <Route path="profile" element={<div>Profile Page</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;