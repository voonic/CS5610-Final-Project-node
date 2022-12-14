import FollowListControllerI from "../interfaces/FollowListControllerI";
import {Express, Request, Response} from "express";
import UserDao from "../dao/UserDao";
import User from "../models/User";

export default class FollowListController implements FollowListControllerI{

    private static userDao: UserDao = new UserDao();
    private static followListController: FollowListController | null = null;

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
            app.get("/follow/find/followers", FollowListController.followListController.findAllFollowers);
            app.get("/follow/find/following", FollowListController.followListController.findAllFollowing);
            app.post("/follow/add/:uid",  FollowListController.followListController.addFollowing);
            app.get("/user/find/following/:uid", FollowListController.followListController.findFollowingByUserId)
            app.get("/user/find/follower/:uid", FollowListController.followListController.findFollowerByUserId);
            app.delete("/follow/delete/:uid", FollowListController.followListController.deleteFollowing);

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