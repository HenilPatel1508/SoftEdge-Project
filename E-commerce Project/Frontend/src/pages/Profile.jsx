import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import OrderCard from "@/components/OrderCard";

const MyOrder = () => {
  const [userOrder, setUserOrder] = useState(null);

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
    <>
    <OrderCard userOrder={userOrder}/>
    </>
  );
};

export default MyOrder;
