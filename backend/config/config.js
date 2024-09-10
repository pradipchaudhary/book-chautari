import dotenv from "dotenv";
dotenv.config();

// Define variables with fallback values
export const PORT = process.env.PORT || 3000; // Named export
export const HOST = process.env.HOST || "localhost"; // Named export
export const DB_URL = process.env.DB_URL || "mongodb://localhost:27017/mydb"; // Named export
