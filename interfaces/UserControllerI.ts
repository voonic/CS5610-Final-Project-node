import {Request, Response} from "express";

/**
 * An interface that provides common operations that
 * can be done on the users collection.
 */
export default interface UserControllerI {
  findUserById(req: Request, res: Response): void;
  updateUser(req: Request, res: Response): void;
}