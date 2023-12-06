/* eslint-disable @typescript-eslint/no-explicit-any */
import config from '../../config';
import { User_Type, userOrderType } from './users.interface';
import { User_Model } from './users.model';
import bcrypt from 'bcrypt';

const createUserintoDB = async (user: User_Type) => {
  const userExists = await User_Model.isUserExists(user.userId);
  if (userExists) {
    throw new Error('The user already exists!, Duplicate userId');
  }

  await User_Model.create(user);
  const result = await User_Model.aggregate([
    { $match: { userId: user.userId } },
    {
      $project: {
        username: 1,
        userId: 1,
        fullName: 1,
        age: 1,
        email: 1,
        isActive: 1,
        hobbies: 1,
        address: 1,
        _id: 0,
      },
    },
  ]);
  return result[0];
};

const getAllUserintoDB = async () => {
  const result = await User_Model.aggregate([
    { $match: {} },
    {
      $project: {
        username: 1,
        fullName: 1,
        age: 1,
        email: 1,
        address: 1,
        _id: 0,
      },
    },
  ]);

  return result;
};

const getSingleUserintoDB = async (userId: string) => {
  const id = Number(userId);

  if (await User_Model.isUserExists(id)) {
    const result = await User_Model.aggregate([
      { $match: { userId: id } },
      {
        $project: {
          userId: 1,
          username: 1,
          fullName: 1,
          age: 1,
          email: 1,
          isActive: 1,
          hobbies: 1,
          address: 1,
          orders: 1,
          _id: 0,
        },
      },
    ]);
    return result[0];
  } else {
    throw new Error('The user not found!');
  }
};

const updateUserIntoDB = async (userId: string, payload: any) => {
  const id = Number(userId);
  const userExists = await User_Model.isUserExists(id);
  if (userExists) {
    if (payload?.password) {
      const updatePassword = await bcrypt.hash(
        payload?.password,
        Number(config.bcrypt_salt_round),
      );

      payload.password = updatePassword;
    }

    const update = await User_Model.findOneAndUpdate({ userId: id }, payload, {
      new: true,
    });

    if (update?.userId) {
      const result = await User_Model.aggregate([
        { $match: { userId: update?.userId } },
        {
          $project: {
            userId: 1,
            username: 1,
            fullName: 1,
            age: 1,
            email: 1,
            isActive: 1,
            hobbies: 1,
            address: 1,
            _id: 0,
          },
        },
      ]);
      return result[0];
    } else {
      throw new Error('User not Found!');
    }
  } else {
    throw new Error('User not Found!');
  }
};

const deleteSingleUserintoDB = async (userId: string) => {
  const id = Number(userId);
  const userExists = await User_Model.isUserExists(id);

  if (userExists) {
    const result = await User_Model.deleteOne({ userId: id });

    if (result.deletedCount === 1) {
      return result;
    } else {
      throw new Error('Something is Wrong!');
    }
  } else {
    throw new Error('User not found!');
  }
};

const createOrderIntoDB = async (userId: string, payload: userOrderType) => {
  const id = Number(userId);
  const userExists = await User_Model.isUserExists(id);

  if (userExists) {
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
  const userExists = await User_Model.isUserExists(id);

  if (userExists) {
    const result = await User_Model.aggregate([
      { $match: { userId: id } },
      {
        $project: {
          orders: 1,
          _id: 0,
        },
      },
    ]);
    return result[0];
  } else {
    throw new Error('User not Found!');
  }
};

const getTotalPriceOfOrderIntoDB = async (userId: string) => {
  const id = Number(userId);
  const userExists = await User_Model.isUserExists(id);

  if (userExists) {
    const result = await User_Model.findOne({ userId: id });

    const totalPrice = result?.orders?.reduce((acc, product) => {
      const productTotal = product.price * product.quantity;
      return acc + productTotal;
    }, 0);
    return Number(totalPrice?.toFixed(2));
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
