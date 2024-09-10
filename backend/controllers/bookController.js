import asyncHandler from "express-async-handler";
import Book from "../models/bookModel.js";

// @desc    Fetch all books
// @route   GET /api/books
// @access  Public
export const getBooks = asyncHandler(async (req, res) => {
    const books = await Book.find({});
    res.json(books);
});

// @desc    Fetch single book
// @route   GET /api/books/:id
// @access  Public
export const getBookById = asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (book) {
        res.json(book);
    } else {
        res.status(404);
        throw new Error("Book not found");
    }
});

// @desc    Create a new book
// @route   POST /api/books
// @access  Public
export const createBook = async (req, res) => {
    const { title, author, description, price } = req.body;

    try {
        const newBook = new Book({
            title,
            author,
            description,
            price,
        });

        const savedBook = await newBook.save();
        res.status(201).json(savedBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update a book by ID
// @route   PUT /api/books/:id
// @access  Public
export const updateBook = async (req, res) => {
    const { title, author, description, price } = req.body;

    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        book.title = title || book.title;
        book.author = author || book.author;
        book.description = description || book.description;
        book.price = price || book.price;

        const updatedBook = await book.save();
        res.status(200).json(updatedBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a book by ID
// @route   DELETE /api/books/:id
// @access  Public
export const deleteBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        await book.remove();
        res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
