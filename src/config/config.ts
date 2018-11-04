export class Config {
    public Redis(): any {
        const PORT = process.env.REDIS_PORT || 6379;
        const HOST = process.env.REDIS_HOST || "localhost";

        return { HOST, PORT };
    }

    public RabbitMQ(): any {
        const RABBIT_HOST = process.env.RABBIT_HOST || "localhost";
        const RABBIT_PORT = process.env.RABBIT_PORT || 5672;
        const RABBIT_USERNAME = process.env.RABBIT_USERNAME || "guest";
        const RABBIT_PASSWORD = process.env.RABBIT_PASSWORD || "guest";

        return { RABBIT_HOST, RABBIT_PORT, RABBIT_USERNAME, RABBIT_PASSWORD };

    }

    public Elasticsearch(): any {
        const ELASTIC_HOST = process.env.ELASTIC_HOST || "localhost";
        const ELASTIC_PORT = process.env.ELASTIC_PORT || 9200;

        return { ELASTIC_HOST, ELASTIC_PORT };
    }

    public MongoDB(): any {
        const MONGO_HOST = process.env.MONGO_HOST || "localhost";
        const MONGO_PORT = process.env.MONGO_PORT || 27017;
        const MONGO_DB_NAME = process.env.MONGO_DB_NAME || "library";
        const MONGO_USERNAME = process.env.MONGO_USERNAME || "user";
        const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "pass";

        return { MONGO_HOST, MONGO_PORT, MONGO_DB_NAME, MONGO_USERNAME, MONGO_PASSWORD };
    }
}
