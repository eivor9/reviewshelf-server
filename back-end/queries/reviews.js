const db = require("../db/dbConfig.js");

const getAllReviews = async (book_id) => {
  try {
    if (!book_id){
      const allReviews = await db.any("SELECT * FROM reviews");
      return allReviews;
    }
    const allReviews = await db.any("SELECT * FROM reviews WHERE book_id=$1", book_id);
    return allReviews;
  } catch (err) {
    return err;
  }
};

const getReview = async (book_id, reviewer) => {
  try {
    const oneReview = await db.one("SELECT * FROM reviews WHERE book_id=$1 AND reviewer=$2", [book_id, reviewer.toUpperCase()]);
    return oneReview;
  } catch (error) {
    return error;
  }
};

const newReview = async (book_id, review) => {
  try {
    const reviewers = (await db.any("SELECT reviewer FROM reviews WHERE book_id=$1", book_id)).map(x => x.reviewer);
    if (reviewers.includes(review.reviewer.toUpperCase())) return {};
    const newReview = await db.one(
      "INSERT INTO reviews (reviewer, content, highly_recommend, rating, book_id) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [
        review.reviewer.toUpperCase(),
        review.content,
        review.highly_recommend,
        review.rating,
        book_id
      ]
    );
    return newReview;
  } catch (error) {
    return error;
  }
};

const deleteReview = async (book_id, reviewer) => {
  try {
    const deletedReview = await db.one(
      "DELETE FROM reviews WHERE book_id=$1 AND reviewer=$2 RETURNING *",
      [book_id, reviewer.toUpperCase()]
    );
    return deletedReview;
  } catch (error) {
    return error;
  }
};

const updateReview = async (book_id, reviwer, review) => {
  try {
    const updatedReview = await db.one(
      "UPDATE reviews SET reviewer=$1, content=$2, highly_recommend=$3, rating=$4, book_id=$5 WHERE reviewer=$6 and book_id=$7 RETURNING *",
      [
        review.reviewer.toUpperCase(),
        review.content,
        review.highly_recommend,
        review.rating,
        review.book_id,
        reviwer.toUpperCase(),
        book_id
      ]
    );
    return updatedReview;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllReviews,
  getReview,
  newReview,
  deleteReview,
  updateReview,
};
