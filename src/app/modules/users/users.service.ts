import { User_Type } from "./users.interface";
import { User_Model } from "./users.model";

const createUserintoDB = async (user: User_Type) => {
   const result =  await User_Model.create(user);
   return result;
};

const getAllUserintoDB = async () => {
   const result =  await User_Model.find();
   return result;
};
const getSingleUserintoDB = async (userId: unknown) => {
   const result =  await User_Model.findOne({userId});
   return result;
};

export const User_Services = {
    createUserintoDB,
    getAllUserintoDB,
    getSingleUserintoDB
}