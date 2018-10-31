export class Config {
    Redis(): any{
        const PORT = process.env.REDIS_PORT || 6379;
        const HOST = process.env.REDIS_HOST || "localhost"

        return {HOST,PORT};
    }

    RabbitMQ(): any{
        const RABBIT_HOST= process.env.RABBIT_HOST || "localhost";
        const RABBIT_PORT = process.env.RABBIT_PORT || 5672;
        const RABBIT_USERNAME = process.env.RABBIT_USERNAME || "guest";
        const RABBIT_PASSWORD = process.env.RABBIT_PASSWORD || "guest";

        return {RABBIT_HOST,RABBIT_PORT,  RABBIT_USERNAME, RABBIT_PASSWORD};

    }

    Elasticsearch():any{
        const ELASTIC_HOST = process.env.ELASTIC_HOST || "localhost";
        const ELASTIC_PORT = process.env.ELASTIC_PORT || 9200;

        return {ELASTIC_HOST, ELASTIC_PORT};
    }
}