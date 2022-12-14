import FollowListDaoI from "../interfaces/FollowListDaoI";
import User from "../models/User";

export default class FollowListDao implements FollowListDaoI{
    addFollowing(uId: string): Promise<any> {
        return Promise.resolve(undefined);
    }

    deleteFollowing(uId: string): Promise<any> {
        return Promise.resolve(undefined);
    }

    findAllFollowers(): Promise<User[]> {
        return Promise.resolve([]);
    }

    findAllFollowing(): Promise<User[]> {
        return Promise.resolve([]);
    }

    findFollowersByUserId(uId: string): Promise<User[]> {
        return Promise.resolve([]);
    }

    findFollowingByUserId(uId: string): Promise<User[]> {
        return Promise.resolve([]);
    }

}