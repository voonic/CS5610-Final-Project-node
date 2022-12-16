import mongoose from "mongoose";
import FollowListSchema from "./FollowListSchema";

/**
 * data model for follow list schema.
 */
const FollowListModel = mongoose.model('FollowListModel',FollowListSchema);
export default FollowListModel;