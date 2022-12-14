import FollowListControllerI from "../interfaces/FollowListControllerI";
import {Request, Response} from "express";

export default class FollowListController implements FollowListControllerI{
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