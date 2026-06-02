import express from "express";
import { register, verifyOtp,login,forgotPassword ,resetPassword,resendOtp, faceLogin} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/verify-otp", verifyOtp);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/resend-otp", resendOtp);

// routes/auth.routes.js
router.post("/face-login", faceLogin);

export default router;