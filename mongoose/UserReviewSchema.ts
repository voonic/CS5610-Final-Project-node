import mongoose from "mongoose";
import UserReview from "../models/UserReview";

const UserReviewSchema = new mongoose.Schema<UserReview>({
    reviewDetail : String,
    reviewTime : Date,
    reviewRating : Number,
    reviewTitle :String,
    movieId : Number,
    reviewedBy :{type : mongoose.Schema.Types.ObjectId, ref : "UserModel",required :true},
},{collection : 'userReviews'});

export default UserReviewSchema;