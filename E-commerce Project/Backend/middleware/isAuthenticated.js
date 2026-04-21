import { json } from "express";
import Jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(400).json({
        success: false,
        message: "Auth token is missing or invalid",
      });
    }
    const token = authHeader.split(" ")[1];
    let decoded;
    try {
      decoded = Jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(400).json({
          success: false,
          message: "The Registration token has expired",
        });
      }
      return res.status(400).json({
        success: false,
        message: "Access Token is missing or invalid",
      });
    }
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User Not Found",
      });
    }
    req.user = user;
    req.id = user._id;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const isAdmin = async (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({
      message: "Access Denied : Admin can only access",
    });
  }
};
