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
exports.User_Controller = void 0;
const users_service_1 = require("./users.service");
const users_validation_1 = require("./users.validation");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const usersData = req.body;
        //=================== zod validation =================
        const Validated_data = users_validation_1.ValidationSchema.Users_Validation_Schema.parse(usersData);
        //================= will call the server ============
        const result = yield users_service_1.User_Services.createUserintoDB(Validated_data);
        //=====================> give the responce <=================
        res.status(200).json({
            success: true,
            message: 'User created successfully!',
            data: result,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: ((_a = error === null || error === void 0 ? void 0 : error.keyPattern) === null || _a === void 0 ? void 0 : _a.username) === 1 ? 'Duplicate!' : 'User not found.',
            error: {
                code: 404,
                description: (error === null || error === void 0 ? void 0 : error.keyValue) || (error === null || error === void 0 ? void 0 : error.message),
            },
        });
    }
});
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield users_service_1.User_Services.getAllUserintoDB();
        res.status(200).json({
            success: true,
            message: 'Users fetched successfully!',
            data: result,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: 'User not found',
            error: {
                code: 404,
                description: 'User not found!',
            },
        });
    }
});
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const result = yield users_service_1.User_Services.getSingleUserintoDB(userId);
        res.status(200).json({
            success: true,
            message: 'User fetched successfully!',
            data: result,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: 'User not found',
            error: {
                code: 404,
                description: (error === null || error === void 0 ? void 0 : error.message) || 'User not found!',
            },
        });
    }
});
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const usersData = req.body;
        const Validated_data = users_validation_1.ValidationSchema.Update_Users_Validation_Schema.parse(usersData);
        const result = yield users_service_1.User_Services.updateUserIntoDB(userId, Validated_data);
        res.status(200).json({
            success: true,
            message: 'User updated successfully!',
            data: result,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: (error === null || error === void 0 ? void 0 : error.codeName) ? error === null || error === void 0 ? void 0 : error.codeName : 'User not found',
            error: {
                code: 404,
                description: (error === null || error === void 0 ? void 0 : error.keyValue) || (error === null || error === void 0 ? void 0 : error.message),
            },
        });
    }
});
const deleteSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        yield users_service_1.User_Services.deleteSingleUserintoDB(userId);
        res.status(200).json({
            success: true,
            message: 'User deleted successfully!',
            data: null,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: 'User not found',
            error: {
                code: 404,
                description: (error === null || error === void 0 ? void 0 : error.message) || 'User not found!',
            },
        });
    }
});
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const order = req.body;
        if (order.quantity < 1) {
            throw new Error(`Product Quantity: ${order.quantity} not allow.`);
        }
        if (order.price < 1) {
            throw new Error(`Product Price: ${order.price} not allow.`);
        }
        yield users_service_1.User_Services.createOrderIntoDB(userId, order);
        res.status(200).json({
            success: true,
            message: 'Order created successfully!',
            data: null,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: 'User not found',
            error: {
                code: 404,
                description: (error === null || error === void 0 ? void 0 : error.message) || 'User not found!',
            },
        });
    }
});
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const result = yield users_service_1.User_Services.getAllOrderIntoDB(userId);
        res.status(200).json({
            success: true,
            message: 'Orders fetched successfully!',
            data: result,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: 'User not found',
            error: {
                code: 404,
                description: (error === null || error === void 0 ? void 0 : error.message) || 'User not found!',
            },
        });
    }
});
const getTotalPriceOfOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const totalPrice = yield users_service_1.User_Services.getTotalPriceOfOrderIntoDB(userId);
        res.status(200).json({
            success: true,
            message: 'Total price calculated successfully!',
            data: { totalPrice },
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: 'User not found',
            error: {
                code: 404,
                description: (error === null || error === void 0 ? void 0 : error.message) || 'User not found!',
            },
        });
    }
});
exports.User_Controller = {
    createUser,
    getAllUsers,
    getSingleUser,
    deleteSingleUser,
    updateUser,
    createOrder,
    getAllOrders,
    getTotalPriceOfOrders,
};
