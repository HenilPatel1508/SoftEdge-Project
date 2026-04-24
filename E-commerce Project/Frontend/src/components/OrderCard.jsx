import React from "react";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const OrderCard = ({ userOrder }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center pt-20">
      <div className="w-170 ml-40 max-w-4xl p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button onClick={() => navigate(-1)}>
            <ArrowLeft />
          </Button>
          <h1 className="text-2xl font-bold">Orders</h1>
        </div>

        {/* No Orders */}
        {userOrder?.length === 0 ? (
          <p className="text-gray-800 text-xl">No Order Found For this user</p>
        ) : (
          <div className="flex flex-col gap-6">
            {userOrder?.map((order) => (
              <div
                key={order._id}
                className="shadow-md rounded-2xl p-5 border bg-white"
              >
                {/* Order Header */}
                <div className="flex flex-col gap-2 mb-4">
                  <h2 className="text-md font-semibold">
                    Order Id :
                    <span className="text-gray-600 ml-1 break-all">
                      {order._id}
                    </span>
                  </h2>

                  <p className="font-bold">
                    Amount :
                    <span className="text-gray-600 ml-1">
                      {order.currency} {order.amount.toFixed(2)}
                    </span>
                  </p>
                </div>

                {/* User Info */}
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-sm">
                      <span className="font-bold">User :</span>{" "}
                      {order.user?.firstname} {order.user?.lastname}
                    </p>
                    <p className="text-sm">
                      <span className="font-bold">Email :</span>{" "}
                      {order.user?.email}
                    </p>
                  </div>

                  <span
                    className={`text-white text-sm px-3 py-1 rounded-full ${
                      order.status === "Paid"
                        ? "bg-green-500"
                        : order.status === "Failed"
                          ? "bg-red-500"
                          : "bg-orange-400"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                {/* Products */}
                <div>
                  <h3 className="font-semibold mb-3">Products :</h3>

                  <div className="flex flex-col gap-3">
                    {order.products.map((product, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-4 bg-gray-50 p-3 rounded-xl"
                      >
                        {/* Image */}
                        <img
                          src={
                            product.productId?.productImg?.[0]?.url ||
                            "/placeholder.png"
                          }
                          className="w-20 h-20 object-cover rounded-lg"
                          alt="product"
                        />

                        {/* Info */}
                        <div className="flex flex-col">
                          <span className="font-medium">
                            {product.productId?.productName}
                          </span>
                          <span className="text-sm text-gray-600">
                            Qty: {product.quantity}
                          </span>
                          <span className="text-sm font-semibold">
                            ₹{product.productId?.productPrice}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <a
                  href={`${import.meta.env.VITE_URL}/api/v1/invoice/${order._id}`}
                  target="_blank"
                  className="text-black  mt-2 inline-block"
                >
                  Download Invoice
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderCard;
