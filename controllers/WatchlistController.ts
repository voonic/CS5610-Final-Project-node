import { Express,Request, Response } from "express";
import WatchlistDao from "../dao/WatchlistDao";

import WatchlistControllerI from "../interfaces/WatchlistControllerI";


class WatchlistController implements WatchlistControllerI{
  private static watchlistDao: WatchlistDao = new WatchlistDao();
  private static watchlistController: WatchlistController | null = null;

  private constructor(){}

  public static getInstance = (app: Express): WatchlistController => {
    if (WatchlistController.watchlistController === null) {
      WatchlistController.watchlistController = new WatchlistController();
      app.post("/watchlist/:uId/:mId", WatchlistController.watchlistController.toggleMovieInWatchlist);
      app.get("/watchlist/:uId", WatchlistController.watchlistController.fetchAllMoviesInWatchlist);
      app.get("/watchlist/:uId/:mId/",WatchlistController.watchlistController.isMoviewInWatchlist);
    }
    return WatchlistController.watchlistController;
  }

  fetchAllMoviesInWatchlist = async (req: Request, res: Response)=> {
    const userId = req.params.uId;
    const result =await  WatchlistController.watchlistDao.fetchAllMoviesInWatchlist(userId);
    res.json(result);
  }


  toggleMovieInWatchlist = async(req: Request, res: Response) => {
    const userId = req.params.uId;
    const movieId = req.params.mId;
    console.log("UId",userId, movieId);

    const result = await WatchlistController.watchlistDao.toggleMovieInWatchlist(userId,movieId);
    res.json(result);
  }

  
  isMoviewInWatchlist = async(req: Request, res: Response)=> {
    const userId = req.params.uId;
    const movieId = req.params.mId;
    const result = await WatchlistController.watchlistDao.isMoviewInWatchlist(userId,movieId);
    res.json(result);
  }

}

export default WatchlistController;