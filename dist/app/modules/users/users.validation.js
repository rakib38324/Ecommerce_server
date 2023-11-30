'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const zod_1 = require('zod');
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
exports.default = Users_Validation_Schema;
