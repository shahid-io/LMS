import { Sequelize } from 'sequelize-typescript';
import path from 'path';

export class DatabaseService {
    private sequelize: Sequelize;

    constructor() {
        this.sequelize = new Sequelize({
            dialect: process.env.DB_DIALECT as any,
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT || '5432'),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            models: [path.resolve(__dirname, '..', 'models')],
            logging: process.env.NODE_ENV !== 'prod',
        });
    }

    public async initialize(): Promise<void> {
        try {
            await this.sequelize.authenticate();
            console.log('Connection has been established successfully.');
            await this.sequelize.sync({ alter: true });
            console.log("Database synchronized with 'alter: true'");
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }

    public getSequelize(): Sequelize {
        return this.sequelize;
    }
}