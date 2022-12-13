import User from "../models/User";

/**
 * An interface that provides common operations that
 * can be done on the users collection.
 */
export default interface UserControllerI {
  findUserById(uid: string): Promise<User>;
  updateUser(uid: string, user: User): Promise<any>;
}