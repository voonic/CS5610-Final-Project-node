import { Express, Request, Response } from "express";
import AuthControllerI from "../interfaces/AuthControllerI";

/**
 * Authentication controller that registers the user
 * auth relate APIs to performs sign up and sign in.
 */
export default class AuthController implements AuthControllerI {

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
  }

  /**
   * Responsible for signinup the user.
   * 
   * @param req Request containing details of the user.
   * @param res Response being sent to user
   * @returns Newly created user to end user.
   */
  signin = async (req: Request, res: Response) => {
  }

  /**
   * Responsible for signinup the user.
   * 
   * @param req Request containing details of the user.
   * @param res Response being sent to user
   * @returns Newly created user to end user.
   */
  signout = async (req: Request, res: Response) => {
  }

  /**
   * Responsible for signinup the user.
   * 
   * @param req Request containing details of the user.
   * @param res Response being sent to user
   * @returns Newly created user to end user.
   */
  profile = async (req: Request, res: Response) => {
  }
}