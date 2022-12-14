import User from "../models/User";

/**
 * An interface that provides common operations that can be performed on the FollowList collection.
 */
export default interface FollowListDaoI{

    /**
     * Method to find all the followers the current user have.
     */
    findAllFollowers(uId: string) : Promise<User[]>;

    /**
     * Method to find all the users who are following the current user.
     */
    findAllFollowing(uId: string) : Promise<User[]>;

    /**
     * Find all the followers another user have.
     * @param uId userId of another user.
     */
    findFollowersByUserId(uId : string) : Promise<User[]>;

    /**
     * Find who all are following another user.
     * @param uId userId of another user.
     */
    findFollowingByUserId(uId : string) : Promise<User[]>;

    /**
     * Add a user whom the current user wants to follow.
     * @param uId userId of the other user.
     */
    addFollowing(uId : string) : Promise<any>;

    /**
     * stop user from following a particular user.
     * @param uId userId of the other user who needs to be deleted from the following.
     */
    deleteFollowing(uId : string) : Promise<any>;
}