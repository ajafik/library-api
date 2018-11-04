import * as amqplib from "amqplib";
import { Config } from "../config/config";

export class RabbitMQ {
    public client: any;
    public RABBIT_HOST: any;
    public RABBIT_PORT: number;
    public RABBIT_USERNAME: string;
    public RABBIT_PASSWORD: string;
    private config = new Config();

    constructor() {
        this.RABBIT_HOST = this.config.RabbitMQ().RABBIT_HOST;
        this.RABBIT_PORT = this.config.RabbitMQ().RABBIT_PORT;
        this.RABBIT_USERNAME = this.config.RabbitMQ().RABBIT_USERNAME;
        this.RABBIT_PASSWORD = this.config.RabbitMQ().RABBIT_PASSWORD;

        this.client = amqplib
            .connect(`amqp://${this.RABBIT_USERNAME}:
                    ${this.RABBIT_PASSWORD}@${this.RABBIT_HOST}:${this.RABBIT_PORT}`);

    }

    public rabbit_send(QUEUE_NAME, message) {
        return new Promise((resolve, reject) => {
            this.client.then((connection) => {
                return connection.createChannel();
            }).then((channel) => {
                return channel.assertQueue(QUEUE_NAME).then((res) => {
                    channel.sendToQueue(QUEUE_NAME, new Buffer(message));
                    if (res.messageCount) {
                        return resolve(true);
                    } else {
                        return reject(false);
                    }
                });
            }).catch(
                // console.warn
            );
        });
    }
    public rabbit_receive(QUEUE_NAME) {
        return new Promise((resolve, reject) => {
            this.client.then((connection) => {
                return connection.createChannel();
            }).then((channel) => {
                return channel.assertQueue(QUEUE_NAME).then((res) => {
                    channel.consume(QUEUE_NAME, (message) => {
                        if (message !== null) {
                            resolve(message.content.toString());
                            channel.ack(message);
                        } else {
                            reject("Unable to consume Message from the Queue.");
                        }
                    });
                });
            }).catch(
                // console.warn
            );

        });

    }

}
