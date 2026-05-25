import axios from "axios";
import {
  LayoutDashboard,
  LogOut,
  PackagePlus,
  PackageSearch,
  User,
} from "lucide-react";
import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { toast } from "sonner";
import { setUser } from "@/redux/userSlice";

const Sidebar = () => {
  const accessToken = localStorage.getItem("accessToken");
  const dispatch = useDispatch();
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
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
  <div className="hidden fixed md:block w-[300px] h-screen overflow-hidden backdrop-blur-xl bg-white/70 border-r border-indigo-200 shadow-xl">

    {/* Background Glow */}
    <div className="absolute top-10 left-10 w-32 h-32 bg-indigo-300/20 rounded-full blur-3xl"></div>
    <div className="absolute bottom-20 right-10 w-40 h-40 bg-pink-300/20 rounded-full blur-3xl"></div>

    {/* Sidebar Content */}
    <div className="relative z-10 p-8 h-full flex flex-col">
      
      {/* Logo / Title */}
      <div className="text-center mb-10 pt-3">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Admin Panel
        </h1>
        <p className="text-gray-500 text-sm mt-2">
          Manage your store
        </p>
      </div>

      {/* Menu */}
      <div className="space-y-4">

        <NavLink
          to="/dashboard/sales"
          className={({ isActive }) =>
            `flex items-center gap-3 text-lg font-semibold p-4 rounded-2xl transition-all duration-300 ${
              isActive
                ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg"
                : "hover:bg-indigo-100 text-gray-700"
            }`
          }
        >
          <LayoutDashboard />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/dashboard/add-product"
          className={({ isActive }) =>
            `flex items-center gap-3 text-lg font-semibold p-4 rounded-2xl transition-all duration-300 ${
              isActive
                ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg"
                : "hover:bg-indigo-100 text-gray-700"
            }`
          }
        >
          <PackagePlus />
          <span>Add Product</span>
        </NavLink>

        <NavLink
          to="/dashboard/products"
          className={({ isActive }) =>
            `flex items-center gap-3 text-lg font-semibold p-4 rounded-2xl transition-all duration-300 ${
              isActive
                ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg"
                : "hover:bg-indigo-100 text-gray-700"
            }`
          }
        >
          <PackageSearch />
          <span>Products</span>
        </NavLink>

        <NavLink
          to="/dashboard/users"
          className={({ isActive }) =>
            `flex items-center gap-3 text-lg font-semibold p-4 rounded-2xl transition-all duration-300 ${
              isActive
                ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg"
                : "hover:bg-indigo-100 text-gray-700"
            }`
          }
        >
          <User />
          <span>Users</span>
        </NavLink>

        <NavLink
          to="/dashboard/order"
          className={({ isActive }) =>
            `flex items-center gap-3 text-lg font-semibold p-4 rounded-2xl transition-all duration-300 ${
              isActive
                ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg"
                : "hover:bg-indigo-100 text-gray-700"
            }`
          }
        >
          <FaRegEdit />
          <span>Orders</span>
        </NavLink>
      </div>

      {/* Logout Button */}
      <div className="mt-auto">
        <button
          onClick={logoutHandler}
          className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-red-500 to-pink-500 hover:scale-105 transition-all text-white font-semibold p-4 rounded-2xl shadow-lg mt-3"
        >
          <LogOut />
          Logout
        </button>
      </div>
    </div>
  </div>
);
};

export default Sidebar;
