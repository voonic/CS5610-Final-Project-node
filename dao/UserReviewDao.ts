import UserReviewDaoI from "../interfaces/UserReviewDaoI";
import ReviewType from "../models/ReviewType";
import UserReview from "../models/UserReview";
import UserReviewModel from "../mongoose/UserReviewModel";

export default class UserReviewDao implements UserReviewDaoI{

  findReviewByMoviewIdAndType = async (mId: string, type: ReviewType): Promise<UserReview[]> => {
    const res = await UserReviewModel.find({movieId : mId, reviewType : type}).populate("reviewedBy");
    return res;

  }
  findReviewByMovieId = async (mId: String) : Promise<UserReview[]> => {
      const res = await UserReviewModel.find({movieId : mId}).populate("reviewedBy");
      return res;
    
  }
  findReviewByUserId =  async (uId: string): Promise<UserReview[]> => {
    const res = await UserReviewModel.find({reviewedBy : uId}).populate("reviewedBy");;
    return res;
    }
  createReview = async (newReview: UserReview): Promise<any> => {
    const res = await UserReviewModel.create(newReview);
    return res;

  }
  deleteReviewById = async (rId: string): Promise<any> => {

    const res = await UserReviewModel.deleteOne({_id : rId});
    return res;
  }
  updateReviewById = async (rId: string, newReview: UserReview): Promise<any> =>{
    const res = await UserReviewModel.updateOne({_id : rId},{$set: newReview});
    return res;
  }
}