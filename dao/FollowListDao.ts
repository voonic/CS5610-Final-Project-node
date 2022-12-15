import FollowListDaoI from "../interfaces/FollowListDaoI";
import User from "../models/User";
import FollowListModel from "../mongoose/FollowListModel";


export default class FollowListDao implements FollowListDaoI {
    async addFollowing(uId: string,fId:string): Promise<any> {
        const res = await FollowListModel.create({follower:uId,following:fId});
        return res;
    }

    async deleteFollowing(uId: string,fId:string): Promise<any> {
        const res = await FollowListModel.deleteOne({ follower: uId, following:fId });
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