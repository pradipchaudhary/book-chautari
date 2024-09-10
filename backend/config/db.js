import mongoose from "mongoose";
import { DB_URL } from "./config.js";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(DB_URL);
        console.log("MongoDB connected...");
        // console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log("Database can't connect");
        process.exit(0);
    }
};

export default connectDB;
