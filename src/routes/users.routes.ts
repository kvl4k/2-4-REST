import { Router } from 'express';
import { userControllers } from '../controllers/user.controllers';

export const userRouter = Router();

userRouter.post('/register', userControllers.regUser);
userRouter.post('/logout', userControllers.logOutUser);
userRouter.post('/login', userControllers.logInUser);
