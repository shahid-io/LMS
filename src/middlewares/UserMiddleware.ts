import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { serverConfig } from '../config';
import { DecodedToken } from '../types/types';

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
}
