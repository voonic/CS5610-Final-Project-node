import { Express, Request, Response } from "express";
import UserDao from "../dao/UserDao";
import UserControllerI from "../interfaces/UserControllerI";


/**
 * User controller that handles operations on the user related to adding ,updating user.
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
        res.json(result);
    }

    createUser = async (req: Request, res: Response) => {
        const user = req.body;
        const result = await UserController.userDao.createUser(user);
        res.json(result);
    }

    deleteUser = async (req: Request, res: Response) => {
        const uid = req.params.uid;
        const result = await UserController.userDao.deleteUser(uid);
        res.json(result);
    }

    deleteUserByEmail = async (req: Request, res: Response) => {
        const email = req.params.email;
        const result = await UserController.userDao.deleteUser(email);
        res.json(result);
    }

    findAllUsers = async (req: Request, res: Response) => {
        const result = await UserController.userDao.findAllUsers();
        res.json(result);
    }

    findUserByEmail = async (req: Request, res: Response) => {
        const email = req.params.email;
        const result = await UserController.userDao.findUserById(email);
        res.json(result);
    }



  }