import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { PORT, HOST } from "./config/config.js";
import connectDB from "./config/db.js";
import bookRoutes from "./routes/bookRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Static folder to serve public files
app.use(express.static("public"));

// Databse connection
connectDB();

app.get("/", (req, res) => {
    res.send("Home route...");
});

// Routers
app.use("/api/user", userRoutes);
app.use("/api/books", bookRoutes);

app.use(notFound);
app.use(errorHandler);

// Server Listen
app.listen(PORT, () => {
    console.log(`Server running ${HOST}:${PORT}`);
});
