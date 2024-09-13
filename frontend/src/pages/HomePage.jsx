import { useState, useEffect } from "react";
import axios from "axios";
import BookList from "../components/BookList";
import Hero from "../components/Hero";

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
        <div className="home-page">
            <Hero />

            <div className="container">
                <BookList books={books} />
            </div>
        </div>
    );
};

export default HomePage;
