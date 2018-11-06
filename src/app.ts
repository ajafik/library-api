import * as bodyParser from "body-parser"; // used to parse the form data that you pass in the request
import * as express from "express";
import * as morgan from "morgan";
import {Logger} from "./middleware/logger";
const API_VERSION = "/v1";

import {libraryRoutes} from "./routes/LibraryRoutes";

class App {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
    }

    private config(): void {
        // tslint:disable-next-line:no-unused-expression
        new Logger(this.app);
        this.app.use(bodyParser.json()); // support application/json type post data
        // support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({
            extended: false,
        }));

        // Routing
        this.app.use(API_VERSION, libraryRoutes);

    }

}

export default new App().app;
