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

const deleteSingleUserintoDB = async (userId: string) => {
  const id = Number(userId);
  const result = await User_Model.deleteOne({ userId: id });
  return result;
};

const updateUserIntoDB = async (userId: string, payload: User_Type) => {
  try {
    const id = Number(userId);
    const result = await User_Model.findOneAndUpdate({ userId: id }, payload, {
      new: true,
    });
    if(!result){
      throw Error("User not Found!!!");
    }
    return result;
  } catch (error) {
    console.log(error)
    throw Error("User not found!!")
  }

};


export const User_Services = {
  createUserintoDB,
  getAllUserintoDB,
  getSingleUserintoDB,
  deleteSingleUserintoDB,
  updateUserIntoDB
};


// const result = await User.findByIdAndUpdate({ _id: id }, payload, {
//    new: true,
//  });
//  return result;