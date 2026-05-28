import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/userSlice";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlechange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_URL}/api/v1/user/login`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (res.data.success || res.data.message) {
        dispatch(setUser(res.data.user));
        localStorage.setItem("accessToken", res.data.token);
        // Direct admin redirect
        if (res.data.user.role === "admin") {
          navigate("/dashboard/sales"); // or /dashboard
        } else {
          navigate("/");
        }

        toast.success(res.data.message, { position: "top-right" });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, { position: "top-right" });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-100 via-white to-purple-100">
      {/* 🔵 Animated Background Blobs */}
      <div className="absolute w-[400px] h-[400px] bg-indigo-400/30 rounded-full blur-3xl animate-pulse top-[-100px] left-[-100px]" />
      <div className="absolute w-[350px] h-[350px] bg-purple-400/30 rounded-full blur-3xl animate-bounce bottom-[-120px] right-[-100px]" />

      {/* 🧊 Login Card */}
      <Card className="w-full max-w-md backdrop-blur-xl bg-white/70 shadow-2xl border border-white/40 rounded-2xl transition-all duration-300 hover:scale-[1.01]">
        <CardHeader>
          <CardTitle className="text-center text-5xl font-bold text-indigo-700">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-center text-00000xl text-gray-600">
            Login to continue shopping 🚀
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-4">
            {/* Email */}
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-gray-700">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                value={formData.email}
                onChange={handlechange}
                className="transition-all duration-300 focus:ring-2 focus:ring-indigo-400 focus:scale-[1.01]"
                required
              />
            </div>

            {/* Password */}
            <div className="grid gap-2">
              <Label htmlFor="password" className="text-gray-700">
                Password
              </Label>

              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  placeholder="Enter password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handlechange}
                  className="pr-10 transition-all duration-300 focus:ring-2 focus:ring-indigo-400 focus:scale-[1.01]"
                  required
                />

                {showPassword ? (
                  <EyeOff
                    onClick={() => setShowPassword(false)}
                    className="w-5 h-5 text-gray-600 absolute right-3 top-3 cursor-pointer hover:text-indigo-600 transition"
                  />
                ) : (
                  <Eye
                    onClick={() => setShowPassword(true)}
                    className="w-5 h-5 text-gray-600 absolute right-3 top-3 cursor-pointer hover:text-indigo-600 transition"
                  />
                )}
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-3">
          {/* Button */}
          <Button
            onClick={submitHandler}
            className="w-full py-5 bg-indigo-600 hover:bg-indigo-800 transition-all duration-300 hover:scale-[1.02] shadow-lg"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Logging in...
              </span>
            ) : (
              "Login"
            )}
          </Button>

          {/* Signup */}
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-indigo-700 font-medium hover:underline"
            >
              Signup
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
