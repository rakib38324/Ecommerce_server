import { Model } from 'mongoose';

export type userNameType = {
  firstName: string;
  lastName: string;
};

export type userAddressType = {
  street: string;
  city: string;
  country: string;
};

export type userOrderType = {
  productName: string;
  price: number;
  quantity: number;
};

export type User_Type = {
  userId: number;
  username: string;
  password: string;
  fullName: userNameType;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: userAddressType;
  orders: userOrderType[];
};

export type User_Method = {
  isUserExists(id: number): Promise<User_Type | null>;
};

export type UsersModel = Model<User_Type, Record<string, never>, User_Method>;
