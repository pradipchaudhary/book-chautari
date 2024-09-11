import { Link } from "react-router-dom";

const BookList = ({ books }) => {
    return (
        <div>
            <h2>Available Books</h2>
            {books.length === 0 ? (
                <p>No books available</p>
            ) : (
                <ul>
                    {books.map((book) => (
                        <li key={book._id}>
                            <Link to={`/books/${book._id}`}>
                                {book.title} by {book.author} - ${book.price}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default BookList;
