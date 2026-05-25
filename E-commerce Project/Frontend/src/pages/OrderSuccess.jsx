import React from "react";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-pink-50 p-6">
      
      {/* Background Design */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-300/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-pink-300/20 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"></div>

      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#6366f1_1px,transparent_1px),linear-gradient(to_bottom,#6366f1_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      <div className="relative z-10 backdrop-blur-md bg-white/80 border border-white/40 rounded-3xl shadow-2xl p-10 max-w-md w-full text-center">
        
        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="bg-green-100 p-5 rounded-full shadow-md">
            <CheckCircle className="h-20 w-20 text-green-600" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold mt-6 text-gray-800">
          Payment Successful 🎉
        </h1>

        {/* Message */}
        <p className="text-gray-600 mt-3 text-lg">
          Thank you for your purchase!  
          Your order has been placed successfully.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col gap-4">
          <button
            onClick={() => navigate("/products")}
            className="w-full bg-indigo-500 text-white py-3 rounded-xl hover:bg-indigo-700 transition font-medium shadow-md"
          >
            Continue Shopping
          </button>

          <button
            onClick={() => navigate("/order")}
            className="w-full border-2 border-indigo-500 text-indigo-600 py-3 rounded-xl hover:bg-indigo-50 transition font-medium"
          >
            View My Orders
          </button>
        </div>

        {/* Extra Message */}
        <p className="text-sm text-gray-500 mt-6">
          Your order confirmation has been sent successfully.
        </p>
      </div>
    </div>
  );
};

export default OrderSuccess;