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
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/userSlice";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch()

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
        `http://localhost:3000/api/v1/user/login`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (res.data.success||res.data.message) {
        navigate("/");
        dispatch(setUser(res.data.user))
        localStorage.setItem("accessToken",res.data.token)
        toast.success(res.data.message,{position:"top-right"});
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message,{position:"top-right"});
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="flex justify-center items-center min-h-screen bg-indigo-100">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="grid text-center text-2xl">
              Login your account
            </CardTitle>
            <CardDescription className="grid text-center text-lg">
              Enter your Details to Login your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  value={formData.email}
                  onChange={handlechange}
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    placeholder="Enter a Password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handlechange}
                    required
                  />
                  {showPassword ? (
                    <EyeOff
                      onClick={() => {
                        setShowPassword(false);
                      }}
                      className="w-5 h-5 text-gray-700 absolute right-5 bottom-2"
                    />
                  ) : (
                    <Eye
                      onClick={() => {
                        setShowPassword(true);
                      }}
                      className="w-5 h-5 text-gray-700 absolute right-5 bottom-2"
                    />
                  )}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-3 ">
            <Button
              onClick={submitHandler}
              type="submit"
              className="w-full cursor-pointer p-5 bg-indigo-500 hover:bg-indigo-800"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Please Wait
                </>
              ) : (
                "Login"
              )}
            </Button>
            <p>
              Don't have an Acoount ?{" "}
              <Link
                to={"/signup"}
                className="hover:underline cursor-pointer text-cyan-700"
              >
                Signup
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
