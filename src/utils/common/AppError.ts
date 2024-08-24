
export class AppError extends Error {
    message: string;
    statusCode: number;
    status: string;
    isOperational: boolean;

    constructor(message: string, statusCode: number, isOperational: boolean = true) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = isOperational;
        Error.captureStackTrace(this, this.constructor);
    }
}
