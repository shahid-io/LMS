import express from 'express';
import UserRoutes from './UserRoutes';
import RoleRoutes from './RoleRoutes';
import CourseRoutes from './CourseRoutes';

const router = express.Router();

const userRoutes = new UserRoutes();
const roleRoutes = new RoleRoutes();
const courseRoutes = new CourseRoutes();

router.use('/user', userRoutes.getRouter());
router.use('/role', roleRoutes.getRouter());
router.use('/course', courseRoutes.getRouter());

export default router;

