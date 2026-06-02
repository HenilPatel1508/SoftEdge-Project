import React, { createContext, useContext, useState } from "react";

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("blue");

  const themeColors = {
    blue: "bg-blue-600",
    purple: "bg-purple-600",
    green: "bg-green-600",
    red: "bg-red-600",
    orange: "bg-orange-600",
    pink: "bg-pink-600",
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themeColors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }
  return context;
};