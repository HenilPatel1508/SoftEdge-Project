import { ShoppingCart } from "lucide-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/userSlice";
import store from "@/redux/store";

const Navbar = () => {
  // const user = false;
  const cart = useSelector((store) => store.product.cart);
  const user = useSelector((store) => store.user?.user);
  const accessToken = localStorage.getItem("accessToken");
  const admin = user?.role === "admin" ? true : false;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_URL}/api/v1/user/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      if (res.data.success || res.data.message) {
        dispatch(setUser(null));
        toast.success(res.data.message);
        navigate("/")
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(cart);

  return (
  <header className="fixed top-0 w-full z-50 backdrop-blur-xl bg-white/70 border-b border-indigo-200 shadow-md">
    
    {/* Background Glow */}
    <div className="absolute top-0 left-20 w-40 h-40 bg-indigo-300/20 rounded-full blur-3xl"></div>
    <div className="absolute top-0 right-20 w-40 h-40 bg-pink-300/20 rounded-full blur-3xl"></div>

    <div className="relative max-w-7xl mx-auto flex justify-between items-center py-4 px-10">
      
      {/* Logo */}
      <Link
        to="/"
        className="flex items-center gap-3 group"
      >
        
        <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          ShopNest
        </h1>
      </Link>

      {/* Nav */}
      <nav className="flex gap-8 justify-between items-center">
        <ul className="flex gap-8 items-center text-lg font-semibold">
          {admin ? (
            <Link to="/dashboard">
              <li className="hover:text-indigo-600 transition-colors cursor-pointer">
                Dashboard
              </li>
            </Link>
          ) : (
            <>
              <Link to="/">
                <li className="hover:text-indigo-600 transition-colors cursor-pointer">
                  Home
                </li>
              </Link>

              <Link to="/products">
                <li className="hover:text-indigo-600 transition-colors cursor-pointer">
                  Products
                </li>
              </Link>

              {user && (
                <Link to="/order">
                  <li className="hover:text-indigo-600 transition-colors cursor-pointer">
                    Hi, {user.firstname}
                  </li>
                </Link>
              )}
            </>
          )}
        </ul>

        {/* Cart */}
        {!admin && (
          <Link
            to="/cart"
            className="relative p-3 rounded-full bg-white shadow-md hover:shadow-xl hover:scale-110 transition-all"
          >
            <ShoppingCart className="text-indigo-600" />

            <span className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full absolute text-white text-xs -top-2 -right-2 px-2 py-0.5">
              {cart?.items?.length || 0}
            </span>
          </Link>
        )}

        {/* Auth Button */}
        {user ? (
          <Button
            onClick={logoutHandler}
            className="bg-gradient-to-r from-red-500 to-pink-500 hover:scale-105 transition-all text-white px-6 py-5 text-lg rounded-xl shadow-md"
          >
            Logout
          </Button>
        ) : (
          <Button
            onClick={() => navigate("/login")}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:scale-105 transition-all text-white px-6 py-5 text-lg rounded-xl shadow-md"
          >
            Login
          </Button>
        )}
      </nav>
    </div>
  </header>
);
};

export default Navbar;
