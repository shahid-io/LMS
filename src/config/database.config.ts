import { Sequelize } from 'sequelize-typescript';
import path from 'path';

export const sequelize = new Sequelize({
    dialect: 'postgres',
    host: '127.0.0.1',
    port: 5432,
    username: 'postgres',
    password: 'root',
    database: 'lms',
    models: [path.resolve(__dirname, '..', 'models')] // Path to your model files
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
