import OrderCard from "@/components/OrderCard";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ShowUserOrders = () => {
  const params = useParams();
  const [userOrder, setUserOrder] = useState(null);

  const getUserOrder = async () => {
    const accessToken = localStorage.getItem("accessToken");

    const res = await axios.get(
      `${import.meta.env.VITE_URL}/api/v1/order/user-order/${params.userId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    if (res.data.success) {
      setUserOrder(res.data.orders);
    }
  };

  useEffect(() => {
    getUserOrder();
  }, []);
  return (
    <>
      <div className="">
        <OrderCard userOrder={userOrder} />
      </div>
    </>
  );
};

export default ShowUserOrders;
