import * as amqplib from 'amqplib';
import { Config } from "../config/config";

export class RabbitMQ {
    RABBIT_HOST: any;
    RABBIT_PORT: number;
    RABBIT_USERNAME: string;
    RABBIT_PASSWORD: string;
    config = new Config();

    constructor() {
        this.RABBIT_HOST = this.config.RabbitMQ().RABBIT_HOST;
        this.RABBIT_PORT = this.config.RabbitMQ().RABBIT_PORT;
        this.RABBIT_USERNAME = this.config.RabbitMQ().RABBIT_USERNAME;
        this.RABBIT_PASSWORD = this.config.RabbitMQ().RABBIT_PASSWORD;

    }

    rabbit_send(QUEUE_NAME, message, timeout) {
        return new Promise((resolve, reject) => {
            amqplib.connect(`amqp://${this.RABBIT_USERNAME}:${this.RABBIT_PASSWORD}@${this.RABBIT_HOST}:${this.RABBIT_PORT}`).then(connection => {
                console.log(connection);
            }).catch(error => {
                console.log(error);
            })
        })
    }
}