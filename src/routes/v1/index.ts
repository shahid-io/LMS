import express from 'express';
import userRoutes from './UserRoutes';
const router = express.Router();

router.use('/user', userRoutes);

export default router;


