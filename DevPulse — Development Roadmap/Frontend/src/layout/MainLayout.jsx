import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex">
      
      {/* Sidebar */}
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Main Content (responsive width) */}
      <div
        className={`min-h-screen bg-gray-100 w-full p-6 transition-all duration-300
        ${collapsed ? "ml-20" : "ml-64"}`}
      >
        <Outlet />
      </div>

    </div>
  );
};

export default MainLayout;