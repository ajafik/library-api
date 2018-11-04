import * as mongoose from "mongoose";

import { Config } from "./config/config";

export class DB {

    public MONGO_HOST: string;
    public MONGO_PORT: number;
    public MONGO_DB_NAME: string;
    public MONGO_USERNAME: string;
    public MONGO_PASSWORD: string;

    constructor() {
        const config = new Config();
        this.MONGO_HOST = config.MongoDB().MONGO_HOST;
        this.MONGO_PORT = config.MongoDB().MONGO_PORT;
        this.MONGO_DB_NAME = config.MongoDB().MONGO_DB_NAME;
        this.MONGO_USERNAME = config.MongoDB().MONGO_USERNAME;
        this.MONGO_PASSWORD = config.MongoDB().MONGO_PASSWORD;
    }

    public connect() {
        const url = `mongodb://${this.MONGO_USERNAME}
                    :${this.MONGO_PASSWORD}@${this.MONGO_HOST}:${this.MONGO_PORT}/${this.MONGO_DB_NAME}`;
        mongoose.connect(url, { useNewUrlParser: true });
        // console.log("Connected to MongoDB Successfully.");
    }
}
