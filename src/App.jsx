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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/admin-login" element={<AdminLogin />} />

        <Route
          path="/admin-dashboard/*"
          element={
            <ProtectedRoutes>
              <DashboardLayout />
            </ProtectedRoutes>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="orders" element={<Orders />} />
          <Route path="admin-products" element={<AdminProduct />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
