import express, { Request, Response } from 'express';
import { UserController } from '../../controllers/UserController';

class UserRoutes {
    private router: express.Router;
    private userController: UserController;

    constructor() {
        this.router = express.Router();
        this.userController = new UserController();
        this.setRoutes();
    }

    private setRoutes() {
        this.router.post('/', (req: Request, res: Response) => {
            this.userController.createUser(req, res);
        });
    }

    public getRouter(): express.Router {
        return this.router;
    }
}

export default UserRoutes;
