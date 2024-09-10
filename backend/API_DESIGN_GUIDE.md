# API Architecture

Designing a production-grade **RESTful API** for the **Book Chautari E-Commerce Hub** involves structuring the system into **Node.js** for the backend, **MongoDB** for the database, and **React.js** for the frontend. Below is a basic blueprint for the backend API structure and key components.

### **High-Level Architecture**

-   **Frontend**: React.js
-   **Backend**: Node.js with Express
-   **Database**: MongoDB (NoSQL)

### **API Design**

#### **Core Entities**

1. **Users** (Customers, Authors, Admin)
2. **Books** (Physical & Digital)
3. **Orders**
4. **Subscriptions** (Book Boxes)
5. **Categories** (Genres, Educational Resources)
6. **Authors** (Self-publishing, Profiles)
7. **Payments** (Transactions, Invoices)
8. **Events** (Workshops, Author Interactions)

---

### **1. Users API**

-   **Create User** (Sign Up)

    -   **POST /api/users/signup**
    -   Request Body:
        ```json
        {
            "name": "string",
            "email": "string",
            "password": "string",
            "role": "customer | author | admin"
        }
        ```

-   **Login User**

    -   **POST /api/users/login**
    -   Request Body:
        ```json
        {
            "email": "string",
            "password": "string"
        }
        ```

-   **Get User Profile**
    -   **GET /api/users/profile/:id**

---

### **2. Books API**

-   **Create Book** (For Authors & Admins)

    -   **POST /api/books/create**
    -   Request Body:
        ```json
        {
            "title": "string",
            "author": "string",
            "description": "string",
            "price": "number",
            "type": "physical | digital",
            "category": "string",
            "coverImage": "file",
            "digitalFile": "file (optional)"
        }
        ```

-   **Get Book Details**

    -   **GET /api/books/:id**

-   **List All Books**
    -   **GET /api/books**

---

### **3. Orders API**

-   **Create New Order** (Buy Book)

    -   **POST /api/orders**
    -   Request Body:
        ```json
        {
            "userId": "string",
            "bookId": "string",
            "paymentDetails": {
                "method": "card | wallet",
                "transactionId": "string"
            },
            "deliveryAddress": {
                "address": "string",
                "city": "string",
                "postalCode": "string"
            }
        }
        ```

-   **Get Order Details**
    -   **GET /api/orders/:id**

---

### **4. Subscriptions API**

-   **Create Subscription (Book Box)**

    -   **POST /api/subscriptions**
    -   Request Body:
        ```json
        {
            "userId": "string",
            "boxType": "physical | digital",
            "category": "string",
            "duration": "number of months"
        }
        ```

-   **Get User Subscriptions**
    -   **GET /api/subscriptions/:userId**

---

### **5. Authors API**

-   **Create Author Profile** (Self-Publishing)

    -   **POST /api/authors/create**
    -   Request Body:
        ```json
        {
            "name": "string",
            "bio": "string",
            "socialLinks": {
                "facebook": "string",
                "twitter": "string"
            }
        }
        ```

-   **Get Author Details**
    -   **GET /api/authors/:id**

---

### **6. Categories API**

-   **Create Category**

    -   **POST /api/categories/create**
    -   Request Body:
        ```json
        {
            "name": "string",
            "description": "string"
        }
        ```

-   **List Categories**
    -   **GET /api/categories**

---

### **7. Payments API**

-   **Initiate Payment**

    -   **POST /api/payments/initialize**
    -   Request Body:
        ```json
        {
            "orderId": "string",
            "paymentMethod": "card | wallet",
            "amount": "number"
        }
        ```

-   **Verify Payment**
    -   **POST /api/payments/verify**
    -   Request Body:
        ```json
        {
            "transactionId": "string",
            "status": "success | failed"
        }
        ```

---

### **8. Events API (Workshops, Author Interactions)**

-   **Create Event**

    -   **POST /api/events/create**
    -   Request Body:
        ```json
        {
            "title": "string",
            "description": "string",
            "date": "date",
            "authorId": "string",
            "price": "number"
        }
        ```

-   **List All Events**
    -   **GET /api/events**

---

### **Authentication & Authorization**

-   Use **JWT** (JSON Web Tokens) for **authentication**.
-   Implement **role-based access control** (RBAC) to manage different roles like **admin**, **customer**, and **author**.
-   Add **middleware** to protect specific routes (e.g., only authors can create books).

### **Error Handling**

-   Use **custom error handlers** to return clear error messages for invalid requests or failures.
-   Use **status codes** (e.g., 200 for success, 404 for not found, 500 for server errors).

---

### **MongoDB Schemas (Mongoose)**

#### **User Schema**

```js
const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, enum: ["customer", "author", "admin"] },
    createdAt: { type: Date, default: Date.now },
});
```

#### **Book Schema**

```js
const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    description: String,
    price: Number,
    type: { type: String, enum: ["physical", "digital"] },
    category: String,
    coverImage: String,
    digitalFile: String,
    createdAt: { type: Date, default: Date.now },
});
```

#### **Order Schema**

```js
const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
    paymentDetails: Object,
    deliveryAddress: Object,
    status: { type: String, default: "processing" },
    createdAt: { type: Date, default: Date.now },
});
```

### **Deployment**

-   **Node.js Backend**: Host on **Heroku**, **AWS EC2**, or **DigitalOcean**.
-   **MongoDB Database**: Use **MongoDB Atlas** for managed cloud MongoDB hosting.
-   **React.js Frontend**: Host on **Netlify** or **Vercel**.

---

This API will provide the core functionality required for the **Book Chautari E-Commerce Hub** to operate as a book marketplace, supporting both physical and digital content while promoting self-publishing for Nepali authors.
