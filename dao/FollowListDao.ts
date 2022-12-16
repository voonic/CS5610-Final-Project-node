import FollowListDaoI from "../interfaces/FollowListDaoI";
import User from "../models/User";
import FollowListModel from "../mongoose/FollowListModel";
import UserModel from "../mongoose/UserModel";

/**
 * Class for implementing the follow list interface and its functions.
 */
export default class FollowListDao implements FollowListDaoI {
    /**
     * Add a user whom the current user wants to follow.
     * @param uId userId of the logged in user.
     * @param fId userId of the other user.
     */
    async addFollowing(uId: string,fId:string): Promise<any> {
        if (!isPresent) {
            const res = await FollowListModel.create({ follower: uId, following: fId });
            await UserModel.updateOne({ _id: uId }, { $inc: { followingCount: 1 } });
            await UserModel.updateOne({ _id: fId }, { $inc: { followersCount: 1 } });
            return res;
        }
    }

    /**
     * stop user from following a particular user.
     * @param uId userId of the current user who is deleting the other user.
     * @param fId userId of the other user who needs to be deleted from the following.
     */
    async deleteFollowing(uId: string,fId:string): Promise<any> {
        const isPresent = await FollowListModel.findOne({ following: fId, follower: uId });
        if (isPresent) {
            const res = await FollowListModel.deleteOne({ follower: uId, following: fId });
            await UserModel.updateOne({ _id: uId }, { $inc: { followingCount: -1 } });
            await UserModel.updateOne({ _id: fId }, { $inc: { followersCount: -1 } });
            return res;
        }
    }

    /**
     * Method to find all the followers using a user Id.
     * @param uId userId of the given user.
     */
    async findAllFollowers(uId: string): Promise<User[]> {
        const finalResult: User[] = [];
        const res = await FollowListModel.find({ following: uId }).populate("follower");
        res.forEach(r => {
            finalResult.push(r.follower);
        })
        return finalResult;
    }

    /**
     * Method to find all the users who are following the given user.
     * @param uId userId of the given user.
     */
    async findAllFollowing(uId: string): Promise<User[]> {
        const finalResult: User[] = [];
        const res = await FollowListModel.find({ follower: uId }).populate("following");
        res.forEach(r => {
            finalResult.push(r.following);
        })
        return finalResult;
    }
}