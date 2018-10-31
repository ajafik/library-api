import * as express from "express";
import * as bodyParser from "body-parser";

class App {
    public app : express.Application;

    constructor(){
        this.app = express();
    }

}

export default new App().app;