import mongoose from "mongoose";
import UserReviewSchema from "./UserReviewSchema";


const UserReviewModel = mongoose.model('UserReviewModel',UserReviewSchema);
export default UserReviewModel;