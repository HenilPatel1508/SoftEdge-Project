import React from "react";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCart } from "@/redux/productSlice";

const ProductCard = ({ product, loading }) => {
  const { productImg, productPrice, productName, brand } = product;

  const accessToken = localStorage.getItem("accessToken");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addToCart = async (productId) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_URL}/api/v1/cart/add`,
        { productId },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      if (res.data.success) {
        toast.success("Product Added To Cart");
        dispatch(setCart(res.data.cart));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden flex flex-col h-75 hover:shadow-xl transition-all">
      {/* IMAGE */}
      <div className="w-full h-45 overflow-hidden bg-gray-100">
        {loading ? (
          <Skeleton className="w-full h-full" />
        ) : (
          <img
            src={productImg?.[0]?.url}
            alt={productName}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        )}
      </div>

      {/* CONTENT */}
      <div className="flex flex-col justify-between flex-1 p-3">
        {loading ? (
          <div className="space-y-2">
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-1/2 h-4" />
            <Skeleton className="w-full h-8" />
          </div>
        ) : (
          <>
            <div>
              <h1 className="text-sm font-semibold line-clamp-2 h-10 overflow-hidden">
                {productName}{" "}
                <span className="font-medium text-gray-400">({brand})</span>
              </h1>
              <h2 className="text-lg font-bold text-indigo-600 mt-1">
                ₹{productPrice}
              </h2>
            </div>

            <Button
              onClick={() => addToCart(product._id)}
              className="mt-3 w-full flex items-center justify-center gap-2 bg-indigo-500 hover:bg-indigo-600"
            >
              <ShoppingCart size={18} />
              Add To Cart
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
