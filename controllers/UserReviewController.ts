import { Express, Request, Response } from "express";

import UserReviewDao from "../dao/UserReviewDao";

/**
 * UserReviewController to handle the movie reviews, which includes adding new reviews,
 * editing existing ones and deleting reviews.
 */
export default class UserReviewController {

  private static userReviewDao: UserReviewDao = new UserReviewDao();
  private static userReviewController : UserReviewController | null = null;

  /**
   * Private constructor because we want singleton pattern to be used
   * for creating object of this class.
   */
  private constructor(){};

  /**
   * Creates singleton controller instance.
   * @param {Express} app Express instance to declare the RESTful Web service.
   * API
   * @return UserReviewController.
   */
  public static getInstance = (app: Express): UserReviewController => {
    if (UserReviewController.userReviewController === null) {
      UserReviewController.userReviewController = new UserReviewController();
      app.post("/movie/reviews", UserReviewController.userReviewController.createReview);
      app.get("/movie/reviews/:mId", UserReviewController.userReviewController.findReviewByMovieId);
      app.get("/user/reviews/:uId", UserReviewController.userReviewController.findReviewByUserId);
      app.put("/movie/reviews/:rId", UserReviewController.userReviewController.updateReviewById);
      app.delete("/movie/reviews/:rId", UserReviewController.userReviewController.deleteReviewById);
    }
    return UserReviewController.userReviewController;
  }

  /**
   * Responsible for finding the all the reviews made by a particular user.
   * @param req  request containing the userId to find the reviews.
   * @param res response that is to be sent to the user.
   */
  findReviewByUserId = async (req :Request, res :Response) => {
    const uId = req.params.uId;
    const result = await UserReviewController.userReviewDao.findReviewByUserId(uId);
    res.json(result);
  };

  /**
   * Responsible for finding all the reviews that a particular movie got.
   * @param req request containing the particular movie's Id whos reviews are to be taken.
   * @param res response to the user with the reviews of the movie.
   */
  findReviewByMovieId = async (req :Request, res :Response) => {
    const mId = req.params.mId;
    const result = await UserReviewController.userReviewDao.findReviewByMovieId(mId);
    res.json(result);
  };



  /**
   * Responsible for adding new reviews into the database.
   * @param req request containing the new review as the body that is to be added into the database.
   * @param res response that is to be sent to the user containing the newly added review.
   */
  createReview = async (req :Request, res :Response) => {
    const review = req.body;
    const status = await UserReviewController.userReviewDao.createReview(review);
    res.json(status);
  };



  /**
   * Responsible for deleting an already existing review from the database.
   * @param req request containing the review Id that is to be deleted.
   * @param res response containing the delted review.
   */
  deleteReviewById = async (req :Request, res :Response) => {
    const rId = req.params.rId;
    const status = await UserReviewController.userReviewDao.deleteReviewById(rId);
    res.json(status);
  };



  /**
   * Responsible for updating an already existing review in the database.
   * @param req request containing the new review.
   * @param res response containing the newly added review.
   */
  updateReviewById = async (req : Request, res :Response) => {
    const rId = req.params.rId;
    const review = req.body;
    const status = await UserReviewController.userReviewDao.updateReviewById(rId, review);
    res.json(status);
  };
  
}


