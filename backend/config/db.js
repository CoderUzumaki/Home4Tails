import mongoose from "mongoose";
import dotenv from "dotenv";


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
    } catch (error) {
        console.error('MongoDB connection FAIL');
    }
}

export default connectDB;
