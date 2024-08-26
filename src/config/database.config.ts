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
    logging: false,
});

// sequelize.addModels([path.resolve(__dirname, '..', 'models')]);

// export const sequelize = new Sequelize({
//     dialect: process.env.MYSQL_DB_DIALECT as any,
//     host: process.env.MYSQL_DB_HOST,
//     port: parseInt(process.env.MYSQL_DB_PORT || '3306'),
//     username: process.env.MYSQL_DB_USERNAME,
//     password: process.env.MYSQL_DB_PASSWORD,
//     database: process.env.MYSQL_DB_DATABASE,
//     models: [path.resolve(__dirname, '..', 'models')]
// });
