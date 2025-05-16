import express from "express";
import { registerUser, loginUser, logoutUser } from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

// Public Routes
router.post("/register", upload.fields([{ name: "avatar", maxCount: 1 }]), registerUser);
router.post("/login", loginUser);

// Protected Routes
router.post("/logout", verifyJWT, logoutUser);

export default router;
