import { Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login.jsx";
import Register from "../pages/auth/Register.jsx";
import OtpVerify from "../pages/auth/verify-otp.jsx";
import Forgotpassword from "../pages/auth/Forgot-password.jsx";
import ResetPassword from "../pages/auth/Reset-password.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import MainLayout from "../layout/MainLayout.jsx";
import Profile from "../pages/Profile.jsx";

import ProtectedRoute from "../components/ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      {/* AUTH ROUTES */}
      <Route path="/login" element={<Login />} />
      <Route path="/otp" element={<OtpVerify />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<Forgotpassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* PROTECTED ROUTES */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>


    </Routes>
  );
};

export default AppRoutes;