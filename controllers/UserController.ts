import { Express, Request, Response } from "express";
import UserDao from "../dao/UserDao";
import UserControllerI from "../interfaces/UserControllerI";


/**
 * Authentication controller that registers the user
 * auth relate APIs to performs sign up and sign in.
 */
export default class UserController implements UserControllerI {
    private static userDao: UserDao = new UserDao();
    private static userController: UserController | null = null;

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
    public static getInstance = (app: Express): UserController => {
        if (UserController.userController === null) {
            UserController.userController = new UserController();
            app.get("/user/:uid", UserController.userController.findUserById);
            app.put("/user/:uid",  UserController.userController.updateUser);
        }
        return UserController.userController;
    }

    findUserById = async (req: Request, res: Response) => {
        const uId = req.params.uid;
        const result = await UserController.userDao.findUserById(uId);
        res.json(result);
    }

    updateUser = async (req: Request, res: Response) => {
        const uid = req.params.uid;
        const user = req.body;
        const result = await UserController.userDao.updateUser(uid, user);
        console.log('trying to update the user dob');
        res.json(result);
    }



  }