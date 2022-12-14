import mongoose from "mongoose";
import FollowListSchema from "./FollowListSchema";


const FollowListModel = mongoose.model('FollowListModel',FollowListSchema);
export default FollowListModel;