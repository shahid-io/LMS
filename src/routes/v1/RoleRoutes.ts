import express, { Request, Response } from 'express';
import { RoleController } from '../../controllers/RoleController';
import { UserMiddleware } from '../../middlewares/UserMiddleware';

class RoleRoutes {
    private router: express.Router;
    private roleController: RoleController;
    private userMiddleware: UserMiddleware;

    constructor() {
        this.router = express.Router();
        this.roleController = new RoleController();
        this.userMiddleware = new UserMiddleware();
        this.setRoutes();
    }
    private setRoutes() {
        this.router.use(this.userMiddleware.verifyToken);

        this.router.post('/', (req: Request, res: Response) => {
            this.roleController.createRole(req, res);
        });

        this.router.get('/', (req: Request, res: Response) => {
            this.roleController.getAllRole(req, res);
        });

        this.router.get('/:id', (req: Request, res: Response) => {
            this.roleController.getRoleById(req, res);
        });

        this.router.put('/:id', (req: Request, res: Response) => {
            this.roleController.updateRole(req, res);
        });

        this.router.delete('/:id', (req: Request, res: Response) => {
            this.roleController.deleteRole(req, res);
        });
    }

    public getRouter(): express.Router {
        return this.router;
    }


}

export default RoleRoutes;