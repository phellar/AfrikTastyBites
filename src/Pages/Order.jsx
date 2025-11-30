import React, { useEffect, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";

const Orders = () => {
const [orders, setOrders] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

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

if (!res.ok) {  
  throw new Error("Failed to fetch orders");  
}  

const data = await res.json();  

setOrders(data.data || []);  
} catch (err) {  
console.error(err);  
setError(err.message);  
setOrders([]);  
} finally {  
setLoading(false);  
}  
};  

fetchOrders();  

}, []);

return (
<div>
<h2 className="text-2xl font-semibold text-gray-800 mb-6">Orders</h2>
{loading && (  
    <div className="flex justify-center items-center min-h-[300px]">  
      <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>  
    </div>  
  )}  

  {!loading && error && (  
    <p className="text-center text-red-500 mt-6">{error}</p>  
  )}  

  {!loading && !error && orders.length === 0 && (  
    <p className="text-center text-gray-500 mt-6">No orders found.</p>  
  )}  

  {!loading && !error && orders.length > 0 && (  
    <div className="overflow-x-auto">  
      <table className="min-w-full bg-white rounded-lg shadow divide-y divide-gray-200">  
        <thead className="bg-gray-50">  
          <tr>  
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Ref</th>  
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>  
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>  
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>  
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>  
          </tr>  
        </thead>  
        <tbody className="bg-white divide-y divide-gray-200">  
          {orders.map((order) => (  
            <tr key={order.id}>  
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{order.Ref}</td>  
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{order.customer_name}</td>  
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">${order.total}</td>  
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Completed</td>  
              <td className="px-6 py-4 whitespace-nowrap text-center">  
                <button className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition">  
                  <AiOutlineEye />  
                  View  
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