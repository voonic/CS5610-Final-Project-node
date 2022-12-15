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
            app.get("/user/:email", UserController.userController.findUserByEmail);
            app.put("/user/:uid", UserController.userController.updateUser);
            app.post("/user/create", UserController.userController.createUser);
            app.get("/user/all", UserController.userController.findAllUsers);
            app.delete("/user/:uid", UserController.userController.deleteUser);
            app.delete("/user/:email", UserController.userController.deleteUserByEmail);
        }
        return UserController.userController;
    }

    /**
     * Responsible for finding a user using their id.
     * @param req  request containing the userId to find the user.
     * @param res response that is to be sent to the user.
     */
    findUserById = async (req: Request, res: Response) => {
        const uId = req.params.uid;
        const result = await UserController.userDao.findUserById(uId);
        res.json(result);
    }

    /**
     * Responsible for updating an existing user using their id.
     * @param req  request containing the userId to find the user.
     * @param res response that is to be sent to the user after updating the user.
     */
    updateUser = async (req: Request, res: Response) => {
        const uid = req.params.uid;
        const user = req.body;
        const result = await UserController.userDao.updateUser(uid, user);
        res.json(result);
    }

    /**
     * Responsible for creating a user in the database.
     * @param req  request containing the user details in the body.
     * @param res response that is to be sent as a new user.
     */
    createUser = async (req: Request, res: Response) => {
        const user = req.body;
        const result = await UserController.userDao.createUser(user);
        res.json(result);
    }

    /**
     * Responsible for deleting an existing user using their id.
     * @param req  request containing the userId to find the user.
     * @param res response that is to be sent to the user post deletion.
     */
    deleteUser = async (req: Request, res: Response) => {
        const uid = req.params.uid;
        const result = await UserController.userDao.deleteUser(uid);
        res.json(result);
    }

    /**
     * Responsible for deleting a user using their email.
     * @param req  request containing the user email to find the user.
     * @param res response that is to be sent to the user post deletion.
     */
    deleteUserByEmail = async (req: Request, res: Response) => {
        const email = req.params.email;
        const result = await UserController.userDao.deleteUser(email);
        res.json(result);
    }

    /**
     * Responsible for finding all users in the database.
     * @param req  request.
     * @param res response that is to be sent to the user.
     */
    findAllUsers = async (req: Request, res: Response) => {
        const result = await UserController.userDao.findAllUsers();
        res.json(result);
    }

    /**
     * Responsible for finding a user using their email.
     * @param req  request containing the user email to find the user.
     * @param res response that is to be sent to the user.
     */
    findUserByEmail = async (req: Request, res: Response) => {
        const email = req.params.email;
        const result = await UserController.userDao.findUserById(email);
        res.json(result);
    }



}