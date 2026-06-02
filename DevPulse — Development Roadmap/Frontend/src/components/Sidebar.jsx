import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiUser,
  FiZap,
  FiHeart,
  FiBell,
  FiCpu,
  FiGithub,
  FiFolder,
  FiTool,
  FiBarChart2,
  FiSettings,
  FiMenu,
} from "react-icons/fi";

const Sidebar = ({ collapsed, setCollapsed }) => {

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 transform hover:scale-[1.02]
    ${isActive ? "bg-cyan-700 text-white shadow-md" : "hover:bg-cyan-800 text-gray-200"}`;

  return (
    <div
      className={`h-screen fixed left-0 top-0 bg-cyan-900 text-white p-4 overflow-y-auto transition-all duration-300
      ${collapsed ? "w-20" : "w-64"}`}
    >
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        {!collapsed && <h1 className="text-3xl font-bold">DevPulse</h1>}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 hover:bg-cyan-800 rounded-lg transition"
        >
          <FiMenu />
        </button>
      </div>

      {/* Links */}
      <nav className="flex flex-col font-bold text-xl gap-2">

        <NavLink to="/dashboard" className={linkClass}>
          <FiHome /> {!collapsed && "Dashboard"}
        </NavLink>

        <NavLink to="/profile" className={linkClass}>
          <FiUser /> {!collapsed && "Profile"}
        </NavLink>

        <NavLink to="/productivity" className={linkClass}>
          <FiZap /> {!collapsed && "Productivity"}
        </NavLink>

        <NavLink to="/health" className={linkClass}>
          <FiHeart /> {!collapsed && "Health"}
        </NavLink>

        <NavLink to="/notifications" className={linkClass}>
          <FiBell /> {!collapsed && "Notifications"}
        </NavLink>

        <NavLink to="/ai" className={linkClass}>
          <FiCpu /> {!collapsed && "AI Assistant"}
        </NavLink>

        <NavLink to="/github" className={linkClass}>
          <FiGithub /> {!collapsed && "GitHub"}
        </NavLink>

        <NavLink to="/projects" className={linkClass}>
          <FiFolder /> {!collapsed && "Projects"}
        </NavLink>

        <NavLink to="/utilities" className={linkClass}>
          <FiTool /> {!collapsed && "Utilities"}
        </NavLink>

        <NavLink to="/analytics" className={linkClass}>
          <FiBarChart2 /> {!collapsed && "Analytics"}
        </NavLink>

        <NavLink to="/settings" className={linkClass}>
          <FiSettings /> {!collapsed && "Settings"}
        </NavLink>

      </nav>
    </div>
  );
};

export default Sidebar;