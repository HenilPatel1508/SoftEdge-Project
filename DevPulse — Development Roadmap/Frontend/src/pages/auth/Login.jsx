// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const Login = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   // 🔥 JWT LOGIN HANDLER
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.post(
//         "http://localhost:5000/auth/login",
//         formData,
//       );

//       alert(res.data.message);

//       // 🔥 STORE JWT TOKEN
//       localStorage.setItem("token", res.data.token);

//       // store user info
//       localStorage.setItem("user", JSON.stringify(res.data.user));

//       // optional: axios default header set (important)
//       axios.defaults.headers.common["Authorization"] =
//         `Bearer ${res.data.token}`;

//       navigate("/dashboard");
//     } catch (error) {
//       console.log(error);

//       alert(error.response?.data?.message || "Login failed");
//     }
//   };

//   const handleFaceVerify = async () => {
//   const image = webcamRef.current.getScreenshot();

//   if (!image) return alert("Camera error");

//   try {
//     const res = await axios.post(
//       "http://localhost:5000/auth/face-login",
//       {
//         email: formData.email, // important
//         image,
//       }
//     );

//     localStorage.setItem("token", res.data.token);
//     localStorage.setItem("user", JSON.stringify(res.data.user));

//     axios.defaults.headers.common[
//       "Authorization"
//     ] = `Bearer ${res.data.token}`;

//     setShowFaceModal(false);
//     navigate("/dashboard");

//   } catch (err) {
//     alert("Face verification failed");
//   }
// };

//   return (
//     <div className="min-h-screen flex">
//       {/* LEFT SIDE */}
//       <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-6">
//         <div className="w-full max-w-md bg-gray-100 rounded-2xl p-8 ">
//           <div className="text-center mb-6">
//             <h1 className="font-bold text-black text-5xl">DevPulse</h1>

//             <p className="text-black text-xl mt-1">Welcome back developer 👋</p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             {/* Email */}
//             <input
//               type="email"
//               name="email"
//               placeholder="Enter your email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full px-4 py-3 rounded-xl bg-white text-black placeholder-gray-500 border focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />

//             {/* Password */}
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 placeholder="Enter your password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 rounded-xl bg-white text-black placeholder-gray-500 border focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />

//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-3 text-sm text-gray-500"
//               >
//                 {showPassword ? "Hide" : "Show"}
//               </button>
//             </div>

//             {/* Forgot Password */}
//             <div className="text-right">
//               <span
//                 className="text-sm text-sky-400 cursor-pointer hover:underline"
//                 onClick={() => navigate("/forgot-password")}
//               >
//                 Forgot Password?
//               </span>
//             </div>

//             {/* Login Button */}
//             <button
//               type="submit"
//               className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-[1.02] transition"
//             >
//               Login
//             </button>

//             {/* Footer */}
//             <p className="text-center text-md text-black">
//               Don’t have an account?{" "}
//               <span
//                 onClick={() => navigate("/register")}
//                 className="text-sky-400 cursor-pointer hover:underline"
//               >
//                 Register
//               </span>
//             </p>

//             <div className="text-center mt-3">
//               <button
//                 type="button"
//                 onClick={() => setShowFaceModal(true)}
//                               className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-[1.02] transition"
//               >
//                 Login with Face Authentication
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>

//       {/* RIGHT SIDE */}
//       <div className="hidden md:flex w-1/2 items-center justify-center bg-gradient-to-br">
//         <img
//           src="https://illustrations.popsy.co/gray/web-design.svg"
//           alt="developer"
//           className="w-[70%] drop-shadow-2xl"
//         />
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Webcam from "react-webcam";
import Swal from "sweetalert2";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showFaceModal, setShowFaceModal] = useState(false);
  const navigate = useNavigate();
  const webcamRef = useRef(null);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // 🔥 NORMAL LOGIN
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      Swal.fire({
        title: "Logging in...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      const res = await axios.post(
        "http://localhost:5000/auth/login",
        formData,
      );

      Swal.close();

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: res.data.message,
        timer: 1500,
        showConfirmButton: false,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/dashboard");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text:
          error.response?.data?.message ||
          error.message ||
          "Something went wrong",
      });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: "http://localhost:5173/dashboard",
        },
      });

      if (error) {
        Swal.fire({
          icon: "error",
          title: "Google Login Failed",
          text: error.message,
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message,
      });
    }
  };

  // 🔥 FACE LOGIN
  const handleFaceVerify = async () => {
    const image = webcamRef.current?.getScreenshot();

    if (!image) {
      return Swal.fire({
        icon: "error",
        title: "Camera Error",
        text: "Unable to capture image",
      });
    }

    try {
      Swal.fire({
        title: "Verifying Face...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      const res = await axios.post("http://localhost:5000/auth/face-login", {
        email: formData.email,
        image,
      });

      Swal.close();

      Swal.fire({
        icon: "success",
        title: "Face Verified",
        text: "Login Successful",
        timer: 1500,
        showConfirmButton: false,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      axios.defaults.headers.common["Authorization"] =
        `Bearer ${res.data.token}`;

      setShowFaceModal(false);
      navigate("/dashboard");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Face Verification Failed",
        text: err.response?.data?.message || "Try again",
      });
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* LEFT SIDE */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-6">
        <div className="w-full max-w-md bg-gray-100 rounded-2xl p-8">
          <div className="text-center mb-6">
            <h1 className="font-bold text-black text-5xl">DevPulse</h1>
            <p className="text-black text-xl mt-1">Welcome back developer 👋</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-white text-black border"
            />

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-white text-black border"
            />

            <button
              type="submit"
              className="w-full py-3 rounded-xl text-white bg-blue-600"
            >
              Login
            </button>

            <button
              type="button"
              disabled={!formData.email}
              onClick={() => setShowFaceModal(true)}
              className="w-full py-3 rounded-xl mt-2 bg-black text-white"
            >
              Login with Face Auth
            </button>
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full py-3 rounded-xl mt-3 bg-red-500 text-white"
            >
              Continue with Google
            </button>
          </form>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="hidden md:flex w-1/2 items-center justify-center">
        <img
          src="https://illustrations.popsy.co/gray/web-design.svg"
          className="w-[70%]"
        />
      </div>

      {/* FACE MODAL */}
      {showFaceModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-[350px] text-center">
            <h2 className="text-xl font-bold mb-3">Face Authentication</h2>

            <Webcam
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="rounded-xl w-full"
            />

            <div className="flex gap-2 mt-4">
              <button
                onClick={handleFaceVerify}
                className="flex-1 bg-green-600 text-white py-2 rounded"
              >
                Verify
              </button>

              <button
                onClick={() => setShowFaceModal(false)}
                className="flex-1 bg-red-500 text-white py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
