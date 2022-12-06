import { Request, Response } from "express";

/**
 * An controller interface that register url patterns for
 * APIs related to perform signin and sign up operations.
 */
export default interface AuthControllerI {
  signup(req: Request, res: Response): void;
  signin(req: Request, res: Response): void;
  signout(req: Request, res: Response): void;
  profile(req: Request, res: Response): void;
};