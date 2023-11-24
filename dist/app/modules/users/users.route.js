"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User_Routes = void 0;
const express_1 = __importDefault(require("express"));
const users_controller_1 = require("./users.controller");
const router = express_1.default.Router();
router.post('/users', users_controller_1.User_Controller.createUser);
router.get('/users', users_controller_1.User_Controller.getAllUsers);
router.get('/users/:userId', users_controller_1.User_Controller.getSingleUser);
router.put('/users/:userId', users_controller_1.User_Controller.updateUser);
router.delete('/users/:userId', users_controller_1.User_Controller.deleteSingleUser);
router.put('/users/:userId/orders', users_controller_1.User_Controller.createOrder);
router.get('/users/:userId/orders', users_controller_1.User_Controller.getAllOrders);
router.get('/users/:userId/orders/total-price', users_controller_1.User_Controller.getTotalPriceOfOrders);
exports.User_Routes = router;
