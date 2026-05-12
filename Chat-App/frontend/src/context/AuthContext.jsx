import {
  createContext,
  useState,
} from "react";

import axios from "axios";

export const AuthContext =
  createContext();

const API =
  "http://localhost:5000/api/auth";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (formData) => {

  const res = await axios.post(
    "http://localhost:5000/api/auth/login",
    formData
  );

  console.log("LOGIN RESPONSE:", res.data);

  // ✅ store correct user
  localStorage.setItem(
    "user",
    JSON.stringify(res.data.user)
  );

  localStorage.setItem(
    "token",
    res.data.token
  );

  setUser(res.data.user);
  console.log(JSON.parse(localStorage.getItem("user")));
};

  const register = async (
    formData
  ) => {
    await axios.post(
      `${API}/register`,
      formData
    );
  };

  const logout = () => {
    localStorage.clear();

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;