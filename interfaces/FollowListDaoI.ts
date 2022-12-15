import User from "../models/User";

/**
 * An interface that provides common operations that can be performed on the FollowList collection.
 */
export default interface FollowListDaoI{

    /**
     * Method to find all the followers using a user Id.
     * @param uId userId of the given user.
     *
     */
    findAllFollowers(uId: string) : Promise<User[]>;

    /**
     * Method to find all the users who are following the given user.
     * @param uId userId of the given user.
     */
    findAllFollowing(uId: string) : Promise<User[]>;

    /**
     * Add a user whom the current user wants to follow.
     * @param uId userId of the current user.
     * @param fId userId of the other user.
     */
    addFollowing(uId : string,fId:string) : Promise<any>;

    /**
     * stop user from following a particular user.
     * @param uId userId of the current user who is deleting the other user.
     * @param fId userId of the other user who needs to be deleted from the following.
     */
    deleteFollowing(uId : string,fId:string) : Promise<any>;
}