/* eslint-disable @typescript-eslint/no-explicit-any */
import { User_Type, userOrderType } from './users.interface';
import { User_Model } from './users.model';

const createUserintoDB = async (user: User_Type) => {
  if (await User_Model.isUserExists(user.userId)) {
    throw new Error('The user already exists!, Duplicate userId');
  }

  const result = await User_Model.create(user);

  return result;
};

const getAllUserintoDB = async () => {
  const result = await User_Model.find();
  return result;
};

const getSingleUserintoDB = async (userId: string) => {
  const id = Number(userId);

  if (await User_Model.isUserExists(id)) {
    const result = await User_Model.findOne({ userId: id });
    return result;
  } else {
    throw new Error('The user not fiund!');
  }
};

const deleteSingleUserintoDB = async (userId: string) => {
  const id = Number(userId);

  if (await User_Model.isUserExists(id)) {
    const result = await User_Model.deleteOne({ userId: id });
    return result;
  } else {
    throw new Error('User not found!');
  }
};

const updateUserIntoDB = async (userId: string, payload: User_Type) => {
  const id = Number(userId);

  if (await User_Model.isUserExists(id)) {
    const result = await User_Model.findOneAndUpdate({ userId: id }, payload, {
      new: true,
    });
    return result;
  } else {
    throw new Error('User not Found!');
  }
};

const createOrderIntoDB = async (userId: string, payload: userOrderType) => {
  const id = Number(userId);

  if (await User_Model.isUserExists(id)) {
    const result = await User_Model.findOneAndUpdate(
      { userId: id },
      { $push: { orders: payload } },
      { new: true },
    );
    return result;
  } else {
    throw new Error('User not Found!');
  }
};

const getAllOrderIntoDB = async (userId: string) => {
  const id = Number(userId);

  if (await User_Model.isUserExists(id)) {
    const result = await User_Model.findOne({ userId: id });
    return result?.orders;
  } else {
    throw new Error('User not Found!');
  }
};

const getTotalPriceOfOrderIntoDB = async (userId: string) => {
  const id = Number(userId);

  if (await User_Model.isUserExists(id)) {
    const result = await User_Model.findOne({ userId: id });

    let totalPrice: number = 0;

    result?.orders.forEach((element) => {
      totalPrice += element.price * element.quantity;
    });

    return parseFloat(totalPrice.toFixed(2));
  } else {
    throw new Error('User not Found!');
  }
};

export const User_Services = {
  createUserintoDB,
  getAllUserintoDB,
  getSingleUserintoDB,
  deleteSingleUserintoDB,
  updateUserIntoDB,
  createOrderIntoDB,
  getAllOrderIntoDB,
  getTotalPriceOfOrderIntoDB,
};

// const result = await User.findByIdAndUpdate({ _id: id }, payload, {
//    new: true,
//  });
//  return result;
