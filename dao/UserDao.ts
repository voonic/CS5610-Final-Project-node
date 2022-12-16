import User from "../models/User";
import UserModel from "../mongoose/UserModel";
import UserDaoI from "../interfaces/UserDaoI";
import UserReviewModel from "../mongoose/UserReviewModel";

/**
 * @class A class that defines the CRUD operations on 
 * user object in users collection.
 */
export default class UserDao implements UserDaoI {

  /**
   * Finds the user based on the email.
   * @param email The user id of the user
   */
  async findUserByEmail(email: string): Promise<any> {
    return await UserModel.findOne({ email: email });
  }

  /**
   * Lists all the users in the system.
   * @returns List of user object.
   */
  async findAllUsers(): Promise<User[]> {
    return await UserModel.find();
  }

  /**
   * Fetches a single user object based on the user id.
   * @param uid The user id of the object.
   * @returns The JSON object of the user.
   */
  async findUserById(uid: string): Promise<any> {
    return await UserModel.findById(uid);
  }

  /**
   * Creates a new user in the database.
   * @param user The json representation of user object.
   * @returns The newly created user object.
   */
  async createUser(user: User): Promise<User> {
    return await UserModel.create(user);
  }

  /**
   * Deletes an existing user in the database.
   * @param uid The user id for of the user being deleted.
   * @returns The JSON object with delete count.
   */
  async deleteUser(uid: string): Promise<any> {
    const response =  await UserModel.deleteOne({ _id: uid });
    await UserReviewModel.deleteMany({reviewedBy : uid});
    return response;
  }

  /**
   * Deletes an existing user in the database based on the email.
   * @param username The username for of the user being deleted.
   * @returns The JSON object with delete count.
   */
  async deleteUserByEmail(email: string): Promise<any> {
    return await UserModel.deleteMany({ email: email });
  }

  /**
   * Updates the existing user in the database.
   * @param uid The user id for the user being updated.
   * @param user The new user data in the form of request body.
   * @returns The newly created user object.
   */
  async updateUser(uid: string, user: User): Promise<any> {
    return await UserModel.updateOne({ _id: uid }, { $set: user });
  }
}

