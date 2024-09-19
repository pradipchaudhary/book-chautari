import mongoose from "mongoose";

const userModel = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Username required"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
        },
        role: {
            type: String,
            enum: ["customer", "author", "admin"],
            default: "customer",
            required: true,
        },
    },
    { timestamp: true }
);

const User = mongoose.model("User", userModel);

export default User;
