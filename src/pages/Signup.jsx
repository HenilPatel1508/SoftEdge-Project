import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";

const Signup = () => {
  const [showPassword,setShowPassword]= useState(false)
  return (
    <div className="flex justify-center items-center min-h-screen bg-amber-100">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Create your account</CardTitle>
          <CardDescription>
            Enter your Details to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="firstname">First Name</Label>
                  <Input
                    id="firstname"
                    name="firstname"
                    type="text"
                    placeholder="John"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="firstname">Last Name</Label>
                  <Input
                    id="lastname"
                    name="lastname"
                    type="text"
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-5">
                <div className="flex items-center gap-3">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                    id="password"  
                    name="password"
                    placeholder="Create a Password"
                    type={showPassword?"text":"password"}
                    required />
                    {
                      showPassword?<EyeOff onClick={()=>{setShowPassword(false)}} className="w-5 h-5 text-gray-700 absolute right-5 bottom-2"/>:<Eye onClick={()=>{setShowPassword(true)}}  className="w-5 h-5 text-gray-700 absolute right-5 bottom-2"/>
                    }
                  </div>
                </div>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signup;
