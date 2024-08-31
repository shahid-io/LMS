import { Request, Response } from 'express';
import { AppSuccess, AppError, HttpStatusCodes } from '../utils/common'
import message from '../i18n/en/en.json';
import { serverConfig } from '../config'
import { WhereOptions, Op } from 'sequelize';
import Role from '../models/RoleModel';
import { RoleService } from '../services/RoleService';

export class RoleController {
    private roleService: RoleService;
    constructor() {
        this.roleService = new RoleService();
    }

    async createRole(req: Request, res: Response) {
        try {
            const role = await this.roleService.create(req.body);
            res.status(HttpStatusCodes.CREATED).json(new AppSuccess(role));
        } catch (error) {
            if (error instanceof AppError) {
                res.status(error.statusCode).json(error);
            } else {
                res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json(new AppError(message.ERRORS.ROLE.ROLE_CREATION_FAILED, 500));
            }
        }
    }


    async getAllRole(req: Request, res: Response) {
        try {
            const roles = await this.roleService.findAll();
            res.status(HttpStatusCodes.OK).json(new AppSuccess(roles));
        } catch (error) {
            if (error instanceof AppError) {
                res.status(error.statusCode).json(error);
            } else {
                res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json(new AppError(message.ERRORS.ROLE.ROLE_FETCH_FAILED, 500));
            }
        }
    }

    async getRoleById(req: Request, res: Response) {
        try {
            const role = await this.roleService.findById(parseInt(req.params.id.toString()));
            res.status(HttpStatusCodes.OK).json(new AppSuccess(role));
        } catch (error) {
            if (error instanceof AppError) {
                res.status(error.statusCode).json(error);
            } else {
                res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json(new AppError(message.ERRORS.ROLE.ROLE_FETCH_FAILED, 500));
            }
        }
    }

    async deleteRole(req: Request, res: Response) {
        try {
        } catch (error) {
        }
    }

    updateRole(req: Request, res: Response) {
        try {
        } catch (error) {
        }
    }
}