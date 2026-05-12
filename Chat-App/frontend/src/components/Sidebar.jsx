import { useEffect, useState } from "react";
import axios from "axios";

const Sidebar = ({ selectedUser, setSelectedUser }) => {
  const [users, setUsers] = useState([]);

  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get("http://localhost:5000/api/users");

      const filtered = res.data.filter((u) => u._id !== currentUser._id);

      setUsers(filtered);
    };

    fetchUsers();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    window.location.href = "/";
  };

  return (
    <div className="w-[350px] h-screen bg-[#202c33] flex flex-col">
      {/* Header */}
      <div className="p-4 text-white font-bold text-xl border-b border-gray-700">
        Chats
      </div>

      {/* Users list */}
      <div className="flex-1 overflow-y-auto">
        {users.map((user) => (
          <div
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className="flex items-center gap-3 p-4 cursor-pointer hover:bg-[#2a3942]"
          >
            <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
              {user.name[0]}
            </div>

            <div className="text-white">{user.name}</div>
          </div>
        ))}
        <div className="p-3 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
