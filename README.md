
# 📖 **Book Chautari** – Nepal's Interactive Book Platform

[![GitHub issues](https://img.shields.io/github/issues/pradipchaudhary/book-chautari)](https://github.com/pradipchaudhary/book-chautari/issues)
[![GitHub forks](https://img.shields.io/github/forks/pradipchaudhary/book-chautari)](https://github.com/pradipchaudhary/book-chautari/network)
[![GitHub stars](https://img.shields.io/github/stars/pradipchaudhary/book-chautari)](https://github.com/pradipchaudhary/book-chautari/stargazers)
[![GitHub license](https://img.shields.io/github/license/pradipchaudhary/book-chautari)](https://github.com/pradipchaudhary/book-chautari/blob/main/LICENSE)

Welcome to **Book Chautari**, an online interactive book platform from Nepal, designed to bring readers and authors together! Discover, explore, and share books in a collaborative and interactive space built to celebrate the love of literature.

### 🚀 **Live Demo**: [Book Chautari](#) *(Link coming soon!)*

---

## 🌟 **Key Features**

- **📚 Explore Books**: Browse a wide selection of books across genres.
- **💬 User Reviews & Ratings**: Review and rate books to help others find great reads.
- **👥 Community Interaction**: Join discussions, share thoughts, and connect with other readers.
- **📊 Book Statistics**: View book popularity, ratings, and community engagement.
- **🖋️ Author Dashboard**: Manage your listings, view feedback, and interact with readers.

---

## 🛠️ **Tech Stack**

- **Frontend**: [React.js](https://reactjs.org/), [Tailwind CSS](https://tailwindcss.com/)
- **Backend**: [Node.js](https://nodejs.org/), [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/)
- **Authentication**: [JWT (JSON Web Tokens)](https://jwt.io/)
- **Version Control**: [Git](https://git-scm.com/), [GitHub](https://github.com/)
- **Deployment**: [Vercel](https://vercel.com/) / [Heroku](https://www.heroku.com/)

---

## ⚙️ **Installation and Setup**

Follow the steps below to get the project up and running locally.

### 🖥️ **Backend Setup**

1. Clone the repository:
   ```bash
   git clone https://github.com/pradipchaudhary/book-chautari.git
   cd book-chautari
   ```

2. Navigate to the `backend/` directory:
   ```bash
   cd backend
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up your environment variables by creating a `.env` file in the `backend/` directory:
   ```bash
   MONGO_URI=your-mongodb-uri
   JWT_SECRET=your-jwt-secret
   ```

5. Start the server:
   ```bash
   npm start
   ```

   Backend will be running at `http://localhost:5000`.

### 🎨 **Frontend Setup**

1. Navigate to the `frontend/` directory:
   ```bash
   cd ../frontend
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file for frontend:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. Start the React development server:
   ```bash
   npm start
   ```

   Frontend will be live at `http://localhost:3000`.

---

## 📁 **Project Structure**

```bash
book-chautari/
├── backend/                     # Node.js + Express Backend API
│   ├── controllers/             # Business logic for API endpoints
│   ├── models/                  # Mongoose models (Database Schemas)
│   ├── routes/                  # API route definitions
│   ├── config/                  # MongoDB configuration and app setup
│   └── app.js                   # Express app entry point
│
├── frontend/                    # React.js Frontend
│   ├── src/
│   │   ├── components/          # Reusable components (Navbar, Footer, etc.)
│   │   ├── pages/               # Different pages (Home, Book Details, etc.)
│   │   ├── utils/               # Helper functions and utilities
│   ├── public/                  # Static assets (favicon, images)
│   └── .env                     # Environment variables for API
│
└── README.md                    # Project documentation
```

---

## 🚀 **API Endpoints**

Here's a summary of the API endpoints used in the backend:

| Method | Endpoint           | Description                       |
|--------|--------------------|-----------------------------------|
| GET    | `/api/books`        | Get all books                     |
| POST   | `/api/books`        | Add a new book                    |
| GET    | `/api/books/:id`    | Get details of a specific book    |
| PUT    | `/api/books/:id`    | Update book details               |
| DELETE | `/api/books/:id`    | Delete a book                     |

---

## 🤝 **Contributing**

We'd love for you to contribute to **Book Chautari** and help make it even better! Here’s how you can contribute:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-branch-name`.
3. Commit your changes: `git commit -m "Add some feature"`.
4. Push to the branch: `git push origin feature-branch-name`.
5. Open a pull request.

---

## 📜 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

### 👨‍💻 **Developed by Pradip Chaudhary**

Connect with me on [LinkedIn](https://www.linkedin.com/pradipchaudhary) | Follow me on [GitHub](https://github.com/pradipchaudhary)
