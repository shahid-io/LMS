import { App } from "./app";

class Server {
    constructor() {
        const app = new App();
        app.listen();
    }
}

new Server();

