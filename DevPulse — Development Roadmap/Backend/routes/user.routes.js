import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import {
  getProfile,
  updateProfile,
} from "../controllers/user.controller.js";

const router = express.Router();

/**
 * 🔥 GET USER PROFILE
 */
router.get("/profile", verifyToken, getProfile);

/**
 * 🔥 UPDATE USER PROFILE
 */
router.put("/profile", verifyToken, updateProfile);

export default router;