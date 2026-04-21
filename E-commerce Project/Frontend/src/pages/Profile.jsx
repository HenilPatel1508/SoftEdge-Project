import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@base-ui/react";

const Profile = () => {
  return (
    <div className="pt-25 min-h-screen ">
      <Tabs defaultValue="profile" className="w-100">
        <TabsList>
          <TabsTrigger value="profile">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>
                Make changes to your account here.click save when you&apos;re
                done.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-5">
              <div className="grid gap-3">
                <label htmlFor="tabs-demo-name">Name</label>
                <Input id="tabs-demo-name" defaultValue="Pedro Durate" />
              </div>
              <div className="grid gap-3">
                <label htmlFor="tabs-demo-name">UserName</label>
                <Input id="tabs-demo-name" defaultValue="@Padrorate" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
