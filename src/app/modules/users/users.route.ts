import express from 'express';
import { User_Controller } from './users.controller';

const router = express.Router();

router.post('/users', User_Controller.createUser);

router.get('/users', User_Controller.getAllUsers);

router.get('/users/:userId', User_Controller.getSingleUser);

router.put('/users/:userId', User_Controller.updateUser);

router.delete('/users/:userId', User_Controller.deleteSingleUser);

export const User_Routes = router;
