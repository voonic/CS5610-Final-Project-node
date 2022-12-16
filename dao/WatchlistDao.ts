import WatchlistDaoI from "../interfaces/WatchlistDaoI";
import Watchlist from "../models/Watchlist";
import WatchlistModel from "../mongoose/WatchlistModel";


export default class WatchlistDao implements WatchlistDaoI{


  fetchAllMoviesInWatchlist =async (uID: String, mId: String): Promise<Watchlist[]> =>{
    const res = await WatchlistModel.find({addedBy : uID, movieId : mId}).populate("addedBy");
    return res;
  }


  toggleMovieInWatchlist = async (uId: String, mId: String): Promise<any> => {
    const list = await this.isMoviewInWatchlist(uId,mId);

    if(list.length > 0){
      const res = await WatchlistModel.deleteOne({addedBy : uId , movieId : mId})

    }else{
      const newReview = {
        "addedBy" : uId,
        "movieID" : mId,
      } 
     const res =  await WatchlistModel.create(newReview);
     return res;
    }

  }


  isMoviewInWatchlist = async (uId: String, mId: String): Promise<any> =>{
    const res = await WatchlistModel.find({addedBy :uId, movieId : mId});
    return res;
  }

}