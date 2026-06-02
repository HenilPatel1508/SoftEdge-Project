import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const OtpVerify = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // safe email handling
  const email = location.state?.email || "";
  const type = location.state?.type || "register";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef([]);
  const [resendLoading, setResendLoading] = useState(false);

  // resend timer (UI same, only logic fix)
  const [timeLeft, setTimeLeft] = useState(30);
  const [resendDisabled, setResendDisabled] = useState(true);

  // 🔥 redirect if email missing
  useEffect(() => {
    if (!email) {
      navigate("/register");
    }
  }, [email]);

  // timer logic
  useEffect(() => {
    if (timeLeft <= 0) {
      setResendDisabled(false);
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const handleResendOtp = async () => {
    if (resendDisabled || !email) return;

    try {
      setResendLoading(true);
      setResendDisabled(true);
      setTimeLeft(30);

      const res = await axios.post(
        "http://localhost:5000/auth/resend-otp",
        { email }
      );

      alert(res.data.message);
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to resend OTP");
    } finally {
      setResendLoading(false);
    }
  };

  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalOtp = otp.join("");

    if (!email) {
      return alert("Email missing. Please register again.");
    }

    if (finalOtp.length !== 6) {
      return alert("Enter valid 6-digit OTP");
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/auth/verify-otp",
        {
          email,
          otp: finalOtp,
        }
      );

      alert(res.data.message);

      if (type === "register") {
        navigate("/login");
      } else if (type === "forgot") {
        navigate("/reset-password", {
          state: { email },
        });
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "OTP Verification Failed");
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* LEFT SIDE */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-6">
        <div className="w-full max-w-md bg-white/10 rounded-2xl p-8">

          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-black">Verify OTP</h1>
            <p className="text-black mt-2">
              Enter the 6-digit code sent to your email
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="flex justify-between gap-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputsRef.current[index] = el)}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 h-14 text-center text-xl font-bold rounded-xl bg-white text-black border focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ))}
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-[1.02] transition"
            >
              Verify OTP
            </button>

            <p className="text-center text-sm text-slate-600">
              Didn’t receive OTP?{" "}
              <span
                onClick={handleResendOtp}
                className="text-sky-500 cursor-pointer hover:underline"
              >
                {resendLoading ? "Sending..." : `Resend OTP (${timeLeft}s)`}
              </span>
            </p>

          </form>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="hidden md:flex w-1/2 items-center justify-center bg-gradient-to-br">
        <img
          src="./otp-removebg-preview.png"
          alt="otp verification"
          className="w-[70%] drop-shadow-2xl"
        />
      </div>

    </div>
  );
};

export default OtpVerify;