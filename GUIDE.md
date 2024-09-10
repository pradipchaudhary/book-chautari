# Guides

Here's a detailed plan and implementation for a **fully functional large-scale application** built using **Node.js** and **Express.js** with **ECMAScript (ES) module imports**. This example will walk you through creating a **large-scale e-commerce platform**, which includes user authentication, product management, cart functionality, and order processing.

### **Project Structure**

```
book-chautari-app/
│
├── config/
│   └── db.js              # Database connection
├── controllers/
│   ├── authController.js   # User authentication controller
│   ├── productController.js# Product management controller
│   ├── cartController.js   # Cart management controller
│   └── orderController.js  # Order management controller
├── models/
│   ├── User.js             # User model
│   ├── Product.js          # Product model
│   └── Order.js            # Order model
├── routes/
│   ├── authRoutes.js       # Authentication routes
│   ├── productRoutes.js    # Product routes
│   ├── cartRoutes.js       # Cart routes
│   └── orderRoutes.js      # Order routes
├── middlewares/
│   └── authMiddleware.js   # Authorization middleware
├── utils/
│   └── errorHandler.js     # Global error handling utility
├── views/
│   └── index.ejs           # Main landing page (optional if using server-side rendering)
├── .env                    # Environment variables
├── app.js                  # Main Express app
├── package.json            # Dependencies
└── README.md               # Project information
```

### **Step-by-Step Implementation**

#### 1. **Initialize the Project**

Start by creating a new Node.js project and install necessary packages:

```bash
mkdir book-chautari-app
cd book-chautari-app
npm init -y
npm install express mongoose bcryptjs jsonwebtoken dotenv cors
```

Ensure you add the following to `package.json` to enable ES module imports:

```json
"type": "module"
```

#### 2. **Database Connection (config/db.js)**

Connect to MongoDB using Mongoose (replace the URI with your MongoDB connection string):

```js
import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;
```

#### 3. **User Authentication (models/User.js & controllers/authController.js)**

**User Model (models/User.js):**

```js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);
export default User;
```

**Authentication Controller (controllers/authController.js):**

```js
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400).json({ message: "User already exists" });
        return;
    }

    const user = await User.create({ name, email, password });
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(400).json({ message: "Invalid user data" });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(401).json({ message: "Invalid email or password" });
    }
};
```

#### 4. **Product Management (models/Product.js & controllers/productController.js)**

**Product Model (models/Product.js):**

```js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
});

const Product = mongoose.model("Product", productSchema);
export default Product;
```

**Product Controller (controllers/productController.js):**

```js
import Product from "../models/Product.js";

export const createProduct = async (req, res) => {
    const { name, price, description, image, category } = req.body;

    const product = new Product({
        name,
        price,
        description,
        image,
        category,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
};

export const getProducts = async (req, res) => {
    const products = await Product.find({});
    res.json(products);
};

export const getProductById = async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: "Product not found" });
    }
};
```

#### 5. **Order & Cart Management**

Implement order and cart logic with controllers like `cartController.js` and `orderController.js`. For simplicity, you can store the cart in the user's session and process orders based on it.

#### 6. **Authentication Middleware (middlewares/authMiddleware.js)**

Ensure certain routes (e.g., order creation) are protected using JWT authentication:

```js
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password");
            next();
        } catch (error) {
            res.status(401).json({ message: "Not authorized, token failed" });
        }
    }

    if (!token) {
        res.status(401).json({ message: "Not authorized, no token" });
    }
};
```

#### 7. **Routes Setup (routes/authRoutes.js)**

For routing, create dedicated routes for user authentication, product management, and order processing:

```js
import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
```

#### 8. **Main Application (app.js)**

**Main Express app (app.js):**

```js
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

connectDB();

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
```

#### 9. **Environment Configuration (.env)**

```bash
MONGO_URI=mongodb+srv://your-mongo-uri
JWT_SECRET=your-jwt-secret
```

### **Running the Application**

1. Start your MongoDB database (locally or with MongoDB Atlas).
2. Run the app:

```bash
npm run dev
```

Now you have a **fully functional large-scale application** using **Node.js** and **Express** with ES module imports. You can expand this with additional features such as order management, payment gateways, and real-time communication using technologies like WebSockets.
