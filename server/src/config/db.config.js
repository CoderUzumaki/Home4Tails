import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Database Connection Successful:-
            DB_Host: ${connectionInstance.connection.host}
            DB_Name: ${connectionInstance.connection.name}
        `);
    } catch (error) {
        console.error("Database Connection Failed:-\n", error);
        process.exit(1);
    };
};

export default connectDB;
