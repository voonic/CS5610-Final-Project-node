import User from "../models/User";

/**
 * An interface that provides common operations that can be performed on the FollowList collection.
 */
export default interface FollowListDaoI{

    findAllFollowers(uId: string) : Promise<User[]>;
    findAllFollowing(uId: string) : Promise<User[]>;
    addFollowing(uId : string,fId:string) : Promise<any>;
    deleteFollowing(uId : string,fId:string) : Promise<any>;
}