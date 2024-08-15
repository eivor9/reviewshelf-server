// Dependencies
const express = require("express");
const { getBook } = require("../queries/books.js");
const reviews = express.Router({ mergeParams: true });

// Queries
const {
  getAllReviews,
  getReview,
  newReview,
  deleteReview,
  updateReview,
} = require("../queries/reviews");

// INDEX
reviews.get("/", async (req, res) => {
  const { book_id } = req.params;
  const reviews = await getAllReviews(book_id);
  const book = await getBook(book_id);
  if (reviews.length && book.id) {
    res.status(200).json({...book, reviews});
  } 
  else if (reviews.length) {
    res.status(200).json(reviews);
  } else {
    res.status(200).json({error: "Book not found or server error", reviews: []});
  }
});

// SHOW
reviews.get("/:reviwer", async (req, res) => {
  const { book_id, reviwer } = req.params;
  const review = await getReview(book_id, reviwer);
  const book = await getBook(book_id);
  if (review.id) {
    res.json({ ...book, review });
  } else {
    res.status(404).json({ error: "review not found" });
  }
});

// UPDATE
reviews.put("/:reviwer", async (req, res) => {
  const { book_id, reviwer } = req.params;
  const updatedReview = await updateReview(book_id, reviwer, req.body);
  if (updatedReview.id) {
    res.status(200).json(updatedReview);
  } else {
    res.status(404).send("An Error Occured");
  }
});

// POST
reviews.post("/", async (req, res) => {
  const { book_id } = req.params;
  const review = await newReview(book_id, req.body);
  if (review.id){
    res.status(200).json(review);
  } else {
    res.status(404).json({error: "reviewer propery must be unique"});
  }
});

// DELETE
reviews.delete("/:reviewer", async (req, res) => {
  const { book_id, reviewer } = req.params;
  const deletedReview = await deleteReview(book_id, reviewer);
  if (deletedReview.id) {
    res.status(200).json(deletedReview);
  } else {
    res.status(404).json(deletedReview);
  }
});

// TEST JSON NEW
// {
//     "reviewer":"Lou",
//      "title": "Fryin Better",
//      "content": "With the great tips and tricks I found here",
//      "bookmark_id": "2",
//      "rating": "4"
// }
module.exports = reviews;
