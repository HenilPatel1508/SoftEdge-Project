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
    <div className="hidden fixed md:block border-r bg-indigo-50 border-indigo-200 px-10 w-[300px] p-10 space-y-2 h-screen">
      <div className="text-center pt-10 px-3 space-y-2">
        <NavLink
          to="/dashboard/sales"
          className={({ isActive }) =>
            `text-xl ${isActive ? "bg-indigo-400 text-black" : "bg-transparent"} flex items-center font-bold gap-2 cursor-pointer p-3 rounded-2xl w-full `
          }
        >
          <LayoutDashboard />
          <span>Dashboard</span>
        </NavLink>
        <NavLink
          to="/dashboard/add-product"
          className={({ isActive }) =>
            `text-xl ${isActive ? "bg-indigo-400 text-black" : "bg-transparent"} flex items-center font-bold gap-2 cursor-pointer p-3 rounded-2xl w-full `
          }
        >
          <PackagePlus />
          <span>Add Product</span>
        </NavLink>
        <NavLink
          to="/dashboard/products"
          className={({ isActive }) =>
            `text-xl ${isActive ? "bg-indigo-400 text-black" : "bg-transparent"} flex items-center font-bold gap-2 cursor-pointer p-3 rounded-2xl w-full `
          }
        >
          <PackageSearch />
          <span>Products</span>
        </NavLink>
        <NavLink
          to="/dashboard/users"
          className={({ isActive }) =>
            `text-xl ${isActive ? "bg-indigo-400 text-black" : "bg-transparent"} flex items-center font-bold gap-2 cursor-pointer p-3 rounded-2xl w-full `
          }
        >
          <User />
          <span>Users</span>
        </NavLink>
        <NavLink
          to="/dashboard/order"
          className={({ isActive }) =>
            `text-xl ${isActive ? "bg-indigo-400 text-black" : "bg-transparent"} flex items-center font-bold gap-2 cursor-pointer p-3 rounded-2xl w-full `
          }
        >
          <FaRegEdit />
          <span>Orders</span>
        </NavLink>
        <NavLink
          onClick={logoutHandler}
          className={({ isActive }) =>
            `  text-xl ${isActive ? "bg-red-500 text-black" : "bg-transparent"} flex items-center font-bold gap-2 cursor-pointer p-3 rounded-2xl w-full `
          }
        >
          <LogOut />
          <span>Logout</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
