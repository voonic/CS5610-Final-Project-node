import mongoose from "mongoose";
import WatchlistSchema from "./WatchListSchema";


const WatchlistModel = mongoose.model("WatchlistModel", WatchlistSchema);

export default WatchlistModel;