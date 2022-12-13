import * as userReviewDao from "../dao/UserReviewDao";

/**
 *
 * @param {Request} req request coming in to the function with the reviewId that is to be searched.
 * @param {Response} res responding to the request witht the result of finding the review.
 */
const findReviewByUserId = async (req, res) => {
  const uId = req.params.uId;
  const result = await userReviewDao.findReviewByUserId(uId);
  res.json(result);
};

/**
 *
 * @param {Request} req request coming in to the function witht the movie Id whos reviews are to be extracted.
 * @param {Response} res responding to the request with all reviews for the given movie.
 */
const findReviewByMovieId = async (req, res) => {
  // const mId = req.params.mId;
  // const result = await userReviewDao.findReviewByMovieId(mId);
  // res.json(result);
  res.send("heLLO WORLD");
};

/**
 *
 * @param {Request} req request coming in with the new review attached to the body.
 * @param {Response} res responding with the status of creating new review
 */
const createReview = async (req, res) => {
  const review = req.body;
  const status = await userReviewDao.createReview(review);
  res.json(status);
};

/**
 *
 * @param {Request} req request coming in with the id of the review that is to be deleted.
 * @param {Response} res responding with the status of the deletion process.
 */
const deleteReviewById = async (req, res) => {
  const rId = req.params.rId;
  const status = await userReviewDao.deleteReviewById(rId);
  res.json(status);
};

/**
 *
 * @param {Request} req request coming in with the id of the review that is to be updated.
 * @param {Response} res responding with the status of the updation process.
 */
const updateReviewById = async (req, res) => {
  const rId = req.params.rId;
  const review = req.body;
  const status = await userReviewDao.updateReviewById(rId, review);
  res.json(status);
};

export default (app) => {
  app.post("/movie/reviews/newreview", createReview);
  app.get("/movie/reviews/:mId", findReviewByMovieId);
  app.get("/user/reviews/:uId", findReviewByUserId);
  app.put("/movie/reviews/update/:rId", updateReviewById);
  app.delete("/movie/reviews/delete/:rId", deleteReviewById);
};
