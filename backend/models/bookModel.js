import mongoose from "mongoose";
const bookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
            maxlength: [100, "Title cannot exceed 100 characters"],
        },
        author: {
            type: String,
            required: [true, "Author is required"],
            trim: true,
        },
        description: {
            type: String,
            trim: true,
            maxlength: [500, "Description cannot exceed 500 characters"],
        },
        price: {
            type: Number,
            required: [true, "Price is required"],
            min: [0, "Price cannot be negative"],
        },
        type: {
            type: String,
            enum: ["physical", "digital"],
            required: [true, "Type is required"],
            default: "physical",
        },
        category: {
            type: String,
            trim: true,
        },
        coverImage: {
            type: String, // URL of the cover image
            trim: true,
            default: "default-cover.jpg",
        },
        digitalFile: {
            type: String, // URL for digital files if it's a digital book
            trim: true,
        },
        stock: {
            type: Number,
            required: [true, "Stock is required"],
            min: [0, "Stock cannot be negative"],
            default: 0,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true, // Automatically add createdAt and updatedAt fields
    }
);

// Export the model
const Book = mongoose.model("Book", bookSchema);

export default Book;
