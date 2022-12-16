import UserReviewDaoI from "../interfaces/UserReviewDaoI";
import ReviewType from "../models/ReviewType";
import UserReview from "../models/UserReview";
import UserReviewModel from "../mongoose/UserReviewModel";

/**
 * Class implementing the user review DAO interface and functionalities like finding movie
 * review or adding a movie review etc.
 */
export default class UserReviewDao implements UserReviewDaoI {
  findAllReviews = async (): Promise<UserReview[]> => {
    const res = await UserReviewModel.find().populate("reviewedBy");
    return res;
  }

  /**
   * Responsible for finding the movie review using the movie id and whether it's a critic review or not.
   * @param mId movie id
   * @param type review type (critic/normal)
   */
  findReviewByMoviewIdAndType = async (mId: string, type: ReviewType): Promise<UserReview[]> => {
    const res = await UserReviewModel.find({ movieId: mId, reviewType: type }).sort({ reviewTime: -1 }).populate("reviewedBy");
    return res;

  }

  /**
   * Responsible for finding the review by just movie Id.
   * @param mId movie id
   */
  findReviewByMovieId = async (mId: String): Promise<UserReview[]> => {
    const res = await UserReviewModel.find({ movieId: mId }).sort({ reviewTime: -1 }).populate("reviewedBy");
    return res;

  }

  /**
   * Responsible for finding the review of a user.
   * @param uId user id
   */
  findReviewByUserId = async (uId: string): Promise<UserReview[]> => {
    const res = await UserReviewModel.find({ reviewedBy: uId }).sort({ reviewTime: -1 }).populate("reviewedBy");;
    return res;
  }

  /**
   * Responsible for creating a new review by the user.
   * @param newReview review object
   */
  createReview = async (newReview: UserReview): Promise<any> => {
    const res = await UserReviewModel.create(newReview);
    await res.populate("reviewedBy");
    return res;
  }

  /**
   * Responsible for removing a review given by the user.
   * @param rId review id
   */
  deleteReviewById = async (rId: string): Promise<any> => {
    const res = await UserReviewModel.deleteOne({ _id: rId });
    return res;
  }

  /**
   * Responsible for updating the review by id and review object
   * @param rId review id
   * @param newReview new review object content
   */
  updateReviewById = async (rId: string, newReview: UserReview): Promise<any> => {
    const res = await UserReviewModel.updateOne({ _id: rId }, { $set: newReview }).populate("reviewedBy");
    return res;
  }
}