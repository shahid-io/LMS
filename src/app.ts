import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { Helper } from './utils/helper';
import apiRoutes from './routes';

import { serverConfig, databaseConfig } from './config'

dotenv.config();

export class App {
    public app: Application;
    private port: number | string;

    constructor() {
        this.app = express();
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.port = serverConfig.PORT;
        this.initializeRoutes();
        this.DatabaseInit();
        this.app.use('/api', apiRoutes);        
    }

    private DatabaseInit(): void {
        databaseConfig.sequelize.authenticate().then(() => {
            // console.log('Connection has been established successfully.');
            // Sync all defined models to the database
            databaseConfig.sequelize.sync({ alter: true }).then(() => {
                // console.log("Database synchronized with 'alter: true'");
            }).catch((syncError) => {
                console.error("Error synchronizing the database:", syncError);
            });
        }).catch((error) => {
            console.error('Unable to connect to the database:', error);
        });
    }


    private initializeRoutes(): void {
        this.app.get("/", (req: Request, res: Response) => {
            res.send({ message: 'LMS' })
        });
    }

    public listen(): void {
        this.app.listen(this.port, () => {
            console.log(`http://localhost:${this.port} : ${Helper.getTimeLog()}`);
        });
    }
}
