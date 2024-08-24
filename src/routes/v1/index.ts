import express from 'express';
import UserRoutes from './UserRoutes';

const router = express.Router();

const userRoutes = new UserRoutes();

router.use('/user', userRoutes.getRouter());

export default router;

