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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User_Model = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
// Define the subdocument schema for fullName
const FullNameSchema = new mongoose_1.Schema({
    firstName: { type: String, required: [true, 'First is required.'] },
    lastName: { type: String, required: [true, 'Last is required.'] },
}, { _id: false });
// Define the subdocument schema for address
const AddressSchema = new mongoose_1.Schema({
    street: { type: String, required: [true, 'Street is required.'] },
    city: { type: String, required: [true, 'City is required.'] },
    country: { type: String, required: [true, 'Country is required.'] },
}, { _id: false });
// Define the subdocument schema for order
const OrderSchema = new mongoose_1.Schema({
    productName: {
        type: String,
        required: [true, 'Product name is required.'],
    },
    price: { type: Number, min: 1, required: [true, 'Price is required.'] },
    quantity: {
        type: Number,
        min: 1,
        required: [true, 'Quantity is required.'],
    },
}, { _id: false });
const Users_Schema = new mongoose_1.Schema({
    userId: {
        type: Number,
        unique: true,
        required: [true, 'User ID is required.'],
    },
    username: {
        type: String,
        unique: true,
        required: [true, 'Username is required.'],
    },
    password: { type: String, required: [true, 'Password is required.'] },
    fullName: { type: FullNameSchema },
    age: { type: Number, required: [true, 'Age is required.'] },
    email: { type: String, required: [true, 'Email is required.'] },
    isActive: {
        type: Boolean,
        default: true,
        required: [true, 'User status is required.'],
    },
    hobbies: { type: [String], required: [true, 'Hobbies are required.'] },
    address: {
        type: AddressSchema,
        required: [true, 'Address is required.'],
    },
    orders: {
        type: [OrderSchema],
    },
});
//==================== password encripting=========
Users_Schema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const user = this;
        user.password = yield bcrypt_1.default.hash(user.password, Number(config_1.default.bcrypt_salt_round));
        next();
    });
});
Users_Schema.post('save', function (doc, next) {
    Users_Schema.set('toJSON', {
        transform: function (doc, ret) {
            delete ret.password;
            delete ret._id;
            delete ret.__v;
            return ret;
        },
    });
    next();
});
Users_Schema.post('findOne', function (doc, next) {
    Users_Schema.set('toJSON', {
        transform: function (doc, ret) {
            delete ret.password;
            delete ret._id;
            delete ret.__v;
            return ret;
        },
    });
    next();
});
Users_Schema.post('find', function (doc, next) {
    Users_Schema.set('toJSON', {
        transform: function (doc, ret) {
            delete ret._id;
            delete ret.password;
            delete ret.userId;
            delete ret.isActive;
            delete ret.hobbies;
            delete ret.orders;
            delete ret.__v;
            return ret;
        },
    });
    next();
});
Users_Schema.post('findOneAndUpdate', function (doc, next) {
    Users_Schema.set('toJSON', {
        transform: function (doc, ret) {
            delete ret.password;
            delete ret._id;
            delete ret.__v;
            delete ret.orders;
            return ret;
        },
    });
    next();
});
// Users_Schema.methods.isUserExists = async function (userId: number) {
//   const exitingUser = await User_Model.findOne({ userId });
//   return exitingUser;
// };
//======================= creating a custom static method ======================
Users_Schema.statics.isUserExists = function (userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield exports.User_Model.findOne({ userId });
        return existingUser;
    });
};
exports.User_Model = (0, mongoose_1.model)('User', Users_Schema);
