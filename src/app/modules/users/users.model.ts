import { Schema, model } from 'mongoose';
import {
  User_Method,
  User_Type,
  UsersModel,
  userAddressType,
  userNameType,
  userOrderType,
} from './users.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

// Define the subdocument schema for fullName
const FullNameSchema = new Schema<userNameType>(
  {
    firstName: { type: String, required: [true, 'First is required.'] },
    lastName: { type: String, required: [true, 'Last is required.'] },
  },
  { _id: false },
);

// Define the subdocument schema for address
const AddressSchema = new Schema<userAddressType>(
  {
    street: { type: String, required: [true, 'Street is required.'] },
    city: { type: String, required: [true, 'City is required.'] },
    country: { type: String, required: [true, 'Country is required.'] },
  },
  { _id: false },
);

// Define the subdocument schema for order
const OrderSchema = new Schema<userOrderType>(
  {
    productName: {
      type: String,
      required: [true, 'Product name is required.'],
    },
    price: { type: Number, required: [true, 'Price is required.'] },
    quantity: { type: Number, required: [true, 'Quantity ID is required.'] },
  },
  { _id: false },
);

const Users_Schema = new Schema<User_Type, UsersModel, User_Method>({
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
  email: { type: String, unique: true, required: [true, 'Email is required.'] },
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
    type: [OrderSchema]
  },
});

//==================== password encripting=========
Users_Schema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});


Users_Schema.post('save', function (doc, next) {
  Users_Schema.set('toJSON', {
    transform: function (doc, ret) {
      delete ret.password; // Exclude the password field from the response
      return ret;
    },
  });
  next();
});


Users_Schema.post('findOne', function (doc, next) {
  Users_Schema.set('toJSON', {
    transform: function (doc, ret) {
      delete ret.password; // Exclude the password field from the response
      return ret;
    },
  });
  next();
});

Users_Schema.post('find', function (doc, next) {
  Users_Schema.set('toJSON', {
    transform: function (doc, ret) {
      delete ret.password; // Exclude the password field from the response
      return ret;
    },
  });
  next();
});

Users_Schema.post('findOneAndUpdate', function (doc, next) {
  Users_Schema.set('toJSON', {
    transform: function (doc, ret) {
      delete ret.password; // Exclude the password field from the response
      return ret;
    },
  });
  next();
});


Users_Schema.methods.isUserExists = async function (userId: number) {
  const exitingUser = await User_Model.findOne({ userId });

  return exitingUser;
};

export const User_Model = model<User_Type, UsersModel>('User', Users_Schema);
