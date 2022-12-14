import mongoose from "mongoose";
import ReviewType from "../models/ReviewType";
import UserReview from "../models/UserReview";

const UserReviewSchema = new mongoose.Schema<UserReview>({
    reviewDetail : String,
    reviewTime : {type : Date, default : Date.now},
    reviewRating : Number,
    reviewTitle :String,
    movieId : Number,
    reviewedBy :{type : mongoose.Schema.Types.ObjectId, ref : "UserModel", required :true},
    reviewType: { type: String, default: ReviewType.Normal, enum: ReviewType },
    actingRating : Number,
    directionRating : Number,
    cinematographyRating : Number,
    soundtrackRating : Number,

},{collection : 'userReviews'});

export default UserReviewSchema;