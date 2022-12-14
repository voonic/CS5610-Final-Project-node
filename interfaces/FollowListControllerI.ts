import User from "../models/User";
import {Request, Response} from "express";

/**
 * An interface that provides common operations that can be performed on the FollowList collection.
 */
export default interface FollowListControllerI{

    findAllFollowers(req: Request, res: Response): void;
    findAllFollowing(req: Request, res: Response): void;
    addFollowing(req: Request, res: Response): void;
    deleteFollowing(req: Request, res: Response): void;
}