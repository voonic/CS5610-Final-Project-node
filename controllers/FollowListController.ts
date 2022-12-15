import FollowListControllerI from "../interfaces/FollowListControllerI";
import {Express, Request, Response} from "express";
import FollowListDao from "../dao/FollowListDao";

export default class FollowListController implements FollowListControllerI{

    private static followListDao: FollowListDao = new FollowListDao();
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
            app.get("/user/:uid/followers/", FollowListController.followListController.findAllFollowers);
            app.get("/user/:uid/following/", FollowListController.followListController.findAllFollowing);
            app.post("/user/add/:uid",  FollowListController.followListController.addFollowing);
            app.delete("/user/delete/:uid", FollowListController.followListController.deleteFollowing);

        }
        return FollowListController.followListController;
    }

    /**
     * Responsible for adding a user to follow.
     * @param req  request containing the userId to find the user.
     * @param res response that is to be sent to the user.
     */
    addFollowing = async (req: Request, res: Response) => {
        const uid = req.params.uid;
        const status = await FollowListController.followListDao.addFollowing(uid);
        res.json(status);

    }

    /**
     * Responsible for deleting a user using their id from the following list.
     * @param req  request containing the userId to find the user.
     * @param res response that is to be sent to the user.
     */
    deleteFollowing = async (req: Request, res: Response) => {
        const uid = req.params.uid;
        const status = await FollowListController.followListDao.deleteFollowing(uid);
        res.json(status);
    }

    /**
     * Responsible for finding all users in followers list using a user id.
     * @param req  request containing the userId to find the user.
     * @param res response that is to be sent to the user.
     */
    findAllFollowers = async (req: Request, res: Response) => {
        const uid = req.params.uid;
        const result = await FollowListController.followListDao.findAllFollowers(uid);
        res.json(result);
    }

    /**
     * Responsible for finding all users in following list using a user id.
     * @param req  request containing the userId to find the user.
     * @param res response that is to be sent to the user.
     */
    findAllFollowing = async (req: Request, res: Response) => {
        const uid = req.params.uid;
        const result = await FollowListController.followListDao.findAllFollowing(uid);
        res.json(result);
    }


}