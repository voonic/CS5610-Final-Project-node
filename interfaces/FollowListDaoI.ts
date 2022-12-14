import User from "../models/User";

/**
 * An interface that provides common operations that can be performed on the FollowList collection.
 */
export default interface FollowListDaoI{

    findAllFollowers() : Promise<User[]>;
    findAllFollowing() : Promise<User[]>;
    findFollowerByUserId(uId : string) : Promise<User[]>;
    findFollowingByUserId(uId : string) : Promise<User[]>;
    addFollowing(uId : string) : Promise<any>;
    deleteFollowing(uId : string) : Promise<any>;
}