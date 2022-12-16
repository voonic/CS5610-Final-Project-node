import Watchlist from "../models/Watchlist";

/**
 * An interface to do the functionalities like fetching and modifying the adding to playlist.
 */
export default interface WatchlistDaoI{
  fetchAllMoviesInWatchlist (uId : String) : Promise<Watchlist[]>;
  toggleMovieInWatchlist (uId : String, mId :String) : Promise<any>;
  isMoviewInWatchlist (uId : String, mId :String) : Promise<any>;

}