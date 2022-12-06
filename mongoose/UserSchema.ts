import mongoose from "mongoose";
import User from "../models/User";

/**
 * @file A user schema for user model.
 */
const UserSchema = new mongoose.Schema<User>({
  email: { type: String, required: true },
  password: { type: String, required: true },
  firstName: { type: String },
  lastName: String,
  profilePhoto: String,
  headerImage: String,
  biography: String,
  dateOfBirth: Date,
  joined: { type: Date, default: Date.now },
  followersCount: { type: Number, default: 0 },
  followingCount: { type: Number, default: 0 },
}, { collection: 'users' });

export default UserSchema;

