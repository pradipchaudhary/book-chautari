import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// @desc    Create a new user
// @route   GET /api/user
// @access  Public

// JWT secret from environment variable
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export const createUser = async (req, res) => {
    const { name, email, password, role } = req.body;
    console.log(name, email, password, role);

    try {
        // Check if user already exists
        const exitUser = await User.findOne({ email });
        if (exitUser)
            return res.status(400).json({ message: "User already exists" });

        // Hash password
        const hashPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = new User({ name, email, password: hashPassword, role });
        await user.save();

        // Generate JWT
        const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
            expiresIn: "1h",
        });
        res.status(201).json({
            message: "User registered successfully",
            token,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// @desc    Login a user
// @route   GET /api/user
// @access  Public
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user)
            return res.status(400).json({ message: "Invalid credentials" });

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ message: "Invalid credentials" });

        // Generate JWT
        const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
            expiresIn: "1h",
        });

        res.status(200).json({ message: "Login successful", token });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// @desc    Get user profile
// @route   GET /api/users/profile/:id
// @access  Public
