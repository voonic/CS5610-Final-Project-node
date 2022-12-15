import mongoose from "mongoose";
import FollowList from "../models/FollowList";


/**
 * @file A followList schema for followList model.
 */
const FollowListSchema = new mongoose.Schema<FollowList>({
    follower: {type : mongoose.Schema.Types.ObjectId, ref : "UserModel", required:true},
    following : {type : mongoose.Schema.Types.ObjectId, ref : "UserModel", required:true},
    addedOn: {type : Date, default: Date.now },
}, { collection: 'followList' });

export default FollowListSchema;