import { Input } from "@/components/ui/input";
import axios from "axios";
import { Edit, Eye, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
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
        },
      );
      if (res.data.success) {
        setUsers(res.data.users);
      }
    } catch (error) {
      console.error(error);
    }
  };
  console.log(users);

  const filteredUsers = users
    .filter((user) => user.role !== "admin")
    .filter(
      (user) =>
        `${user.firstname} ${user.lastname}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()),
    );

  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <div className="pl-87.5 py-20 pr-20 mx-auto px-4">
      <h1 className="text-4xl text-black font-bold">User Management</h1>
      <p className="text-xl text-black font-serif">
        View and Manage Registered User{" "}
      </p>
      <div className="flex relative w-65 mt-6">
        <Search className="absolute left-2 mt-1 w-6" />
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search User ..."
          className={
            "placeholder:text-black  placeholder:text-xl border-2 pl-10"
          }
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {filteredUsers.map((user, index) => {
          return (
            <div key={index} className="bg-pink-100 p-5 left-20 rounded-lg ">
              <div className="flex items-center gap-2">
                <img
                  src={user?.profilePic || UserLogo}
                  alt=""
                  className="rounded-full w-16 aspect-square object-cover"
                />
                <div>
                  <h1 className="font-semibold">
                    {user?.firstname}
                    {user?.lastname}
                  </h1>
                  <h2>{user?.email}</h2>
                </div>
              </div>
              <div className="flex gap-1 mt-3 justify-center">
                {/* <Button
                  onClick={() => navigate(`/dashboard/users/${user?._id}`)}
                  variant="outline"
                  className={"cursor-pointer"}
                >
                  <Edit />
                  Edit
                </Button> */}
                <Button
                  onClick={() =>
                    navigate(`/dashboard/users/orders/${user?._id}`)
                  }
                  className="cursor-pointer"
                >
                  <Eye />
                  Show Order
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminUsers;
