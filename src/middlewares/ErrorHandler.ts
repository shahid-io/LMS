import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/common';

export class ErrorHandler {
    public static handleError = (
        err: Error,
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        if (err instanceof AppError) {
            return res.status(err.statusCode).json({
                status: err.status,
                message: err.message,
                ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
            });
        }

        return res.status(500).json({
            status: 'error',
            message: 'Internal server error',
            ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
        });
    };

    public static handleUnhandledRejection = (server: any) => {
        process.on('unhandledRejection', (err: Error) => {
            console.error('UNHANDLED REJECTION! Shutting down...');
            console.error(err.name, err.message);
            server.close(() => {
                process.exit(1);
            });
        });
    };

    public static handleUncaughtException = () => {
        process.on('uncaughtException', (err: Error) => {
            console.error('UNCAUGHT EXCEPTION! Shutting down...');
            console.error(err.name, err.message);
            process.exit(1);
        });
    };

    public static handleSigTerm = (server: any) => {
        process.on('SIGTERM', () => {
            console.info('SIGTERM received. Performing graceful shutdown...');
            server.close(() => {
                console.log('Process terminated');
                process.exit(0);
            });
        });
    };

    private static formatError(err: Error) {
        return {
            name: err.name,
            message: err.message,
            stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
            timestamp: new Date().toISOString()
        };
    }

    public static handleSpecificError = (err: Error): { status: number; message: string } => {
        if (err.name === 'ValidationError') {
            return { status: 400, message: err.message };
        }
        if (err.name === 'JsonWebTokenError') {
            return { status: 401, message: 'Invalid token. Please log in again!' };
        }
        if (err.name === 'TokenExpiredError') {
            return { status: 401, message: 'Your token has expired! Please log in again.' };
        }
        return { status: 500, message: 'Internal server error' };
    };
}
