import { Sequelize } from 'sequelize-typescript';
import path from 'path';

import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize({
    dialect: process.env.DB_DIALECT as any,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    models: [path.resolve(__dirname, '..', 'models')],
    logging: false
});

// export const sequelize = new Sequelize({
//     dialect: 'mysql',
//     host: 'localhost',
//     port: 3306,
//     username: 'root',
//     password: 'root',
//     database: 'lms',
//     models: [path.resolve(__dirname, '..', 'models')]
// });
