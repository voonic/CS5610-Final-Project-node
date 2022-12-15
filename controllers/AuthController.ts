import { Express, Request, Response } from "express";
import UserDao from "../dao/UserDao";
import AuthControllerI from "../interfaces/AuthControllerI";
const bcrypt = require('bcrypt');
const saltRounds = 10;

/**
 * Authentication controller that registers the user
 * auth relate APIs to performs sign up and sign in.
 */
export default class AuthController implements AuthControllerI {
  private static userDao: UserDao = new UserDao();
  private static authController: AuthController | null = null;

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
  public static getInstance = (app: Express): AuthController => {
    if (AuthController.authController === null) {
      AuthController.authController = new AuthController();
      app.post("/auth/signin", AuthController.authController.signin);
      app.post("/auth/signup", AuthController.authController.signup);
      app.get("/auth/profile", AuthController.authController.profile);
      app.post("/auth/signout", AuthController.authController.signout);
    }
    return AuthController.authController;
  }

  /**
   * Responsible for signinup the user.
   * 
   * @param req Request containing details of the user.
   * @param res Response being sent to user
   * @returns Newly created user to end user.
   */
  signup = async (req: Request, res: Response) => {
    const newUser = req.body;
    const password = newUser.password;
    const hash = await bcrypt.hash(password, saltRounds);
    newUser.password = hash;
    const existingUser = await AuthController.userDao
      .findUserByEmail(req.body.email);
    if (existingUser) {
      res.sendStatus(403);
      return;
    } else {
      const insertedUser = await AuthController.userDao
        .createUser(newUser);
      insertedUser.password = '';
      //@ts-ignore
      req.session['profile'] = insertedUser;
      res.json(insertedUser);
    }
  }

  /**
   * Responsible for signinup the user.
   * 
   * @param req Request containing details of the user.
   * @param res Response being sent to user
   * @returns Newly created user to end user.
   */
  signin = async (req: Request, res: Response) => {
    const user = req.body;
    const email = user.email;
    const password = user.password;
    const existingUser = await AuthController.userDao
      .findUserByEmail(email);

    if (!existingUser) {
      res.sendStatus(403);
      return;
    }

    const match = await bcrypt
      .compare(password, existingUser.password);

    if (match) {
      existingUser.password = '*****';
      //@ts-ignore
      req.session['profile'] = existingUser;
      res.json(existingUser);
    } else {
      res.sendStatus(403);
    }
  }

  /**
   * Responsible for signinup the user.
   * 
   * @param req Request containing details of the user.
   * @param res Response being sent to user
   * @returns Newly created user to end user.
   */
  signout = async (req: Request, res: Response) => {
    //@ts-ignore
    req.session.destroy();
    res.sendStatus(200);
  }

  /**
   * Responsible for signinup the user.
   * 
   * @param req Request containing details of the user.
   * @param res Response being sent to user
   * @returns Newly created user to end user.
   */
  profile = async (req: Request, res: Response) => {
    //@ts-ignore
    const profile = req.session['profile'];
    if (profile) {
      profile.password = "";
      res.json(profile);
    } else {
      res.sendStatus(403);
    }
  }
}