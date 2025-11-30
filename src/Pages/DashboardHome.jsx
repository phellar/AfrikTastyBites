import React, { useEffect, useState } from "react";
import { AiOutlineShoppingCart, AiOutlineDollar, AiOutlineUser } from "react-icons/ai";

const DashboardHome = () => {
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState("₦0");
  const [newCustomers, setNewCustomers] = useState(0);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(import.meta.env.VITE_BACKEND_END_API_URL, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch orders");
        const data = await res.json();

        //API returns { totalOrders, totalEarnings, newCustomers }
        setTotalOrders(data.totalOrders ?? 0);
        setTotalEarnings(data.totalEarnings ? `$${data.totalEarnings}` : "$0");
        setNewCustomers(data.newCustomers ?? 0);
      } catch (err) {
        console.error("Fetch failed:", err);
        setTotalOrders(0);
        setTotalEarnings("$0");
        setNewCustomers(0);
      }
    };

    fetchOrders();
  }, []);

  const stats = [
    { title: "Total Orders", value: totalOrders, icon: <AiOutlineShoppingCart size={30} />, color: "bg-blue-100" },
    { title: "Total Earnings", value: totalEarnings, icon: <AiOutlineDollar size={30} />, color: "bg-green-100" },
    { title: "New Customers", value: newCustomers, icon: <AiOutlineUser size={30} />, color: "bg-purple-100" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {stats.map((stat) => (
      <div
        key={stat.title}
        className={`flex items-center p-6 rounded-xl shadow-sm ${stat.color} hover:shadow-md transition min-h-[150px]`}
      >
        <div className="mr-4 text-3xl">{stat.icon}</div>
        <div>
          <p className="text-gray-600">{stat.title}</p>
          <p className="text-2xl font-semibold text-gray-800">{stat.value}</p>
        </div>
      </div>
    ))}
  </div>
  
  );
};

export default DashboardHome;
