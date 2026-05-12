import {
  useState,
  useContext,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

const Login = () => {

  const navigate = useNavigate();

  const { login } =
    useContext(AuthContext);

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await login(formData);

      navigate("/chat");

    } catch (error) {

      alert(
        error.response.data.message
      );

    }

  };

  return (
    <div className="h-screen bg-[#111b21] flex items-center justify-center">

      <div className="bg-[#202c33] p-10 rounded-2xl w-[400px] shadow-2xl">

        <h1 className="text-4xl font-bold text-center text-green-500 mb-2">
          Chat-App
        </h1>

        <p className="text-center text-gray-400 mb-8">
          Login to continue chatting
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="email"
            placeholder="Enter Email"
            className="w-full bg-[#2a3942] text-white px-4 py-3 rounded-lg outline-none"
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value,
              })
            }
          />

          <input
            type="password"
            placeholder="Enter Password"
            className="w-full bg-[#2a3942] text-white px-4 py-3 rounded-lg outline-none"
            onChange={(e) =>
              setFormData({
                ...formData,
                password:
                  e.target.value,
              })
            }
          />

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold transition"
          >
            Login
          </button>

        </form>

        <p className="text-gray-400 text-center mt-6">

          Don't have an account?{" "}

          <Link
            to="/register"
            className="text-green-500"
          >
            Register
          </Link>

        </p>

      </div>

    </div>
  );
};

export default Login;