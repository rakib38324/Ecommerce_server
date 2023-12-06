"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationSchema = void 0;
const zod_1 = require("zod");
const userNameValidationSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(1).max(20),
    lastName: zod_1.z.string().min(1).max(20),
});
const userAddressValidationSchema = zod_1.z.object({
    street: zod_1.z.string().min(1).max(100),
    city: zod_1.z.string().min(1).max(100),
    country: zod_1.z.string().min(1).max(100),
});
const userOrderValidationSchema = zod_1.z.object({
    productName: zod_1.z.string().min(1).max(100),
    price: zod_1.z.number().min(0),
    quantity: zod_1.z.number().min(1),
});
const Users_Validation_Schema = zod_1.z.object({
    userId: zod_1.z.number().min(1),
    username: zod_1.z.string().min(1).max(20),
    password: zod_1.z.string().min(1).max(200),
    fullName: userNameValidationSchema,
    age: zod_1.z.number().min(1),
    email: zod_1.z.string().min(1).max(50).email('Invalid email format.'),
    isActive: zod_1.z.boolean(),
    hobbies: zod_1.z.array(zod_1.z.string().min(1).max(20)),
    address: userAddressValidationSchema,
    orders: zod_1.z.array(userOrderValidationSchema).optional(),
});
const updateUserNameValidationSchema = zod_1.z
    .object({
    firstName: zod_1.z.string().min(1).max(20).optional(),
    lastName: zod_1.z.string().min(1).max(20).optional(),
})
    .optional();
const UpdateUserAddressValidationSchema = zod_1.z
    .object({
    street: zod_1.z.string().min(1).max(100).optional(),
    city: zod_1.z.string().min(1).max(100).optional(),
    country: zod_1.z.string().min(1).max(100).optional(),
})
    .optional();
const UpdateUserOrderValidationSchema = zod_1.z.object({
    productName: zod_1.z.string().min(1).max(100).optional(),
    price: zod_1.z.number().min(0).optional(),
    quantity: zod_1.z.number().min(1).optional(),
});
const Update_Users_Validation_Schema = zod_1.z.object({
    userId: zod_1.z.number().min(1).optional(),
    username: zod_1.z.string().min(1).max(20).optional(),
    password: zod_1.z.string().min(1).max(200).optional(),
    fullName: updateUserNameValidationSchema,
    age: zod_1.z.number().min(1).optional(),
    email: zod_1.z.string().min(1).max(50).email('Invalid email format.').optional(),
    isActive: zod_1.z.boolean().optional(),
    hobbies: zod_1.z.array(zod_1.z.string().min(1).max(20)).optional(),
    address: UpdateUserAddressValidationSchema,
    orders: zod_1.z.array(UpdateUserOrderValidationSchema).optional(),
});
exports.ValidationSchema = {
    Users_Validation_Schema,
    Update_Users_Validation_Schema,
};
