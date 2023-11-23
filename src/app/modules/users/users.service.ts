import { User_Type } from './users.interface';
import { User_Model } from './users.model';

const createUserintoDB = async (user: User_Type) => {

  //================== instrance =================
  const userInstrance = new User_Model(user);

  if (await userInstrance.isUserExists(user.userId)) {
    throw new Error(
      'The user already exists!!!, Please check your userId. It needs to be unique...',
    );
  }
 

  const result = await userInstrance.save(); //built in instrance method

  return result;
};

const getAllUserintoDB = async () => {
  const result = await User_Model.find();
  return result;
};
const getSingleUserintoDB = async (userId: string) => {
  const id = Number(userId);
  const result = await User_Model.findOne({ userId: id });

  return result;
};

const deleteSingleUserintoDB = async (userId: unknown) => {
  const result = await User_Model.deleteOne({ userId });
  return result;
};

export const User_Services = {
  createUserintoDB,
  getAllUserintoDB,
  getSingleUserintoDB,
  deleteSingleUserintoDB,
};


// const result = await User.findByIdAndUpdate({ _id: id }, payload, {
//    new: true,
//  });
//  return result;