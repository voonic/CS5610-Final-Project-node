import FollowListDaoI from "../interfaces/FollowListDaoI";
import User from "../models/User";
import FollowListModel from "../mongoose/FollowListModel";

export default class FollowListDao implements FollowListDaoI {
    async addFollowing(uId: string): Promise<any> {
        const res = await FollowListModel.create(uId);
        return res;
    }

    async deleteFollowing(uId: string): Promise<any> {
        const res = await FollowListModel.deleteOne({ _id: uId });
        return res;
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