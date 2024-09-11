To build the backend for **Book Chautari E-Commerce Hub** using **Node.js** and **MongoDB**, you'll need to set up an environment, structure the project, and write the necessary code. Below is a step-by-step guide to creating the app with basic functionality.

### **Step-by-Step Guide**

#### **1. Set Up the Environment**

1. **Install Node.js and MongoDB**:

    - Install **Node.js** from the [official website](https://nodejs.org/).
    - Install **MongoDB** from the [official website](https://www.mongodb.com/).

2. **Create a New Project**:

    - Open your terminal and create a directory for your project:
        ```bash
        mkdir book-chautari-backend
        cd book-chautari-backend
        ```

3. **Initialize the Node Project**:

    - Initialize a new Node.js project with `npm`:
        ```bash
        npm init -y
        ```

4. **Install Required Dependencies**:

    - Install necessary libraries:

        ```bash
        npm install express mongoose bcryptjs jsonwebtoken dotenv cors
        npm install --save-dev nodemon
        ```

    - **Libraries used**:
        - **Express**: Web framework for Node.js.
        - **Mongoose**: MongoDB object modeling tool.
        - **bcryptjs**: For hashing passwords.
        - **jsonwebtoken (JWT)**: For user authentication.
        - **dotenv**: For environment variables.
        - **cors**: To handle cross-origin requests.

5. **Set Up Folder Structure**:

    - Create the necessary files and folders:
        ```bash
        mkdir config controllers models routes middleware
        touch server.js config/db.js
        ```

    Your folder structure should look like this:

    ```
    book-chautari-backend/
    ├── config/
    │   └── db.js
    ├── controllers/
    ├── models/
    ├── routes/
    ├── middleware/
    ├── .env
    ├── package.json
    └── server.js
    ```

---

### **2. Set Up MongoDB Connection**

In `config/db.js`, set up the MongoDB connection using **Mongoose**.

```js
// config/db.js
const mongoose = require("mongoose");
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected...");
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};
module.exports = connectDB;
```

In your `.env` file, add your MongoDB connection string:

```bash
MONGO_URI=mongodb://localhost:27017/book-chautari
```

---

### **3. Create Models**

#### **User Model**

```js
// models/User.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ["customer", "author", "admin"],
        default: "customer",
    },
    createdAt: { type: Date, default: Date.now },
});

// Password hashing
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

module.exports = mongoose.model("User", userSchema);
```

#### **Book Model**

```js
// models/Book.js
const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    type: { type: String, enum: ["physical", "digital"], required: true },
    category: { type: String, required: true },
    coverImage: { type: String },
    digitalFile: { type: String },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Book", bookSchema);
```

#### **Order Model**

```js
// models/Order.js
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
    paymentDetails: { type: Object, required: true },
    deliveryAddress: { type: Object },
    status: { type: String, default: "processing" },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
```

---

### **4. Create Controllers**

#### **User Controller**

```js
// controllers/userController.js
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: "User already exists" });
        }

        user = new User({ name, email, password, role });
        await user.save();

        const payload = { userId: user.id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ msg: "Invalid credentials" });

        const payload = { userId: user.id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};
```

---

### **5. Create Routes**

#### **User Routes**

```js
// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/userController");

router.post("/signup", registerUser);
router.post("/login", loginUser);

module.exports = router;
```

---

### **6. Set Up Middleware**

#### **Auth Middleware**

```js
// middleware/auth.js
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    const token = req.header("x-auth-token");
    if (!token)
        return res.status(401).json({ msg: "No token, authorization denied" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.userId;
        next();
    } catch (err) {
        res.status(401).json({ msg: "Token is not valid" });
    }
};
```

---

### **7. Create the Main App (server.js)**

```js
// server.js
const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const app = express();
app.use(cors());
app.use(express.json({ extended: false }));

// Routes
app.use("/api/users", require("./routes/userRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
```

---

### **8. Run the App**

1. Add scripts to `package.json` for development:

    ```json
    "scripts": {
      "start": "node server.js",
      "dev": "nodemon server.js"
    }
    ```

2. Run the app in development mode:
    ```bash
    npm run dev
    ```

The backend is now up and running! You can expand it by adding more controllers, models, and routes based on the requirements (Books, Orders, etc.).

---

This is a basic setup that you can build upon. Let me know if you need more specific features or advanced configurations!
