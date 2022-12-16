import User from "./User";

/**
 * Interface representing the watchlist item.
 * @property {User} the user who added the movie to the watchlist.
 * @property {movieId} id of the movie in the watchlist.
 * @property {addTime} time when the user added the movie into the list.
 */
export default interface Watchlist{
  addedBy : User,
  movieId: Number,
  addTime : Date,

}