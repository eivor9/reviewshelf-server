const db = require("../db/dbConfig.js");

const getAllBooks = async () => {
  try {
    const allBooks = await db.any("SELECT * FROM books");
    return allBooks;
  } catch (error) {
    return error;
  }
};

const getBook = async (id) => {
  try {
    const oneBook = await db.one("SELECT * FROM books WHERE id=$1", id);
    return oneBook;
  } catch (error) {
    return error;
  }
};

// CREATE
const createBook = async (book) => {
  try {
    const newBook = await db.one(
      "INSERT INTO books (title, author, page_num, cover_img, category, description) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
      [book.title, book.author, book.page_num, book.cover_img, book.category, book.description]
    );
    return newBook;
  } catch (error) {
    return error;
  }
};

const deleteBook = async (id) => {
  try {
    const deletedBook = await db.one(
      "DELETE FROM books WHERE id = $1 RETURNING *",
      id
    );
    return deletedBook;
  } catch (error) {
    return error;
  }
};

const updateBook = async (id, book) => {
  try {
    const updatedBook = await db.one(
      "UPDATE books SET title=$1, author=$2, page_num=$3, cover_img=$4, category=$5, description=$6 where id=$7 RETURNING *",
      [book.title, book.author, book.page_num, book.cover_img, book.category, book.description, id]
    );
    return updatedBook;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllBooks,
  getBook,
  createBook,
  deleteBook,
  updateBook,
};
