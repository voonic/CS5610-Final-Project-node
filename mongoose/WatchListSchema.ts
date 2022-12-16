import mongoose from "mongoose";
import Watchlist from "../models/Watchlist";

/**
 * schema for watch list.
 */
const WatchlistSchema = new mongoose.Schema<Watchlist>({
  addedBy : {type : mongoose.Schema.Types.ObjectId, ref:"UserModel",required :true},
  movieId : {type : Number, required : true},
  addTime : {type : Date, default :Date.now},
  movie : {type : Object},
}, {collection : "watchlist"});

export default WatchlistSchema;