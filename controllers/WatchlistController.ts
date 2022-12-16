import { Express,Request, Response } from "express";
import WatchlistDao from "../dao/WatchlistDao";

import WatchlistControllerI from "../interfaces/WatchlistControllerI";

/**
 * WatchlistController to handle insertion and deletion of movies in the user watchlist.
 */
class WatchlistController implements WatchlistControllerI{
  private static watchlistDao: WatchlistDao = new WatchlistDao();
  private static watchlistController: WatchlistController | null = null;

  /**
   * Private constructor because we want singleton pattern to be used
   * for creating object of this class.
   */
  private constructor(){}

  /**
   * Creates singleton controller instance.
   * @param {Express} app Express instance to declare the RESTful Web service.
   * API
   * @return UserReviewController.
   */
  public static getInstance = (app: Express): WatchlistController => {
    if (WatchlistController.watchlistController === null) {
      WatchlistController.watchlistController = new WatchlistController();
      app.post("/watchlist/:uId/:mId", WatchlistController.watchlistController.toggleMovieInWatchlist);
      app.get("/watchlist/:uId", WatchlistController.watchlistController.fetchAllMoviesInWatchlist);
      app.get("/watchlist/:uId/:mId",WatchlistController.watchlistController.isMoviewInWatchlist);
    }
    return WatchlistController.watchlistController;
  }

  /**
   * Responsible for finding all the movies in the watchlist.
   * @param req  request containing the userId to find the movies.
   * @param res response that is to be sent to the user.
   */
  fetchAllMoviesInWatchlist = async (req: Request, res: Response)=> {
    const userId = req.params.uId;
    const result =await  WatchlistController.watchlistDao.fetchAllMoviesInWatchlist(userId);
    res.json(result);
  }


  /**
   * Responsible for adding and removing a movie in a user's watchlist.
   * @param req  request containing the userId , movie id and the movie object.
   * @param res response that is to be sent to the user.
   */
  toggleMovieInWatchlist = async(req: Request, res: Response) => {
    const userId = req.params.uId;
    const movieId = req.params.mId;
    const movie = req.body;
    const result = await WatchlistController.watchlistDao.toggleMovieInWatchlist(userId,movieId, movie);
    res.json(result);
  }

  /**
   * Responsible for finding if the movie exists in the watchlist.
   * @param req  request containing the userId, movie id to find the reviews.
   * @param res response that is to be sent to the user.
   */
  isMoviewInWatchlist = async(req: Request, res: Response)=> {
    const userId = req.params.uId;
    const movieId = req.params.mId;
    const result = await WatchlistController.watchlistDao.isMoviewInWatchlist(userId,movieId);
    res.json(result);
  }

}

export default WatchlistController;