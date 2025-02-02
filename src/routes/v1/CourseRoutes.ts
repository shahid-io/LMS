import express, { Request, Response } from 'express';
import { CourseController } from '../../controllers/CourseController';
import { UserMiddleware } from '../../middlewares/UserMiddleware';
import { PermissionChecker } from '../../middlewares';
import { PermissionEnum } from '../../types';

class CourseRoutes {
    private router: express.Router;
    private courseController: CourseController;
    private userMiddleware: UserMiddleware;
    // private readonly permissionChecker: PermissionChecker;

    constructor() {
        this.router = express.Router();
        this.courseController = new CourseController();
        this.userMiddleware = new UserMiddleware();
        // this.permissionChecker = new PermissionChecker();
        this.setRoutes();
    }

    private setRoutes() {
        this.router.use(this.userMiddleware.verifyToken);
        // this.router.use()

        // this.router.post('/', (req: Request, res: Response) => {
        //     this.courseController.createRole(req, res);
        // });

        const createCoursePermission = new PermissionChecker(PermissionEnum.CREATE_COURSE);
        this.router.post('/', createCoursePermission.checkPermission(), (req: Request, res: Response) => {
            this.courseController.createCourse(req, res);
        });

        const viewCoursePermission = new PermissionChecker(PermissionEnum.VIEW_COURSE);
        this.router.get('/', viewCoursePermission.checkPermission(), (req: Request, res: Response) => {
            this.courseController.getAllCourses(req, res);
        });

        // this.router.get('/', (req: Request, res: Response) => {
        //     this.courseController.getAllCourses(req, res);
        // });

        // this.router.get('/:id', (req: Request, res: Response) => {
        //     this.courseController.getRoleById(req, res);
        // });

        // this.router.put('/:id', (req: Request, res: Response) => {
        //     this.courseController.updateRole(req, res);
        // });

        // this.router.delete('/:id', (req: Request, res: Response) => {
        //     this.courseController.deleteRole(req, res);
        // });
    }
    public getRouter(): express.Router {
        return this.router;
    }

}


export default CourseRoutes;