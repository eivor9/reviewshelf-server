// DEPENDENCIES
const cors = require("cors");
const express = require("express");

// CONFIGURATION
const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json()); // Parse incoming JSON

// ROUTES
app.get("/", (req, res) => {
  res.json({
    message: "WELCOME TO REVIEW SHELF",
    books: {
      getAllBooks: '/books',
      createOneBook: '/books',
      getOneBook: '/books/:id',
      editOneBook: '/books/:id',
      deleteOneBook: '/books/:id'
    },
    reviews: {
      getAllReviews: '/books/:id/reviews',
      createOneReview: '/books/:id/reviews',
      getOneReview: '/books/:id/reviews/:reviewer',
      editOneBook: '/books/:id/reviews/:reviewer',
      deleteOneBook: '/books/:id/reviews/:reviewer'
    }
  });
});

const booksController = require("./controllers/booksController.js");
app.use("/books", booksController);

const reviewsController = require("./controllers/reviewsController.js");
app.use("/reviews", reviewsController);

// 404 PAGE
app.get("*", (req, res) => {
  res.status(404).send("Page not found");
});

// EXPORT
module.exports = app;
