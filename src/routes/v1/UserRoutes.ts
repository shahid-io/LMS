import express, { Request, Response } from 'express';
import { UserController } from '../../controllers/UserController';

class UserRoutes {
    private router: express.Router;
    private userController: UserController;

    /**
     * Initializes a new instance of the UserRoutes class.
     * Sets up the necessary routes for user-related operations.
     */
    constructor() {
        this.router = express.Router();
        this.userController = new UserController();
        this.setRoutes();
    }

    /**
     * Initializes the routes for user-related operations.
     *
     * @private
     * @memberof UserRoutes
     */
    private setRoutes() {
        this.router.get('/', (req: Request, res: Response) => {
            this.userController.getAllUser(req, res);
        });

        this.router.post('/', (req: Request, res: Response) => {
            this.userController.createUser(req, res);
        });
    }

    public getRouter(): express.Router {
        return this.router;
    }
}

export default UserRoutes;

