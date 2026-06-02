import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      return Swal.fire({
        icon: "warning",
        title: "Email Required",
        text: "Please enter your email",
      });
    }

    try {
      setLoading(true);

      Swal.fire({
        title: "Sending OTP...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      const res = await axios.post(
        "http://localhost:5000/auth/forgot-password",
        { email }
      );

      Swal.close();

      Swal.fire({
        icon: "success",
        title: "OTP Sent",
        text: res.data.message,
        timer: 1500,
        showConfirmButton: false,
      });

      // 🔥 MOVE TO OTP PAGE
      navigate("/otp", {
        state: {
          type: "forgot",
          email: email,
        },
      });
    } catch (error) {
      Swal.close();

      Swal.fire({
        icon: "error",
        title: "Failed",
        text:
          error.response?.data?.message ||
          "Failed to send OTP",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* LEFT SIDE */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-6">
        <div className="w-full max-w-md bg-gray-100 rounded-2xl p-8">
          <div className="text-center mb-6">
            <h1 className="text-5xl font-bold text-black">
              Forgot Password
            </h1>

            <p className="mt-2 text-gray-600">
              Enter your email to reset password
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white text-black border focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-[1.02] transition disabled:opacity-50"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>

            <p className="text-center text-sm text-gray-600">
              Back to{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-sky-500 cursor-pointer hover:underline"
              >
                Login
              </span>
            </p>
          </form>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="hidden md:flex w-1/2 items-center justify-center bg-gradient-to-br relative overflow-hidden">
        <img
          src="./forgot.png"
          alt="forgot password"
          className="w-[75%] drop-shadow-2xl"
        />
      </div>
    </div>
  );
};

export default ForgotPassword;