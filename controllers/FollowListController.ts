import FollowListControllerI from "../interfaces/FollowListControllerI";
import {Express, Request, Response} from "express";
import UserDao from "../dao/UserDao";

export default class FollowListController implements FollowListControllerI{

    private static userDao: UserDao = new UserDao();
    private static FollowListController: FollowListController | null = null;

    /**
     * Private constructor because we want singleton pattern to be used
     * for creating object of this class.
     */
    private constructor() { }

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return AuthController
     */
    public static getInstance = (app: Express): FollowListController => {
        if (FollowListController.followListController === null) {
            FollowListController.followListController = new FollowListController();
            app.get("/user/:uid", FollowListController.followListController.findUserById);
            app.put("/user/:uid",  FollowListController.followListController.updateUser);
        }
        return FollowListController.followListController;
    }

    addFollowing = async (req: Request, res: Response) => {

    }

    deleteFollowing = async (req: Request, res: Response) => {
    }

    findAllFollowers = async (req: Request, res: Response) => {
    }

    findAllFollowing = async (req: Request, res: Response) => {
    }

    findFollowerByUserId = async (req: Request, res: Response) => {
    }

    findFollowingByUserId = async (req: Request, res: Response) => {
    }

}