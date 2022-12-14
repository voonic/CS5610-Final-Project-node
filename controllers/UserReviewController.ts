import { Express, Request, Response } from "express";

import UserReviewDao from "../dao/UserReviewDao";
import UserReviewControllerI from "../interfaces/UserReviewControllerI";
import ReviewType from "../models/ReviewType";

/**
 * UserReviewController to handle the movie reviews, which includes adding new reviews,
 * editing existing ones and deleting reviews.
 */
export default class UserReviewController implements UserReviewControllerI {

  private static userReviewDao: UserReviewDao = new UserReviewDao();
  private static userReviewController: UserReviewController | null = null;

  /**
   * Private constructor because we want singleton pattern to be used
   * for creating object of this class.
   */
  private constructor() { };

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
      app.get("/movie/reviews/:mId/count", UserReviewController.userReviewController.getRatingCount);
      app.get("/movie/reviews/:mId/:reviewType", UserReviewController.userReviewController.findReviewByMovieIdAndType);
      app.get("/user/reviews/:uId", UserReviewController.userReviewController.findReviewByUserId);
      app.get("/admin/reviews", UserReviewController.userReviewController.findAllReview);
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
  findReviewByUserId = async (req: Request, res: Response) => {
    const uId = req.params.uId;
    const result = await UserReviewController.userReviewDao.findReviewByUserId(uId);
    res.json(result);
  };

  /**
   * Responsible for fetching all the reviews in the database irrespective of the id.
   * @param req request to get all the reviews.
   * @param res response with all the reviews in the database.
   */
  findAllReview = async (req: Request, res: Response) => {
    const result = await UserReviewController.userReviewDao.findAllReviews();
    res.json(result);

  }

  /**
   * Responsible for finding all the reviews that a particular movie got.
   * @param req request containing the particular movie's Id whos reviews are to be taken.
   * @param res response to the user with the reviews of the movie.
   */
  findReviewByMovieId = async (req: Request, res: Response) => {
    const mId = req.params.mId;
    const result = await UserReviewController.userReviewDao.findReviewByMovieId(mId);
    res.json(result);
  };

  /**
   * Responsibel for finding all the reviews of a sepcific movie and specifc type.
   * @param req request containinig particular movie's id and type.
   * @param res  responde to the user.
   */
  findReviewByMovieIdAndType = async (req: Request, res: Response) => {
    const mId = req.params.mId;
    const type = req.params.reviewType as ReviewType;
    const result = await UserReviewController.userReviewDao.findReviewByMoviewIdAndType(mId, type);
    res.json(result);
  }

  /**
   * Responsible for adding new reviews into the database.
   * @param req request containing the new review as the body that is to be added into the database.
   * @param res response that is to be sent to the user containing the newly added review.
   */
  createReview = async (req: Request, res: Response) => {
    const review = req.body;
    //@ts-ignore
    const user = req.session['profile'];
    if (user) {
      review.reviewedBy = user._id;
      const status = await UserReviewController.userReviewDao.createReview(review);
      res.json(status);
    } else {
      res.status(401).json("You need to be logged in first");
    }
  };

  /**
   * Responsible for deleting an already existing review from the database.
   * @param req request containing the review Id that is to be deleted.
   * @param res response containing the delted review.
   */
  deleteReviewById = async (req: Request, res: Response) => {
    const rId = req.params.rId;
    const status = await UserReviewController.userReviewDao.deleteReviewById(rId);
    res.json(status);
  };

  /**
   * Responsible for updating an already existing review in the database.
   * @param req request containing the new review.
   * @param res response containing the newly added review.
   */
  updateReviewById = async (req: Request, res: Response) => {
    const rId = req.params.rId;
    const review = req.body;
    //@ts-ignore
    const user = req.session['profile'];
    if (user) {
      review.reviewedBy = user._id;
      const status = await UserReviewController.userReviewDao.updateReviewById(rId, review);
      res.json(status);
    } else {
      res.status(401).json("You need to be logged in first");
    }
  };

  getRatingCount = async (req: Request, res: Response) => {
    const mId = req.params.mId;
    const existingRevs = await UserReviewController.userReviewDao.findReviewByMovieId(mId);
    let summation = 0;
    let rating = 0;
    if (existingRevs.length > 0) {
      existingRevs.forEach(r => {
        summation = summation + r.reviewRating;
      });
      rating = summation / existingRevs.length;
    }
    res.json({ rating: rating });
  }
}


