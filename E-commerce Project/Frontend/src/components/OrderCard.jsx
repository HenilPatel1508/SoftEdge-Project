import React from "react";
import { Button } from "./ui/button";
import { ArrowLeft, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";

const OrderCard = ({ userOrder }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pt-24 px-4 md:px-8 bg-gradient-to-br from-indigo-50 via-white to-pink-50 overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            onClick={() => navigate(-1)}
            className="bg-indigo-500 hover:bg-indigo-700"
          >
            <ArrowLeft />
          </Button>

          <h1 className="text-3xl font-bold text-gray-800">My Orders</h1>
        </div>

        {/* No Orders */}
        {userOrder?.length === 0 ? (
          <div className="backdrop-blur-md bg-white/80 border border-white/40 shadow-xl rounded-3xl p-10 text-center">
            <p className="text-gray-700 text-xl font-medium">No Orders Found</p>
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            {userOrder?.map((order) => (
              <div
                key={order._id}
                className="backdrop-blur-md bg-white/80 border border-white/40 shadow-xl rounded-3xl p-6 hover:shadow-2xl transition-all"
              >
                {/* Order Header */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
                  <div>
                    <h2 className="font-semibold text-lg text-gray-800">
                      Order ID
                    </h2>
                    <p className="text-gray-500 break-all text-sm">
                      {order._id}
                    </p>
                  </div>

                  <div>
                    <p className="text-xl font-bold text-indigo-600">
                      ₹{order.amount.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* User Info + Status */}
                <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
                  <div className="space-y-1">
                    <p>
                      <span className="font-semibold">User:</span>{" "}
                      {order.user?.firstname} {order.user?.lastname}
                    </p>

                    <p>
                      <span className="font-semibold">Email:</span>{" "}
                      {order.user?.email}
                    </p>
                  </div>

                  <span
                    className={`text-white text-sm px-4 py-2 rounded-full self-start ${
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
                  <h3 className="font-semibold text-lg mb-4 text-gray-800">
                    Products
                  </h3>

                  <div className="grid gap-4">
                    {order?.products?.length > 0 ? (
                      order.products.map((product, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl hover:bg-indigo-50 transition"
                        >
                          <img
                            src={
                              product?.productId?.productImg?.[0]?.url ||
                              "/placeholder.png"
                            }
                            className="w-24 h-24 object-cover rounded-xl"
                            alt="product"
                          />

                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-800">
                              {product?.productId?.productName ||
                                "Product not found"}
                            </h4>

                            <p className="text-sm text-gray-500">
                              Quantity: {product?.quantity || 0}
                            </p>

                            <p className="text-indigo-600 font-bold mt-1">
                              ₹{product?.productId?.productPrice || 0}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-center py-4">
                        No products found
                      </p>
                    )}
                  </div>
                </div>

                {/* Invoice */}
                <a
                  href={`${import.meta.env.VITE_URL}/api/v1/invoice/${order._id}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl transition"
                >
                  <Download size={18} />
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
