import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MyOrder = () => {
  const [userOrder, setUserOrder] = useState(null);
  const navigate = useNavigate();
  const getUserOrder = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const res = await axios.get(
      `${import.meta.env.VITE_URL}/api/v1/order/myorder`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    if (res.data.success) {
      setUserOrder(res.data.orders);
      console.log(res.data);
      
    }
  };

  useEffect(() => {
    getUserOrder();
  }, []);

  return (
    <div className="justify-center flex flex-col gap-3 pt-20">
      <div className="w-full p-6 ">
        <div className="flex items-center justify-center gap-4 mb-6">
          <Button onClick={() => navigate(-1)}>
            <ArrowLeft />
          </Button>
          <h1 className="text-2xl font-bold">Orders</h1>
        </div>
        {userOrder?.length === 0 ? (
          <p className="text-gray-800 space-y-6 text-2xl">
            No Order Found For this user
          </p>
        ) : (
          <div className="w-full grid grid-cols-2 gap-4 pb-6 ">
            {userOrder?.map((order) => (
              <div
                key={order._id}
                className="shadow-lg rounded-2xl p-5 border border-gray-200 bg-white"
              >
                {/* order header */}
                <div className="flex w-full gap-4 min-h-15">
                  <h2 className="text-lg font-semibold text-center">
                    Order Id :
                    <span className="text-gray-600 ml-1 break-all">
                      {order._id}
                    </span>
                  </h2>

                  <p className="text-md font-bold">Amount :</p>
                  <span className="text-gray-600">
                    {order.currency} {order.amount.toFixed(2)}
                  </span>
                </div>
                 {/* User Info */}
                <div className="flex justify-between items-center">
                  <div className="">
                    <p className="text-sm">
                      <span className="font-bold">User :</span>{" "}
                      {order.user?.firstname || "Unknown"}{order.user?.lastname}
                    </p>
                    <p className="text-sm font-bold text-black">
                      Email : <span className="font-medium">{order.user?.email || "N/A"}</span>
                    </p>
                  </div>
                </div>
              </div>

              
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrder;
