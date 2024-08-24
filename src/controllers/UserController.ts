import { Request, Response } from 'express';
import { UserService } from '../services/UserService';
import { AppSuccess, AppError } from '../utils/common'
import message from '../i18n/en/en.json';
export class UserController {

    private userService: UserService;
    constructor() {
        this.userService = new UserService();
    }

    async createUser(req: Request, res: Response) {
        try {
            const resp = await this.userService.createUser(req.body);
            const successResponse = new AppSuccess(resp);
            res.status(201).json(successResponse);
        } catch (error: any) {
            console.error('Error creating user:', error);
            const appError = new AppError(message.ERRORS.USER.USER_CREATION_FAILED , 500);
            res.status(appError.statusCode).json(appError);
        }
    }

    async getAllUser(req: Request, res: Response) {
        try {
            const resp = await this.userService.findAll();
            res.status(200).json({
                success: true,
                data: resp
            });
        } catch (error) {
            console.error('Error getting all users:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to get all users',
                error: error
            });
        }
    }
}