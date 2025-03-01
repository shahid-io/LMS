import express, { Request, Response } from 'express';
import { CourseController } from '../../controllers/CourseController';
import { UserMiddleware } from '../../middlewares/UserMiddleware';
import { PermissionChecker } from '../../middlewares';
import { PermissionEnum } from '../../types';

class CourseRoutes {
    private router: express.Router;
    private courseController: CourseController;
    private userMiddleware: UserMiddleware;
    private permissionChecker: PermissionChecker;

    constructor() {
        this.router = express.Router();
        this.courseController = new CourseController();
        this.userMiddleware = new UserMiddleware();
        this.permissionChecker = new PermissionChecker();
        this.setRoutes();
        
    }

    private setRoutes() {
        this.router.use(this.userMiddleware.verifyToken);

        // Create a new course (requires CREATE_COURSE permission)
        this.router.post(
            '/',
            this.permissionChecker.checkPermission(PermissionEnum.CREATE_COURSE),
            (req: Request, res: Response) => {
                this.courseController.createCourse(req, res);
            }
        );

        // Get all courses (requires VIEW_COURSE permission)
        this.router.get(
            '/',
            this.permissionChecker.checkPermission(PermissionEnum.VIEW_COURSE),
            (req: Request, res: Response) => {
                this.courseController.getAllCourses(req, res);
            }
        );

    }

    public getRouter(): express.Router {
        return this.router;
    }
}

export default CourseRoutes;
