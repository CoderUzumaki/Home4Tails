import express from "express";
import { registerUser, loginUser, logoutUser, getProfile } from "../controllers/auth.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Public Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected Routes
router.post("/logout", protect, logoutUser);
router.get("/profile", protect, getProfile);

export default router;
