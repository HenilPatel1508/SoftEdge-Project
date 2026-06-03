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
import Productivity from "../pages/Productivity.jsx";
import Health from "../pages/Health.jsx";
import Github from "../pages/Github.jsx";
import Projects from "../pages/Projects.jsx";
import Utilites from "../pages/Utilites.jsx";
import Analitics from "../pages/Analitics.jsx";
import Settings from "../pages/Settings.jsx";
import Notification from "../pages/Notification.jsx";
import AI_assist from "../pages/AI-assist.jsx";

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
          <Route path="/productivity" element={<Productivity />} />
          <Route path="/health" element={<Health />} />
          <Route path="/notifications" element={<Notification />} />
          <Route path="/ai" element={<AI_assist />} />
          <Route path="/github" element={<Github />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/utilities" element={<Utilites />} />
          <Route path="/analytics" element={<Analitics />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Route>


    </Routes>
  );
};

export default AppRoutes;