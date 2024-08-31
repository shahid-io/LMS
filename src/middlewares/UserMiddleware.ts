import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { serverConfig } from '../config';
import { DecodedToken } from '../types/types';
import { RoleEnum } from '../types/RoleEnum';

export class UserMiddleware {
    private readonly PUBLIC_KEY: string;


    constructor() {
        this.PUBLIC_KEY = serverConfig.PUBLIC_KEY;
    }

    verifyToken = (req: Request, res: Response, next: NextFunction) => {
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.substring(7);
            jwt.verify(token, this.PUBLIC_KEY, { algorithms: ['RS256'] }, (err, decoded) => {
                if (err) {
                    return res.status(403).json({ message: 'Failed to authenticate token.' });
                }
                req.user = decoded as DecodedToken;
                next();
            });
        } else {
            res.status(401).json({ message: 'No token provided.' });
        }
    };

    isAdmin = (req: Request, res: Response, next: NextFunction) => {
        const user = req.user;
        if (user && user.role === RoleEnum.ADMIN) {
            next();
        } else {
            res.status(403).send('Access denied: Admin privileges required.');
        }
    }

    checkRole = (requiredRole: RoleEnum) => {
        return (req: Request, res: Response, next: NextFunction) => {
            const user = req.user;
            if (!user) {
                return res.status(401).send('Authentication required: No user found.');
            }

            if (user.role === requiredRole) {
                next();
            } else {
                res.status(403).send(`Access denied: Requires ${requiredRole} role.`);
            }
        };
    }
}
