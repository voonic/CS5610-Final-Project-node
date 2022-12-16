import WatchlistDaoI from "../interfaces/WatchlistDaoI";
import Watchlist from "../models/Watchlist";
import WatchlistModel from "../mongoose/WatchlistModel";

/**
 * DAO for storing the watch list with functions like view watchlist or create watchlist, etc.
 */
export default class WatchlistDao implements WatchlistDaoI{


  /**
   * fetches all movies in the watchlist of the user.
   * @param uId  user id
   */
  fetchAllMoviesInWatchlist =async (uId: String): Promise<Watchlist[]> =>{
    const res = await WatchlistModel.find({addedBy : uId}).populate("addedBy");
    return res;
  }

  /**
   * toggles between add and remove in a watchlist
   * @param uId user id
   * @param mId movie id
   * @param movie movie object
   */
  toggleMovieInWatchlist = async (uId: String, mId: String , movie : any): Promise<any> => {
    const list = await this.isMoviewInWatchlist(uId,mId);

    if(list.length > 0){
      const res = await WatchlistModel.deleteOne({addedBy : uId , movieId : mId})
      return res;

    }else{
      const newWatchlist = {
        "addedBy" : uId,
        "movieId" : mId,
        "movie" :movie
      } 
     const res =  await WatchlistModel.create(newWatchlist);
     return res;
    }

  }

  /**
   * checks if movie is in watchlist or not.
   * @param uId user id
   * @param mId movie id
   */
  isMoviewInWatchlist = async (uId: String, mId: String): Promise<any> =>{
    const res = await WatchlistModel.find({addedBy :uId, movieId : mId});
    return res;
  }

}