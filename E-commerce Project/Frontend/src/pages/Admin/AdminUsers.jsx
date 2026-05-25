import { Input } from "@/components/ui/input";
import axios from "axios";
import { Eye, Search, Users } from "lucide-react";
import React, { useEffect, useState } from "react";
import UserLogo from "../../assets/user.jpg";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const getAllUsers = async () => {
    const accessToken = localStorage.getItem("accessToken");

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_URL}/api/v1/user/all-user`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (res.data.success) {
        setUsers(res.data.users);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const filteredUsers = users
    .filter((user) => user.role !== "admin")
    .filter(
      (user) =>
        `${user.firstname} ${user.lastname}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="pl-[350px] pr-10 py-8 min-h-screen bg-gradient-to-br from-slate-100 via-pink-50 to-purple-100">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
          User Management
        </h1>
        <p className="text-gray-600 text-lg mt-2">
          View and manage registered users
        </p>
      </div>

      {/* Search */}
      <div className="relative w-full max-w-md mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-500 w-5 h-5" />
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search users..."
          className="pl-12 h-14 rounded-2xl border border-white/30 bg-white/40 backdrop-blur-xl shadow-lg placeholder:text-gray-500"
        />
      </div>

      {/* User Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredUsers.map((user, index) => (
          <div
            key={index}
            className="backdrop-blur-xl bg-white/40 border border-white/30 shadow-xl rounded-3xl p-6 hover:scale-105 transition-all duration-300"
          >
            {/* User Info */}
            <div className="flex items-center gap-4">
              <img
                src={user?.profilePic || UserLogo}
                alt=""
                className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
              />

              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  {user?.firstname} {user?.lastname}
                </h2>
                <p className="text-gray-600 text-sm">{user?.email}</p>

                <div className="flex items-center gap-2 mt-2 text-pink-600">
                  <Users size={16} />
                  <span className="text-sm font-medium">Customer</span>
                </div>
              </div>
            </div>

            {/* Button */}
            <Button
              onClick={() =>
                navigate(`/dashboard/users/orders/${user?._id}`)
              }
              className="w-full mt-6 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white shadow-lg cursor-pointer"
            >
              <Eye className="mr-2" />
              Show Orders
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminUsers;