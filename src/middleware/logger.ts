import * as morgan from "morgan";

export class Logger {
    constructor(app) {
        // tslint:disable-next-line:max-line-length
        app.use(morgan(":remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] - [:date[clf]]- :response-time ms"));
    }
}
