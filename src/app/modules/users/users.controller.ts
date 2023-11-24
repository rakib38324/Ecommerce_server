/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { User_Services } from './users.service';
import Users_Validation_Schema from './users.validation';

const createUser = async (req: Request, res: Response) => {
  try {
    const { user: usersData } = req.body;

    //=================== zod validation =================
    const Validated_data = Users_Validation_Schema.parse(usersData);

    //================= will call the server ============
    const result = await User_Services.createUserintoDB(Validated_data);

    //=====================> give the responce <=================
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message:
        error?.keyPattern?.username === 1 ? 'Duplicate!' : 'User not found.',
      error: {
        code: 404,
        description: error?.keyValue || error?.message,
      },
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await User_Services.getAllUserintoDB();

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await User_Services.getSingleUserintoDB(userId);

    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: error?.message || 'User not found!',
      },
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { user: usersData } = req.body;

    const Validated_data = Users_Validation_Schema.parse(usersData);

    const result = await User_Services.updateUserIntoDB(userId, Validated_data);

    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error?.codeName ? error?.codeName : 'User not found',
      error: {
        code: 404,
        description: error?.keyValue || error?.message,
      },
    });
  }
};

const deleteSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await User_Services.deleteSingleUserintoDB(userId);
    console.log(result);

    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: error?.message || 'User not found!',
      },
    });
  }
};

const createOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const order = req.body;
    if (order.quantity < 1) {
      throw new Error(`Product Quantity: ${order.quantity} not allow.`);
    }
    if (order.price < 1) {
      throw new Error(`Product Price: ${order.price} not allow.`);
    }

    const result = await User_Services.createOrderIntoDB(userId, order);
    console.log(result);

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: null,
    });
  } catch (error: any) {
    // console.log(error);
    res.status(400).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: error?.message || 'User not found!',
      },
    });
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await User_Services.getAllOrderIntoDB(userId);

    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: error?.message || 'User not found!',
      },
    });
  }
};

const getTotalPriceOfOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await User_Services.getTotalPriceOfOrderIntoDB(userId);

    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: error?.message || 'User not found!',
      },
    });
  }
};

export const User_Controller = {
  createUser,
  getAllUsers,
  getSingleUser,
  deleteSingleUser,
  updateUser,
  createOrder,
  getAllOrders,
  getTotalPriceOfOrders,
};
