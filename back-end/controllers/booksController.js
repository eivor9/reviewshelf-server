// DEPENDENCIES
const express = require("express");
const books = express.Router();

// Queries
const { getAllBooks, getBook, createBook, deleteBook, updateBook } = require("../queries/books.js");

// REVIEWS 
const reviewsController = require("./reviewsController.js");
books.use("/:book_id/reviews", reviewsController);

// INDEX
books.get("/", async (req, res) => {
  const allBooks = await getAllBooks();
  if (allBooks.length) {
    res.status(200).json(allBooks);
  } else {
    res.status(500).json({ error: "server error" });
  }
});

// SHOW
books.get("/:id", async (req, res) => {
  const { id } = req.params;
  const book = await getBook(id);
  if (book.id) {
    res.json(book);
  } else {
    res.status(404).json({ error: "not found" });
  }
});

// CREATE
books.post("/", async (req, res) => {
  try {
    const book = await createBook(req.body);
    res.json(book);
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

// DELETE
books.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedBook = await deleteBook(id);
  if (deletedBook.id) {
    res.status(200).json(deletedBook);
  } else {
    res.status(404).json("Book not found");
  }
});

// UPDATE
books.put("/:id", async (req, res) => {
    const { id } = req.params;
    const updatedBook = await updateBook(id, req.body);
    res.status(200).json(updatedBook);
  }
);

module.exports = books;
