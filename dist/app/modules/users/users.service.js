"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User_Services = void 0;
const users_model_1 = require("./users.model");
const createUserintoDB = (user) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield users_model_1.User_Model.isUserExists(user.userId)) {
        throw new Error('The user already exists!, Duplicate userId');
    }
    const result = yield users_model_1.User_Model.create(user);
    return result;
});
const getAllUserintoDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield users_model_1.User_Model.find();
    return result;
});
const getSingleUserintoDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(userId);
    if (yield users_model_1.User_Model.isUserExists(id)) {
        const result = yield users_model_1.User_Model.findOne({ userId: id });
        return result;
    }
    else {
        throw new Error('The user not fiund!');
    }
});
const deleteSingleUserintoDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(userId);
    if (yield users_model_1.User_Model.isUserExists(id)) {
        const result = yield users_model_1.User_Model.deleteOne({ userId: id });
        return result;
    }
    else {
        throw new Error('User not found!');
    }
});
const updateUserIntoDB = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(userId);
    if (yield users_model_1.User_Model.isUserExists(id)) {
        const result = yield users_model_1.User_Model.findOneAndUpdate({ userId: id }, payload, {
            new: true,
        });
        return result;
    }
    else {
        throw new Error('User not Found!');
    }
});
const createOrderIntoDB = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(userId);
    if (yield users_model_1.User_Model.isUserExists(id)) {
        const result = yield users_model_1.User_Model.findOneAndUpdate({ userId: id }, { $push: { orders: payload } }, { new: true });
        return result;
    }
    else {
        throw new Error('User not Found!');
    }
});
const getAllOrderIntoDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(userId);
    if (yield users_model_1.User_Model.isUserExists(id)) {
        const result = yield users_model_1.User_Model.findOne({ userId: id });
        return result === null || result === void 0 ? void 0 : result.orders;
    }
    else {
        throw new Error('User not Found!');
    }
});
const getTotalPriceOfOrderIntoDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(userId);
    if (yield users_model_1.User_Model.isUserExists(id)) {
        const result = yield users_model_1.User_Model.findOne({ userId: id });
        let totalPrice = 0;
        result === null || result === void 0 ? void 0 : result.orders.forEach((element) => {
            totalPrice += element.price * element.quantity;
        });
        return parseFloat(totalPrice.toFixed(2));
    }
    else {
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
// const result = await User.findByIdAndUpdate({ _id: id }, payload, {
//    new: true,
//  });
//  return result;
