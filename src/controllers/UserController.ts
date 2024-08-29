import { Request, Response } from 'express';
import { UserService } from '../services/UserService';
import { AppSuccess, AppError, HttpStatusCodes } from '../utils/common'
import message from '../i18n/en/en.json';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { serverConfig } from '../config'
import { WhereOptions, Op } from 'sequelize';
import User from '../models/UserModel';
export class UserController {

    private userService: UserService;
    constructor() {
        this.userService = new UserService();
    }

    async signup(req: Request, res: Response) {
        try {
            const user = await this.userService.create(req.body);
            res.status(HttpStatusCodes.CREATED).json(new AppSuccess(user));
        } catch (error) {
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json(new AppError(message.ERRORS.USER.USER_CREATION_FAILED, 500));
        }
    }

    async login(req: Request, res: Response) {
        try {
            const condition: WhereOptions<User> = {};
            condition.email = { [Op.eq]: req.body.email };
            const { password } = req.body;
            const user = await this.userService.findOne(condition);
            if (!user) throw new AppError(message.ERRORS.USER.USER_NOT_FOUND, HttpStatusCodes.NOT_FOUND);
            const match = await bcrypt.compare(password, user.password);
            if (!match) throw new AppError(message.ERRORS.USER.PASSWORD_DOES_NOT_MATCH, HttpStatusCodes.UNAUTHORIZED);
            const token = jwt.sign({ userId: user.id }, serverConfig.PRIVATE_KEY, {
                algorithm: 'RS256',
                expiresIn: '30d'
            });
            return res.status(HttpStatusCodes.OK).json(new AppSuccess({ ...user, token }));
        } catch (error) {
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json(new AppError(message.ERRORS.USER.USER_CREATION_FAILED, 500));
        }
    }

    async createUser(req: Request, res: Response) {
        try {
            const resp = await this.userService.create(req.body);
            res.status(HttpStatusCodes.CREATED).json(new AppSuccess(resp));
        } catch (error: any) {
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json(new AppError(message.ERRORS.USER.USER_CREATION_FAILED, 500));
        }
    }

    async getAllUser(req: Request, res: Response) {
        try {
            const users = await this.userService.findAll();
            if (!users) throw new AppError(message.ERRORS.USER.USER_NOT_FOUND, HttpStatusCodes.NOT_FOUND);
            return res.status(HttpStatusCodes.OK).json(new AppSuccess(users));
        } catch (error: any) {
            if (error instanceof AppError) {
                res.status(error.statusCode).json(error);
            } else {
                res.status(error.statusCode || HttpStatusCodes.INTERNAL_SERVER_ERROR).json(new AppError(
                    message.ERRORS.USER.USER_FETCH_FAILED,
                    error.statusCode || HttpStatusCodes.INTERNAL_SERVER_ERROR
                ));
            }
        }
    }

    async getUserById(req: Request, res: Response) {
        try {
            const user = await this.userService.findById(req.params.id);
            if (!user) throw new AppError(message.ERRORS.USER.USER_NOT_FOUND, HttpStatusCodes.NOT_FOUND);
            return res.status(HttpStatusCodes.OK).json(new AppSuccess(user));
        } catch (error: any) {
            if (error instanceof AppError) {
                res.status(error.statusCode).json(error);
            } else {
                res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json(new AppError(
                    message.ERRORS.GENERAL.INTERNAL_SERVER_ERROR,
                    HttpStatusCodes.INTERNAL_SERVER_ERROR
                ));
            }
        }
    }

    async updateUser(req: Request, res: Response) {
        try {
            const id: number = parseInt(req.params.id);
            const user = await this.userService.update(id, req.body);
            if (!user) throw new AppError(message.ERRORS.USER.USER_NOT_FOUND, HttpStatusCodes.NOT_FOUND);
            return res.status(HttpStatusCodes.OK).json(new AppSuccess(user));
        } catch (error: any) {
            if (error instanceof AppError) {
                res.status(error.statusCode).json(error);
            } else {
                res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json(new AppError(
                    message.ERRORS.GENERAL.INTERNAL_SERVER_ERROR,
                    HttpStatusCodes.INTERNAL_SERVER_ERROR
                ));
            }
        }
    }
}