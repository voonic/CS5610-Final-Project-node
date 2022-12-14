import ReviewType from "./ReviewType";
import User from "./User";


/**
 *@property {User} reviewedBy the user who made the review
 * @property {number}  movieId the id of movie which the user reviewed
 * @property {Date} reviewTime time in which the review was posted
 * @property {string} reviewTitle headline of the review
 * @property {string} reviewDetail detailed review about the movie by the user
 * @property {number} reviewRating overall rating of the movie on a 5 star scale
 **/
export default interface UserReview {
    reviewedBy: User,
    movieId: Number,
    reviewTime: Date,
    reviewTitle: String,
    reviewDetail: String,
    reviewRating: number,
    reviewType: ReviewType,
    actingRating: Number,
    directionRating: Number,
    cinematographyRating: Number,
    soundtrackRating: Number,
}