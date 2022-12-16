import { Response, Request } from "express";

/**
 * Interface that does basic actions on the watchlist.
 */
export default interface WatchlistControllerI {
  fetchAllMoviesInWatchlist (req :Request, res : Response) : void;
  toggleMovieInWatchlist (req :Request, res : Response) : void;
  isMoviewInWatchlist (req :Request, res : Response) : void;
}