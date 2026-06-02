import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ❗ Email check
    if (!email) {
      return Swal.fire({
        icon: "error",
        title: "Invalid Access",
        text: "Please restart forgot password flow",
      }).then(() => navigate("/forgot-password"));
    }

    if (!formData.password || !formData.confirmPassword) {
      return Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please fill all fields",
      });
    }

    if (formData.password !== formData.confirmPassword) {
      return Swal.fire({
        icon: "error",
        title: "Mismatch",
        text: "Passwords do not match",
      });
    }

    try {
      setLoading(true);

      Swal.fire({
        title: "Updating Password...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      const res = await axios.post(
        "http://localhost:5000/auth/reset-password",
        {
          email,
          newPassword: formData.password,
        }
      );

      Swal.close();

      Swal.fire({
        icon: "success",
        title: "Success",
        text: res.data.message,
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/login");
    } catch (error) {
      Swal.close();

      Swal.fire({
        icon: "error",
        title: "Reset Failed",
        text:
          error.response?.data?.message ||
          "Password reset failed",
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
            <h1 className="text-4xl font-bold text-black">
              Reset Password
            </h1>

            <p className="text-gray-600 mt-2">
              Create a new secure password
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="password"
              name="password"
              placeholder="New Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-white text-black border"
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-white text-black border"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-[1.02] transition disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update Password"}
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
      <div className="hidden md:flex w-1/2 items-center justify-center bg-white-100">
        <img
          src="./reset-removebg-preview.png"
          alt="reset password"
          className="w-[70%]"
        />
      </div>
    </div>
  );
};

export default ResetPassword;