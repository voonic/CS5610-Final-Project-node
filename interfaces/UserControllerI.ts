import {Request, Response} from "express";
import User from "../models/User";

/**
 * An interface that provides common operations that
 * can be done on the users collection.
 */
export default interface UserControllerI {
  findUserById(req: Request, res: Response): void;
  updateUser(req: Request, res: Response): void;
  findAllUsers(req: Request, res: Response): void;
  findUserByEmail(req: Request, res: Response): void;
  createUser(req: Request, res: Response): void;
  deleteUser(req: Request, res: Response): void;
  deleteUserByEmail(req: Request, res: Response): void;
}