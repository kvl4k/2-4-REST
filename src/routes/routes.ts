import { Router } from 'express';
import { itemRouter } from './items.routes';
import { userRouter } from './users.routes';
import { generalRouter } from './general.routes';

export const router = Router();

router.use('/v1', itemRouter);
router.use('/v1', userRouter);
router.use('/v2', generalRouter);