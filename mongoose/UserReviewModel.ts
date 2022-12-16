import mongoose from "mongoose";
import UserReviewSchema from "./UserReviewSchema";

/**
 * user review data model for userReviewSchema.
 */
const UserReviewModel = mongoose.model('UserReviewModel',UserReviewSchema);
export default UserReviewModel;