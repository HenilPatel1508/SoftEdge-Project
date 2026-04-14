import React, { useState } from "react";

const Login = ({handleLogin}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const SubmitHandler = (e) => {
    e.preventDefault();
    handleLogin(email, password);
    setEmail("");
    setPassword("");
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-[#1c1c1c]">
      <div className="border-2 border-emerald-500 rounded-xl p-20">
        <form
          onSubmit={(e) => {
            SubmitHandler(e);
          }}
          className="flex flex-col items-center justify-center"
        >
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
            className="text-white bg-transparent outline-none border-2 border-emerald-600 rounded-full px-5 py-3 text-xl placeholder:text-white hover:border-cyan-500"
            type="email"
            placeholder="Enter your Email : "
          />
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
            className="text-white bg-transparent outline-none border-2 border-emerald-600 rounded-full px-5 py-3 text-xl placeholder:text-white mt-4 hover:border-cyan-500"
            type="password"
            placeholder="Enter your Password : "
          />
          <button className="bg-emerald-500 border-2  hover:bg-emerald-700 hover:border-b-cyan-900 text-white mt-5 py-2 px-10 rounded-full">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
