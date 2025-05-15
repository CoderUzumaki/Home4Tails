import dotenv from "dotenv";
dotenv.config();

import connectDB from "./config/db.config.js";
import { app } from "./app.js";
const PORT = process.env.PORT || 5000;

// Connecting to DB
connectDB()
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
})
.catch((error) => {
    console.error("MongoDB Connection Failed! :", error);
})

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: "Server Error",
        error: process.env.NODE_ENV === "development" ? err.message : {}
    });
  });
