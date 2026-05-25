import axios from "axios";
import React, { useEffect, useState } from "react";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_URL}/api/v1/order/all`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (data.success) setOrders(data.orders);
      } catch (error) {
        console.error("Failed To Fetch admin orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [accessToken]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 px-8 py-4 rounded-2xl text-white text-lg shadow-2xl">
          Loading Orders...
        </div>
      </div>
    );
  }

  return (
  <div className="flex-1 p-8 bg-slate-100 ml-70 overflow-auto">
    <div className="max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="backdrop-blur-xl bg-white/70 border border-white/40 shadow-xl rounded-3xl p-6 mb-8">
        <h1 className="text-3xl font-bold text-slate-800">
          Admin Orders
        </h1>
        <p className="text-slate-500 mt-1">
          Manage all customer orders
        </p>
      </div>

      {/* Glass Table Card */}
      <div className="backdrop-blur-xl bg-white/60 border border-white/40 shadow-2xl rounded-3xl overflow-hidden">
        {orders.length === 0 ? (
          <div className="text-center py-16 text-slate-500">
            No Orders Found
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-200/60 text-slate-700 ">
                <tr>
                  <th className="px-6 py-4">Order ID</th>
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Products</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Date</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-b border-slate-200 font-semibold hover:bg-white/80 transition"
                  >
                    <td className="px-6 py-4 text-md text-black-500">
                      {order._id}
                    </td>

                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-800">
                        {order.user?.name}
                      </div>
                      <div className="text-md text-black-500">
                        {order.user?.email}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      {order.products.map((p, idx) => (
                        <div key={idx}>
                          {p.productName} × {p.quantity}
                        </div>
                      ))}
                    </td>

                    <td className="px-6 py-4 font-bold text-indigo-600">
                      ₹{order.amount.toLocaleString("en-IN")}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          order.status === "Paid"
                            ? "bg-green-100 text-green-700"
                            : order.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-slate-600">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  </div>
);
};

export default AdminOrders;