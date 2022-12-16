import FollowListDaoI from "../interfaces/FollowListDaoI";
import User from "../models/User";
import FollowListModel from "../mongoose/FollowListModel";
import UserModel from "../mongoose/UserModel";


export default class FollowListDao implements FollowListDaoI {
    async addFollowing(uId: string, fId: string): Promise<any> {

        const isPresent = await FollowListModel.findOne({ following: fId, follower: uId })
        if (!isPresent) {
            const res = await FollowListModel.create({ follower: uId, following: fId });
            await UserModel.update({ _id: uId }, { $inc: { followingCount: 1 } });
            await UserModel.update({ _id: fId }, { $inc: { followerCount: 1 } });
            return res;
        }

    }

    async deleteFollowing(uId: string, fId: string): Promise<any> {
        const isPresent = await FollowListModel.findOne({ following: fId, follower: uId })
        if (isPresent) {
            const res = await FollowListModel.deleteOne({ follower: uId, following: fId });
            await UserModel.update({ _id: uId }, { $inc: { followingCount: -1 } });
            await UserModel.update({ _id: fId }, { $inc: { followerCount: -1 } });
            return res;
        }
    }

    async findAllFollowers(uId: string): Promise<User[]> {
        const finalResult: User[] = [];
        const res = await FollowListModel.find({ following: uId }).populate("follower");
        res.forEach(r => {
            finalResult.push(r.follower);
        })
        return finalResult;
    }

    async findAllFollowing(uId: string): Promise<User[]> {
        const finalResult: User[] = [];
        const res = await FollowListModel.find({ follower: uId }).populate("following");
        res.forEach(r => {
            finalResult.push(r.following);
        })
        return finalResult;
    }
}