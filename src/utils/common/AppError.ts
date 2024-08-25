export class AppError extends Error {
    statusCode: number;
    status: string;
    isOperational: boolean;

    constructor(message: string, statusCode: number, isOperational = true) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = isOperational;

        Error.captureStackTrace(this, this.constructor);
    }

    toJSON() {
        return {
            status: this.status,
            message: this.message,
            statusCode: this.statusCode,
            isOperational: this.isOperational,
        };
    }
}
