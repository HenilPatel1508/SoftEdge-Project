import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import {
  Users,
  Package,
  ShoppingCart,
  IndianRupee,
} from "lucide-react";

const AdminSales = () => {
  const [state, setState] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalSales: 0,
    sales: [],
  });

  const fetchStatus = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      const res = await axios.get(
        `${import.meta.env.VITE_URL}/api/v1/order/sales`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (res.data.success) {
        setState(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const stats = [
    {
      title: "Total Users",
      value: state.totalUsers,
      icon: Users,
    },
    {
      title: "Total Products",
      value: state.totalProducts,
      icon: Package,
    },
    {
      title: "Total Orders",
      value: state.totalOrders,
      icon: ShoppingCart,
    },
    {
      title: "Total Sales",
      value: `₹${state.totalSales}`,
      icon: IndianRupee,
    },
  ];

  return (
    <div className="pl-[350px] pr-10 py-8 min-h-screen bg-gradient-to-br from-slate-100 via-pink-50 to-purple-100">
      <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
        Sales Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((item, index) => {
          const Icon = item.icon;
          return (
            <Card
              key={index}
              className="backdrop-blur-xl bg-white/40 border border-white/30 shadow-xl rounded-3xl hover:scale-105 transition-all duration-300"
            >
              <CardContent className="p-6 flex justify-between items-center">
                <div>
                  <p className="text-gray-600 text-sm">{item.title}</p>
                  <h2 className="text-3xl font-bold text-gray-800 mt-2">
                    {item.value}
                  </h2>
                </div>
                <div className="bg-pink-500/20 p-4 rounded-2xl">
                  <Icon className="text-pink-600 w-8 h-8" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Sales Chart */}
      <Card className="mt-8 backdrop-blur-xl bg-white/40 border border-white/30 shadow-xl rounded-3xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-800">
            Sales Analytics (Last 30 Days)
          </CardTitle>
        </CardHeader>

        <CardContent className="h-[420px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={state.sales}>
              <defs>
                <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ec4899" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#ec4899" stopOpacity={0.05} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />

              <Area
                type="monotone"
                dataKey="amount"
                stroke="#ec4899"
                strokeWidth={3}
                fill="url(#salesGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSales;