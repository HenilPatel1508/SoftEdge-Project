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
  const cart = useSelector(store=>store.product.cart)
  const user = useSelector((store) => store.user?.user);
  const accessToken = localStorage.getItem("accessToken");
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutHandler = async () => {
    try {
      const res = await axios.post(
        `http://localhost:3000/api/v1/user/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      if (res.data.success || res.data.message) {
        dispatch(setUser(res.data.user))
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
console.log(cart);

  return (
    <header className="bg-cyan-50 fixed w-full z-20 border-b border-indigo-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-3">
        {/* logo section */}
        <div className="">
          <img src="/shopping-cart.png" className="w-27 object-cover" alt="" />
        </div>
        {/* nav section */}
        <nav className="flex gap-10 justify-between items-center">
          <ul className="flex gap-10 items-center text-xl font-semibold">
            <Link to={"/"}>
              <li>Home</li>
            </Link>
            <Link to={"/products"}>
              <li>Product</li>
            </Link>
              
            {user && (
              <Link to={"/profile"}>
                <li>Hello , {user.firstname}</li>
              </Link>
            )}
          </ul>
          <Link to={"/cart"} className="relative">
            <ShoppingCart />
            <span className="bg-indigo-500 rounded-full absolute text-white -top-3 -right-5 px-2">
              {cart?.items?.length || 0}
            </span>
          </Link>
          {user ? (
            <Button onClick={logoutHandler} className="bg-indigo-500 text-white cursor-pointer p-5 text-xl">
              Logout
            </Button>
          ) : (
            <Button onClick={()=>
              navigate('/login')
            } className="bg-linear-to-tl from-blue-600 to-cyan-600 text-white cursor-pointer p-5 text-xl">
              Login
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
