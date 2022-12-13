import UserReview from "../models/UserReview";

/**
 * An interface that provides common operations that can be performed on the UserReview collection.
 */
export default interface UserReviewDaoI{

  findReviewByMovieId(mId :string) : Promise<UserReview[]>;
  findReviewByUserId(uId : string) : Promise<UserReview[]>;
  createReview(newReview : UserReview) : Promise<any>;
  deleteReviewById(rId : string) : Promise<any>;
  updateReviewById(rId : string, newReview : UserReview) : Promise<any>;
}