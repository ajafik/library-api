import * as redis from 'redis';
import { Config } from '../config/config';

class Redis {
    client: any;
    config = new Config();
    constructor() {
        this.client = redis.createClient(this.config.Redis().PORT, this.config.Redis().HOST);
    }
}

export default new Redis();