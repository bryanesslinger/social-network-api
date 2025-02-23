import { Router } from 'express';
import { userRouter } from './user-routes.js';
import { thoughtRouter } from './thought-routes.js';
const router = Router();
router.use('/users', userRouter);
router.use('/thoughts', thoughtRouter);
export default router;
