import { userRouter } from './user.js';
import { productRouter } from './product.js';
import express from 'express';

const router = express.Router();

router.use('/user', userRouter);
router.use('/product', productRouter);

export default router;
