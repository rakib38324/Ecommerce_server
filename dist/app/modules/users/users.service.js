'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.User_Services = void 0;
const users_model_1 = require('./users.model');
const createUserintoDB = (user) =>
  __awaiter(void 0, void 0, void 0, function* () {
    if (yield users_model_1.User_Model.isUserExists(user.userId)) {
      throw new Error('The user already exists!, Duplicate userId');
    }
    yield users_model_1.User_Model.create(user);
    const result = yield users_model_1.User_Model.aggregate([
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
  });
const getAllUserintoDB = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield users_model_1.User_Model.aggregate([
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
  });
const getSingleUserintoDB = (userId) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(userId);
    if (yield users_model_1.User_Model.isUserExists(id)) {
      const result = yield users_model_1.User_Model.aggregate([
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
            _id: 0,
          },
        },
      ]);
      return result[0];
    } else {
      throw new Error('The user not found!');
    }
  });
const updateUserIntoDB = (userId, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(userId);
    if (yield users_model_1.User_Model.isUserExists(id)) {
      yield users_model_1.User_Model.findOneAndUpdate({ userId: id }, payload, {
        new: true,
      });
      const result = yield users_model_1.User_Model.aggregate([
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
            _id: 0,
          },
        },
      ]);
      return result[0];
    } else {
      throw new Error('User not Found!');
    }
  });
const deleteSingleUserintoDB = (userId) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(userId);
    if (yield users_model_1.User_Model.isUserExists(id)) {
      const result = yield users_model_1.User_Model.deleteOne({ userId: id });
      if (result.deletedCount === 1) {
        return result;
      } else {
        throw new Error('Something is Wrong!');
      }
    } else {
      throw new Error('User not found!');
    }
  });
const createOrderIntoDB = (userId, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(userId);
    if (yield users_model_1.User_Model.isUserExists(id)) {
      const result = yield users_model_1.User_Model.findOneAndUpdate(
        { userId: id },
        { $push: { orders: payload } },
        { new: true },
      );
      return result;
    } else {
      throw new Error('User not Found!');
    }
  });
const getAllOrderIntoDB = (userId) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(userId);
    if (yield users_model_1.User_Model.isUserExists(id)) {
      const result = yield users_model_1.User_Model.aggregate([
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
  });
const getTotalPriceOfOrderIntoDB = (userId) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(userId);
    if (yield users_model_1.User_Model.isUserExists(id)) {
      const result = yield users_model_1.User_Model.aggregate([
        {
          $unwind: '$orders',
        },
        {
          $group: {
            _id: null,
            totalPrice: {
              $sum: { $multiply: ['$orders.quantity', '$orders.price'] },
            },
          },
        },
        {
          $project: {
            _id: 0,
            totalPrice: { $round: ['$totalPrice', 2] },
          },
        },
      ]);
      return result[0];
    } else {
      throw new Error('User not Found!');
    }
  });
exports.User_Services = {
  createUserintoDB,
  getAllUserintoDB,
  getSingleUserintoDB,
  deleteSingleUserintoDB,
  updateUserIntoDB,
  createOrderIntoDB,
  getAllOrderIntoDB,
  getTotalPriceOfOrderIntoDB,
};
