import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const UserInfo = () => {
  const navigate = useNavigate()
  return (
    <div className="pt-5 min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
          <div className="flex justify-between gap-10">
            <Button onClick={()=>navigate(-1)}><ArrowLeft/></Button>
            <h1 className="font-bold mb-7 text-2xl text-gray-900">Update Profile</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
