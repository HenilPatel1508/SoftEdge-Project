import { Routes, Route } from "react-router-dom";

// import Home from "../pages/Home";
import Login from "../pages/auth/Login.jsx";
import Register from "../pages/auth/Register.jsx";
import OtpVerify from "../pages/auth/verify-otp.jsx";
import Forgotpassword from "../pages/auth/Forgot-password.jsx";
import ResetPassword from "../pages/auth/Reset-password.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import MainLayout from "../layout/MainLayout.jsx";
import Profile from "../pages/Profile.jsx";
// import NotFound from "../pages/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<Home />} /> */} 

      <Route path="/login" element={<Login />} />
      <Route path="/otp" element={<OtpVerify />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<Forgotpassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      {/* <Route path="/dashboard" element={<Dashboard />} />   */}

      <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          {/* baki pages here */}
        </Route>
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
};

export default AppRoutes;