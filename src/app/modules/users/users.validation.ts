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

export default Users_Validation_Schema;
