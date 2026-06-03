import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex bg-linear-to-br from-slate-100 via-blue-50 to-indigo-100">
      {/* Sidebar */}
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Main Content */}
      <div
        className={`min-h-screen w-full p-6 transition-all duration-300 ease-in-out
        ${collapsed ? "ml-20" : "ml-64"}`}
      >
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 min-h-[calc(100vh-3rem)]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;