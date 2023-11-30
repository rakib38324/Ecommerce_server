/* eslint-disable @typescript-eslint/no-explicit-any */
import { User_Type, userOrderType } from './users.interface';
import { User_Model } from './users.model';

const createUserintoDB = async (user: User_Type) => {
  if (await User_Model.isUserExists(user.userId)) {
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
          orders:1,
          _id: 0,
        },
      },
    ]);
    return result[0];
  } else {
    throw new Error('The user not found!');
  }
};

const updateUserIntoDB = async (userId: string, payload: User_Type) => {
  const id = Number(userId);

  if (await User_Model.isUserExists(id)) {
    const update = await User_Model.findOneAndUpdate({ userId: id }, payload, {
      new: true,
    });

    if (update) {
      const result = await User_Model.aggregate([
        { $match: { userId: payload?.userId } },
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

  if (await User_Model.isUserExists(id)) {
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

  if (await User_Model.isUserExists(id)) {
    const result = await User_Model.findOne({ userId: id })

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
