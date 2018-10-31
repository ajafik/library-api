import * as mongoose from 'mongoose';

import { Config } from './config/config';
const config = new Config();

const MONGO_HOST = config.MongoDB().MONGO_HOST;
const MONGO_PORT = config.MongoDB().MONGO_PORT;
const MONGO_DB_NAME = config.MongoDB().MONGO_DB_NAME;
const MONGO_USERNAME = config.MongoDB().MONGO_USERNAME;
const MONGO_PASSWORD = config.MongoDB().MONGO_PASSWORD;

const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB_NAME}`;

mongoose.connect(url, { useMongoClient: true });