import { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import hpp from 'hpp';

export class SecurityMiddleware {
    public static rateLimiter = rateLimit({
        max: 100, // Limit each IP to 100 requests per windowMs
        windowMs: 60 * 60 * 1000, // 1 hour
        message: 'Too many requests from this IP, please try again in an hour!'
    });

    public static securityHeaders = helmet();

    public static preventParamPollution = hpp();

    public static corsOptions = {
        origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true
    };

    public static checkContentType = (req: Request, res: Response, next: NextFunction) => {
        if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
            if (!req.is('application/json')) {
                return res.status(415).json({
                    status: 'error',
                    message: 'Content-Type must be application/json'
                });
            }
        }
        next();
    };

    public static checkXSS = (req: Request, res: Response, next: NextFunction) => {
        const xssPattern = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
        const body = req.body;
        
        if (typeof body === 'object') {
            for (const key in body) {
                if (typeof body[key] === 'string' && xssPattern.test(body[key])) {
                    return res.status(400).json({
                        status: 'error',
                        message: 'Potential XSS attack detected'
                    });
                }
            }
        }
        next();
    };
}
