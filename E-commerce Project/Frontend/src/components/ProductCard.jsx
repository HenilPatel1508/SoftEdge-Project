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
  <div className="group relative overflow-hidden rounded-2xl h-64 bg-gradient-to-br from-white via-indigo-50 to-purple-100 shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/40 backdrop-blur-md">

    {/* Background Glow */}
    <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-300/30 rounded-full blur-3xl"></div>
    <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-pink-300/30 rounded-full blur-3xl"></div>

    {/* IMAGE */}
    <div className="w-full h-full overflow-hidden relative">
      {loading ? (
        <Skeleton className="w-full h-full" />
      ) : (
        <img
          src={productImg?.[0]?.url}
          alt={productName}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
      )}
    </div>

    {/* Overlay */}
    {!loading && (
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
        <div className="translate-y-10 group-hover:translate-y-0 transition-transform duration-500">

          <h1 className="text-white text-sm font-semibold line-clamp-2">
            {productName}
          </h1>

          <p className="text-gray-300 text-xs mt-1">
            {brand}
          </p>

          <h2 className="text-2xl font-bold text-indigo-300 mt-2">
            ₹{productPrice}
          </h2>

          <Button
            onClick={() => addToCart(product._id)}
            className="mt-3 w-full flex items-center justify-center gap-2 bg-indigo-500 hover:bg-indigo-600 rounded-xl"
          >
            <ShoppingCart size={18} />
            Add To Cart
          </Button>
        </div>
      </div>
    )}
  </div>
);
};

export default ProductCard;
