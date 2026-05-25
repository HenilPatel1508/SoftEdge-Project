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
  <div className="group bg-white shadow-md rounded-xl overflow-hidden h-50 relative hover:shadow-xl transition-all duration-300">

    {/* IMAGE */}
    <div className="w-full h-full overflow-hidden bg-gray-100">
      {loading ? (
        <Skeleton className="w-full h-full" />
      ) : (
        <img
          src={productImg?.[0]?.url}
          alt={productName}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      )}
    </div>

    {/* HOVER OVERLAY */}
    {!loading && (
      <div className="absolute inset-0 bg-black/70 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
          
          <h1 className="text-white text-sm font-semibold line-clamp-2">
            {productName}
          </h1>

          <p className="text-gray-300 text-xs mt-1">{brand}</p>

          <h2 className="text-xl font-bold text-white mt-2">
            ₹{productPrice}
          </h2>

          <Button
            onClick={() => addToCart(product._id)}
            className="mt-3 w-full flex items-center justify-center gap-2 bg-indigo-500 hover:bg-indigo-600"
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
