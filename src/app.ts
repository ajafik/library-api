import * as bodyParser from "body-parser"; // used to parse the form data that you pass in the request
import * as express from "express";
import * as morgan from "morgan";
import {Logger} from "./middleware/logger";
const API_VERSION = "/v1";

import {LibraryRoutes} from "./routes/library";

class App {
    public app: express.Application;

    public libraryRoutes: LibraryRoutes = new LibraryRoutes();

    constructor() {
        this.app = express();
        this.config();

        this.libraryRoutes.routes(this.app);
    }

    private config(): void {
        // tslint:disable-next-line:no-unused-expression
        new Logger(this.app);
        this.app.use(bodyParser.json()); // support application/json type post data
        // support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({
            extended: false,
        }));

    }

}

export default new App().app;
