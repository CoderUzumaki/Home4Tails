import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/database.js";
import morgan from "morgan";

// Initializing Express
const app = express();
const PORT = process.env.PORT || 5000;

// Connecting to DB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/pets", petRoutes);
app.use("/api/users", userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Server Error',
        error: process.env.NODE_ENV === 'development' ? err.message : {}
    });
  });

// Starting the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
