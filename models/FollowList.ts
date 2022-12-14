import User from "./User";

export default interface FollowList {
    followers : User,
    following: User
}