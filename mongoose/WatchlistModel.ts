import mongoose from "mongoose";
import WatchlistSchema from "./WatchListSchema";

/**
 * data model for watch list.
 */
const WatchlistModel = mongoose.model("WatchlistModel", WatchlistSchema);

export default WatchlistModel;