import { useState, useEffect } from "react";
import axios from "axios";
import BookList from "../components/BookList";

const HomePage = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            const { data } = await axios.get("http://localhost:3000/api/books");
            console.log(data);
            setBooks(data);
        };
        fetchBooks();
    }, []);

    return (
        <div className="container">
            <h1>Welcome to Book Chautari</h1>
            <BookList books={books} />
        </div>
    );
};

export default HomePage;
