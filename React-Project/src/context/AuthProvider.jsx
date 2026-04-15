import React, { createContext, useState } from "react";
import { getLocalStorage } from "../utils/localStorage";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);

    const data = getLocalStorage()
    console.log(data);
    
  return (
    <div>
      <AuthContext.Provider value={"Henil"}>{children}</AuthContext.Provider>
    </div>
  );
};

export default AuthProvider;
