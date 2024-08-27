
import { Sequelize } from 'sequelize-typescript';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const isProduction = process.env.NODE_ENV === 'prod';
if (isProduction) {
    console.log('Running in production mode');
}else{
    console.log('Running in development mode');
}
const DB_CONFIG = {
    dialect: isProduction ? process.env.PROD_DB_DIALECT : process.env.DEV_DB_DIALECT,
    host: isProduction ? process.env.PROD_DB_HOST : process.env.DEV_DB_HOST,
    port: isProduction ? parseInt(process.env.PROD_DB_PORT || '5432') : parseInt(process.env.DEV_DB_PORT || '5432'),
    username: isProduction ? process.env.PROD_DB_USERNAME : process.env.DEV_DB_USERNAME,
    password: isProduction ? process.env.PROD_DB_PASSWORD : process.env.DEV_DB_PASSWORD,
    database: isProduction ? process.env.PROD_DB_DATABASE : process.env.DEV_DB_DATABASE,
};

export const sequelize = new Sequelize({
    dialect: DB_CONFIG.dialect as any,
    host: DB_CONFIG.host,
    port: DB_CONFIG.port,
    username: DB_CONFIG.username,
    password: DB_CONFIG.password,
    database: DB_CONFIG.database,
    models: [path.resolve(__dirname, '..', 'models')],
    logging: false //!isProduction,
});

/** for MySQL configuration */
// export const sequelize = new Sequelize({
//     dialect: process.env.MYSQL_DB_DIALECT as any,
//     host: process.env.MYSQL_DB_HOST,
//     port: parseInt(process.env.MYSQL_DB_PORT || '3306'),
//     username: process.env.MYSQL_DB_USERNAME,
//     password: process.env.MYSQL_DB_PASSWORD,
//     database: process.env.MYSQL_DB_DATABASE,
//     models: [path.resolve(__dirname, '..', 'models')]
// });
