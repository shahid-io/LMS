import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const privateKey = fs.readFileSync(path.join(__dirname, '../..', 'private.pem'), 'utf8');
const publicKey = fs.readFileSync(path.join(__dirname, '../..', 'public.pem'), 'utf8');

interface ServerConfig {
    PORT: number;
    SALT: number;
    DB_HOST: string;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_NAME: string;
    PUBLIC_KEY: string;
    PRIVATE_KEY: string;
}

const serverConfig: ServerConfig = {
    PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 5000,
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_USER: process.env.DB_USER || 'root',
    DB_PASSWORD: process.env.DB_PASSWORD || 'password',
    DB_NAME: process.env.DB_NAME || 'lms',
    SALT: parseInt(process.env.SALT || '9', 10),
    PUBLIC_KEY: publicKey,
    PRIVATE_KEY: privateKey
};

export default serverConfig;
