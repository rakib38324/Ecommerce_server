import { z } from 'zod';

const userNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20),
  lastName: z.string().min(1).max(20),
});

const userAddressValidationSchema = z.object({
  street: z.string().min(1).max(100),
  city: z.string().min(1).max(100),
  country: z.string().min(1).max(100),
});

const userOrderValidationSchema = z.object({
  productName: z.string().min(1).max(100),
  price: z.number().min(0),
  quantity: z.number().min(1),
});

const Users_Validation_Schema = z.object({
  userId: z.number().min(1),
  username: z.string().min(1).max(20),
  password: z.string().min(1).max(200),
  fullName: userNameValidationSchema,
  age: z.number().min(1),
  email: z.string().min(1).max(50).email('Invalid email format.'),
  isActive: z.boolean(),
  hobbies: z.array(z.string().min(1).max(20)),
  address: userAddressValidationSchema,
  orders: z.array(userOrderValidationSchema).optional(),
});

const updateUserNameValidationSchema = z
  .object({
    firstName: z.string().min(1).max(20).optional(),
    lastName: z.string().min(1).max(20).optional(),
  })
  .optional();

const UpdateUserAddressValidationSchema = z
  .object({
    street: z.string().min(1).max(100).optional(),
    city: z.string().min(1).max(100).optional(),
    country: z.string().min(1).max(100).optional(),
  })
  .optional();

const UpdateUserOrderValidationSchema = z.object({
  productName: z.string().min(1).max(100).optional(),
  price: z.number().min(0).optional(),
  quantity: z.number().min(1).optional(),
});

const Update_Users_Validation_Schema = z.object({
  userId: z.number().min(1).optional(),
  username: z.string().min(1).max(20).optional(),
  password: z.string().min(1).max(200).optional(),
  fullName: updateUserNameValidationSchema,
  age: z.number().min(1).optional(),
  email: z.string().min(1).max(50).email('Invalid email format.').optional(),
  isActive: z.boolean().optional(),
  hobbies: z.array(z.string().min(1).max(20)).optional(),
  address: UpdateUserAddressValidationSchema,
  orders: z.array(UpdateUserOrderValidationSchema).optional(),
});

export const ValidationSchema = {
  Users_Validation_Schema,
  Update_Users_Validation_Schema,
};
