import { User_Type, userOrderType } from './users.interface';
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
  try {
    const id = Number(userId);
    const result = await User_Model.deleteOne({ userId: id });
    if (result.deletedCount === 0) {
      throw Error("User not Found!!!");
    }
    return result;
  } catch (error) {
    console.log(error)
    throw Error("User not found!!")
  }
};

const updateUserIntoDB = async (userId: string, payload: User_Type) => {
  try {
    const id = Number(userId);
    const result = await User_Model.findOneAndUpdate({ userId: id }, payload, {
      new: true,
    });
    if (!result) {
      throw new Error("User not Found!!!");
    }
    return result;
  } catch (error:any) {
    console.log(error)
    throw new Error(error)
  }

};

const createOrderIntoDB = async (userId: string, payload: userOrderType) => {
  try {

    const id = Number(userId);
    const result = await User_Model.findOneAndUpdate(
      { userId: id },
      { $push: { orders: payload } },
      { new: true });
    if (!result) {
      throw new Error("User not Found!!!");
    }
    return result;
  } catch (error:any) {
    console.log(error)
    throw new Error(error)
  }

};

const getAllOrderIntoDB = async (userId: string) => {
  try {
    
    const id = Number(userId);
    const result = await User_Model.findOne({userId: id});
    
    if (!result) {
      throw new Error("User not Found!!!");
    }
    return result?.orders;

  } 
  catch (error:any) {
    console.log(error)
    throw new Error(error)
  }

};



export const User_Services = {
  createUserintoDB,
  getAllUserintoDB,
  getSingleUserintoDB,
  deleteSingleUserintoDB,
  updateUserIntoDB,
  createOrderIntoDB,
  getAllOrderIntoDB
};


// const result = await User.findByIdAndUpdate({ _id: id }, payload, {
//    new: true,
//  });
//  return result;