import { Request, Response } from "express";
/**
 * Interface for UserReviewController which is used to do activities on the reviews.
 */
export default interface UserReviewControllerI{
  findReviewByUserId(req :Request, res :Response) : void;
  findReviewByMovieId (req :Request, res :Response) :void;
  findAllReview(req : Request, res :Response) :void;
  findReviewByMovieIdAndType (req :Request, res :Response) :void;
  createReview(req :Request, res :Response) :void;
  deleteReviewById(req :Request, res :Response): void;
  updateReviewById(req : Request, res :Response): void;
};