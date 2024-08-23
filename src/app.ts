import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import serverConfig from './config/server.config';

dotenv.config();

class App {
    public app: Application;
    private port: number | string;

    constructor() {
        this.app = express();
        this.port = serverConfig.PORT;
        this.initializeMiddlewares();
        this.initializeRoutes();
    }
    private initializeMiddlewares(): void {
        this.app.use(cors());
        this.app.use(bodyParser.json());
    }

    private initializeRoutes(): void {
        // this.app.use('/api', userRoutes);
        // this.app.use('/api', courseRoutes);
    }

    public listen(): void {
        this.app.listen(this.port, () => {
            console.log(`http://localhost:${this.port} : ${new Date().getDate().toString()}`);
        });
    }
}

