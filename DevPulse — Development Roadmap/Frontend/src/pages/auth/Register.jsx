import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (formData.password !== formData.confirmPassword) {
        return alert("Passwords do not match");
      }

      // ✅ FIX: only safe log
      console.log({
        name: formData.fullname,
        email: formData.email,
        password: formData.password,
      });

      const res = await axios.post(
        "http://localhost:5000/auth/register",
        {
          name: formData.fullname,
          email: formData.email,
          password: formData.password,
        }
      );

      alert(res.data.message);

      navigate("/otp", {
        state: {
          type: "register",
          email: formData.email,
        },
      });

    } catch (error) {
      console.log("FULL ERROR =>", error);
      console.log("RESPONSE =>", error.response);
      console.log("DATA =>", error.response?.data);

      alert(
        error.response?.data?.message ||
        error.message ||
        "Registration Failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* LEFT SIDE - FORM */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-6">

        <div className="w-full max-w-md bg-gray-100 rounded-2xl p-8 ">

          {/* Header */}
          <div className="text-center mb-6 ">
            <h1 className="text-5xl font-bold text-black">DevPulse</h1>
            <p className="text-black-300 text-lg mt-1">
              Create your developer account 🚀
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-black">

            <input
              type="text"
              name="fullname"
              placeholder="Full Name"
              value={formData.fullname}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-white text-black border focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:color-black"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-white text-black placeholder-gray-500 border focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-white text-black placeholder-gray-500 border focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-sm text-gray-500"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-white text-black placeholder-gray-500 border focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-[1.02] transition"
            >
              Create Account
            </button>

            <p className="text-center text-sm text-black">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-sky-400 cursor-pointer hover:underline"
              >
                Login
              </span>
            </p>

          </form>
        </div>
      </div>

      {/* RIGHT SIDE - IMAGE */}
      <div className="hidden md:flex w-1/2 items-center justify-center bg-gradient-to-br">

        <img
          src="./register-removebg-preview.png"
          alt="developer"
          className="w-[70%] drop-shadow-2xl"
        />

      </div>

    </div>
  );
};

export default Register;