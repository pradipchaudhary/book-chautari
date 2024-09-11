import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BookDetailPage from "./pages/BookDetailPage";
import CartPage from "./pages/CartPage";
import Footer from "./components/Footer";
import "./App.css";
import Header from "./components/Header";

const App = () => {
    return (
        <Router>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/books/:id" element={<BookDetailPage />} />
                    <Route path="/cart" element={<CartPage />} />
                </Routes>
            </main>
            <Footer />
        </Router>
    );
};

export default App;
