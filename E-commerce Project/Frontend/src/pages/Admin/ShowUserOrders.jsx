import OrderCard from "@/components/OrderCard";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShoppingBag } from "lucide-react";

const ShowUserOrders = () => {
  const params = useParams();
  const [userOrder, setUserOrder] = useState([]);

  const getUserOrder = async () => {
    const accessToken = localStorage.getItem("accessToken");

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_URL}/api/v1/order/user-order/${params.userId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (res.data.success) {
        setUserOrder(res.data.orders);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserOrder();
  }, []);

  return (
    <div className="pl-[350px] pr-10 py-8 min-h-screen bg-gradient-to-br from-slate-100 via-pink-50 to-purple-100">
      
      {/* Header */}
      <div className="mb-8 backdrop-blur-xl bg-white/40 border border-white/30 shadow-xl rounded-3xl p-6">
        <div className="flex items-center gap-4">
          <div className="bg-pink-500/20 p-4 rounded-2xl">
            <ShoppingBag className="text-pink-600 w-8 h-8" />
          </div>

          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              User Orders
            </h1>
            <p className="text-gray-600 mt-2">
              View all purchased products and order details
            </p>
          </div>
        </div>
      </div>

      {/* Orders */}
      <div className="backdrop-blur-xl bg-white/40 border border-white/30 shadow-xl rounded-3xl p-6">
        {userOrder?.length > 0 ? (
          <OrderCard userOrder={userOrder} />
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <ShoppingBag className="w-16 h-16 text-pink-400 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-700">
              No Orders Found
            </h2>
            <p className="text-gray-500 mt-2">
              This user has not placed any orders yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowUserOrders;