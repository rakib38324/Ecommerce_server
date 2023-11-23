import express from 'express';
import { User_Controller } from './users.controller';

const router = express.Router();

router.post('/users', User_Controller.createUser);

router.get('', User_Controller.getAllUsers);

router.get('/:userId', User_Controller.getSingleUser);

export const User_Routes = router;