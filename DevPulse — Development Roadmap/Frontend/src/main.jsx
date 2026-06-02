import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext"; // 👈 ADD THIS

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>   {/* 👈 FIRST WRAP AUTH */}
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);