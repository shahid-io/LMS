import { Request, Response } from 'express';
import { UserService } from '../services/UserService';

export class UserController {

    private userService: UserService;
    constructor() {
        console.log('Initializing UserController...');
        this.userService = new UserService();
        console.log('UserService initialized:', this.userService);
    }

    async createUser(req: Request, res: Response) {
        try {
            const resp = await this.userService.createUser(req.body);
            res.status(201).json({
                success: true,
                data: resp
            });
        } catch (error: any) {
            console.error('Error creating user:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to create user',
                error: error?.message || 'Internal Server Error' as any
            });
        }
    }
}