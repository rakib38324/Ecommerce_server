
export type userNameType = {
    firstName: string;
    lastName: string;
};

export type userAddressType ={
    street: string;
    city: string;
    country: string;
};

export type userOrderType =  {
    productName: string;
    price: number;
    quantity: number;
}

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
    order?:userOrderType[];
};

