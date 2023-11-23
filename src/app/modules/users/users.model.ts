import { Schema, model } from 'mongoose';
import { User_Type, userAddressType, userNameType, userOrderType } from './users.interface';


// Define the subdocument schema for fullName
const FullNameSchema = new Schema<userNameType>({
    firstName: { type: String, required: [true, "First is required."] },
    lastName: { type: String, required: [true, "Last is required."] },
}, { _id: false });

// Define the subdocument schema for address
const AddressSchema = new Schema<userAddressType>({
    street: { type: String, required: [true, "Street is required."] },
    city: { type: String, required: [true, "City is required."] },
    country: { type: String, required: [true, "Country is required."] },
}, { _id: false });

// Define the subdocument schema for order
const OrderSchema = new Schema<userOrderType>({
    productName: { type: String, required: [true, "Product name is required."] },
    price: { type: Number, required: [true, "Price is required."] },
    quantity: { type: Number, required: [true, "Quantity ID is required."] },
}, { _id: false });


const Users_Schema = new Schema<User_Type>({
    userId: { type: Number, required: [true, "User ID is required."] },
    username: { type: String, required: [true, "Username is required."] },
    password: { type: String, required: [true, "Password is required."] },
    fullName: { type: FullNameSchema },
    age: { type: Number, required: [true, "Age is required."] },
    email: { type: String, required: [true, "Email is required."] },
    isActive: {
        type: Boolean,
        required: [true, "User status is required."],
    },
    hobbies: { type: [String], required: [true, "Hobbies are required."] },
    address: {
        type: AddressSchema,
        required: [true, "Address is required."],
    },
    order: {
        type: [OrderSchema]
    },
});


export const User_Model = model<User_Type>('User', Users_Schema)
