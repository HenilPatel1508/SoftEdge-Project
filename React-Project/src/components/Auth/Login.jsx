import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const SubmitHandler = (e) => {
    e.preventDefault();
    console.log("Email is : " + email + " Password is : " + password);

    setEmail("");
    setPassword("");
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center">
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
            className="text-black bg-transparent outline-none border-2 border-emerald-600 rounded-full px-5 py-3 text-xl placeholder:text-black"
            type="email"
            placeholder="Enter your Email : "
          />
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
            className="text-black bg-transparent outline-none border-2 border-emerald-600 rounded-full px-5 py-3 text-xl placeholder:text-black mt-4"
            type="password"
            placeholder="Enter your Password : "
          />
          <button className="bg-emerald-500 border-2 hover:bg-emerald-700 text-white mt-5 py-2 px-4 rounded-full">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
