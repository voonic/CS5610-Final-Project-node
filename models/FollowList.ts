import User from "./User";

/**
 * A model representation of each user in FollowList.
 * following:
 *
 * @property {User} following Current user following other user.
 * @property {User} follower Other user following current user.
 * @property {Date} addedOn date of adding the user in either of the list.
 */
export default interface FollowList {
    follower: User,
    following : User,
    addedOn: Date,
};