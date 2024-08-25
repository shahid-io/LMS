import dotenv from 'dotenv';

dotenv.config();

interface ServerConfig {
    PORT: number;
    DB_HOST: string;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_NAME: string;
    SALT: number;
}

const serverConfig: ServerConfig = {
    PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 5000,
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_USER: process.env.DB_USER || 'root',
    DB_PASSWORD: process.env.DB_PASSWORD || 'password',
    DB_NAME: process.env.DB_NAME || 'lms',
    SALT: parseInt(process.env.SALT || '9'),
};

export default serverConfig;
