import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BookDetailPage = () => {
    const [book, setBook] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchBook = async () => {
            const { data } = await axios.get(
                `http://localhost:3000/api/books/${id}`
            );
            setBook(data);
        };
        fetchBook();
    }, [id]);

    if (!book) return <p>Loading...</p>;

    return (
        <div className="container">
            <h1>{book.title}</h1>
            <p>Author: {book.author}</p>
            <p>Price: ${book.price}</p>
            <p>{book.description}</p>
        </div>
    );
};

export default BookDetailPage;
