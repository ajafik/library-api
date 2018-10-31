export class Config {
    Redis(): any{
        const PORT = process.env.REDIS_PORT || 1990;
        const HOST = process.env.REDIS_HOST || "localhost"

        return {HOST,PORT};
    }
}