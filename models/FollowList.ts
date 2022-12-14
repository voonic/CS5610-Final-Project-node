import User from "./User";
import FollowType from "./FollowType";

/**
 * A model representation of each user in FollowList.
 *
 * @property {FollowType} followType The follow type(following/follower) of the user.
 * @property {User} user The user object in the follow list.
 */
export default interface FollowList {
    followType: FollowType;
    user : User;
};