import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        stock: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

const Book = mongoose.model("Book", bookSchema);

export default Book;
