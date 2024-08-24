import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { Helper } from './utils/helper';

import { serverConfig, databaseConfig } from './config'


dotenv.config();

class App {
    public app: Application;
    private port: number | string;

    constructor() {
        this.app = express();
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.port = serverConfig.PORT;
        this.initializeRoutes();

        databaseConfig.sequelize.authenticate().then(() => {
            console.log('Connection has been established successfully.');
        }).catch((error) => {
            console.error('Unable to connect to the database:', error);
        })
    }

    private initializeRoutes(): void {
        this.app.get("/", (req: Request, res: Response) => {
            res.send({ message: 'LMS' })
        });
        // this.app.use('/api', userRoutes);
        // this.app.use('/api', courseRoutes);
    }

    public listen(): void {
        this.app.listen(this.port, () => {
            console.log(`http://localhost:${this.port} : ${Helper.getTimeLog()}`);
        });
    }
}

const app = new App();
app.listen();

