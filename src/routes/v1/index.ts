import express from 'express';
import UserRoutes from './UserRoutes';
import RoleRoutes from './RoleRoutes';

const router = express.Router();

const userRoutes = new UserRoutes();
const roleRoutes = new RoleRoutes();

router.use('/user', userRoutes.getRouter());
router.use('/role', roleRoutes.getRouter());
export default router;

