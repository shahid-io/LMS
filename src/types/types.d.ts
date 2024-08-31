import { Request } from 'express';

// If you're using a specific type for the decoded token, define it:
interface DecodedToken {
    id: string;
    email: string;
    iat: number;
    exp: number;
    role: RoleEnum;
}

declare global {
    namespace Express {
        export interface Request {
            user?: DecodedToken; // Add your token-specific properties
        }
    }
}
