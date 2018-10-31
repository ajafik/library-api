import * as express from "express";
import * as bodyParser from "body-parser"; //used to parse the form data that you pass in the request

class App {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
    }

    private config(): void {
        this.app.use(bodyParser.json()); // support application/json type post data
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({
            extended: false
        }));

    }

}

export default new App().app;