import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const AdminSales = () => {
  const [state, setState] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalSales: 0,
    salesByDate: [],
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
        },
      );
      if (res.data.success) {
        setState(res.data);
        console.log(totalUsers);
        
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    fetchStatus()
  },[])
  return(
    
  <div className="pl-[350px] bg-gray-100  pr-20 mx-auto px-4">
    <div className="p-6 grid gap-6 lg:grid-cols-4">
      {/* Stats Cards */}
      <Card className="bg-indigo-200 text-center text-black shadow">
        <CardHeader>
          <CardTitle>
            Total Users
          </CardTitle>
        </CardHeader>
        <CardContent className="text-2xl text-center font-bold">{state.totalUsers}</CardContent>
      </Card>
      <Card className="bg-indigo-200 text-center text-black shadow">
        <CardHeader>
          <CardTitle>
            Total Products
          </CardTitle>
        </CardHeader>
        <CardContent className="text-2xl text-center font-bold">{state.totalProducts}</CardContent>
      </Card>
      <Card className="bg-indigo-200 text-center text-black shadow">
        <CardHeader>
          <CardTitle>
            Total Orders
          </CardTitle>
        </CardHeader>
        <CardContent className="text-2xl text-center font-bold">{state.totalOrders}</CardContent>
      </Card>
      <Card className="bg-indigo-200 text-black text-center shadow">
        <CardHeader>
          <CardTitle>
            Total Sales
          </CardTitle>
        </CardHeader>
        <CardContent className="text-2xl text-center font-bold">{state.totalSales}</CardContent>
      </Card>
      {/* sales Charts */}
      <Card className="lg:col-span-4">
        <CardHeader>
          <CardTitle>Sales (Last 30 Days)</CardTitle>
        </CardHeader>
        <CardContent style={{height:300}}>
          <ResponsiveContainer width="100%" height="100%">
             <AreaChart data={state.orders}>
             <XAxis dataKey="date"/>
             <YAxis/>
             <Tooltip/>
             <Area type="monotone" dataKey="amount" stroke="#F472B6" fill="#F472B6"/>
             </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  </div>

  )
};

export default AdminSales;
