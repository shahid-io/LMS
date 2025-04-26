import express, { Request, Response } from 'express';
import { UserController } from '../../controllers/UserController';
import { UserMiddleware } from '../../middlewares/UserMiddleware';

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         email:
 *           type: string
 *         status:
 *           type: integer
 *         roleId:
 *           type: integer
 * 
 *     LoginRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *         password:
 *           type: string
 */

class UserRoutes {
    private router: express.Router;
    private userController: UserController;
    private userMiddleware: UserMiddleware;

    /**
     * Initializes a new instance of the UserRoutes class.
     * Sets up the necessary routes for user-related operations.
     */
    constructor() {
        this.router = express.Router();
        this.userController = new UserController();
        this.userMiddleware = new UserMiddleware();
        this.setRoutes();
    }

    /**
     * Initializes the routes for user-related operations.
     *
     * @private
     * @memberof UserRoutes
     */
    private setRoutes() {
        /**
         * @swagger
         * /api/v1/user/signup:
         *   post:
         *     summary: Register a new user
         *     tags: [Users]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             required:
         *               - email
         *               - password
         *             properties:
         *               email:
         *                 type: string
         *               password:
         *                 type: string
         *     responses:
         *       201:
         *         description: User created successfully
         *       500:
         *         description: Server error
         */
        this.router.post('/signup', (req: Request, res: Response) => {
            this.userController.signup(req, res);
        });

        /**
         * @swagger
         * /api/v1/user/login:
         *   post:
         *     summary: Login user
         *     tags: [Users]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             $ref: '#/components/schemas/LoginRequest'
         *     responses:
         *       200:
         *         description: Login successful
         *       401:
         *         description: Invalid credentials
         */
        this.router.post('/login', (req: Request, res: Response) => {
            this.userController.login(req, res);
        });

        /** Apply middleware to all subsequent routes */
        this.router.use(this.userMiddleware.verifyToken);

        /** Protected Routes */

        this.router.post('/updateRole', this.userMiddleware.isAdmin, (req: Request, res: Response) => {
            this.userController.updateRole(req, res);
        })

        this.router.get('/', (req: Request, res: Response) => {
            this.userController.getAllUser(req, res);
        });

        this.router.get('/:id', (req: Request, res: Response) => {
            this.userController.getUserById(req, res);
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

