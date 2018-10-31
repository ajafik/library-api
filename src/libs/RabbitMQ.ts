import * as amqplib from 'amqplib';
import { Config } from "../config/config";

export class RabbitMQ {
    client: any;
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

        this.client = amqplib.connect(`amqp://${this.RABBIT_USERNAME}:${this.RABBIT_PASSWORD}@${this.RABBIT_HOST}:${this.RABBIT_PORT}`);


    }

    rabbit_send(QUEUE_NAME, message) {
        return new Promise((resolve, reject) => {
            this.client.then(function (connection) {
                return connection.createChannel();
            }).then(function (channel) {
                return channel.assertQueue(QUEUE_NAME).then(function (res) {
                    channel.sendToQueue(QUEUE_NAME, new Buffer(message));
                    if (res.messageCount) {
                        return resolve(true)
                    } else {
                        return reject(false)
                    };
                })
            }).catch(console.warn);

        })
    }


    rabbit_receive(QUEUE_NAME) {
        return new Promise((resolve, reject) => {
            this.client.then(function (connection) {
                return connection.createChannel();
            }).then(function (channel) {
                return channel.assertQueue(QUEUE_NAME).then(function (res) {
                    channel.consume(QUEUE_NAME, function (message) {
                        if (message !== null) {
                            resolve(message.content.toString())
                            channel.ack(message);
                        } else {
                            reject("Unable to consume Message from the Queue.");
                        }
                    });
                })
            }).catch(console.warn);

        })

    }


}