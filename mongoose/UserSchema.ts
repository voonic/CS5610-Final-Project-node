import mongoose from "mongoose";
import AccountType from "../models/AccountType";
import User from "../models/User";

/**
 * @file A user schema for user model.
 */
const UserSchema = new mongoose.Schema<User>({
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String },
  profilePhoto: String,
  headerImage: String,
  biography: String,
  dateOfBirth: Date,
  joined: { type: Date, default: Date.now },
  accountType: { type: String, default: AccountType.Normal, enum: AccountType },
  followersCount: { type: Number, default: 0 },
  followingCount: { type: Number, default: 0 },
}, { collection: 'users' });

export default UserSchema;

