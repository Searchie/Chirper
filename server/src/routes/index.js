import { Router } from 'express';
import chirpsRouter from '././chiprsSQL';
import authRouter from './auth';
import { isLoggedIn, tokenMiddleware } from '../middleware/auth.mw';
import userRouter from './users';

let router = Router();

router.use('/auth', authRouter);

router.use(tokenMiddleware);
// router.use(isLoggedIn);

router.route('*')
    .post(tokenMiddleware, isLoggedIn)
    .put(tokenMiddleware, isLoggedIn)
    .delete(tokenMiddleware, isLoggedIn);

router.use('/chirps', chirpsRouter);
router.use('/users', userRouter);

export default router;