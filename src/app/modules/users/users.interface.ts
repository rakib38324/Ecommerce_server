/* eslint-disable no-unused-vars */
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

//-======================== for creating static ==========================
export interface UsersModel extends Model<User_Type> {
  isUserExists(id: number): Promise<User_Type | null>;
}

// export type User_Method = {
//   // eslint-disable-next-line no-unused-vars
//   isUserExists(id: number): Promise<User_Type | null>;
// };

// export type UsersModel = Model<User_Type, Record<string, never>, User_Method>;
