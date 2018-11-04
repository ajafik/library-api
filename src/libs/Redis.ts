import * as bluebird from "bluebird";
import * as redis from "redis";

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

import { Config } from "../config/config";

export class Redis {
  public client: any;
  private config = new Config();
  constructor() {
    this.client = redis.createClient(
      this.config.Redis().PORT,
      this.config.Redis().HOST,
    );
  }

  public setString(key, value) {
    return new Promise((resolve, reject) => {
      this.client
        .setAsync(key, value)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  }

  public getString(key) {
    return new Promise((resolve, reject) => {
      this.client
        .getAsync(key)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  }

  public setObject(key, value) {
    return new Promise((resolve, reject) => {
      this.client
        .hmsetAsync(key, value)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  }

  public getObject(key) {
    return new Promise((resolve, reject) => {
      this.client
        .hgetallAsync(key)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  }

  public isKeyExist(key) {
    return new Promise((resolve, reject) => {
      this.client
        .existsAsync(key)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  }

  public deleteKey(key) {
    return new Promise((resolve, reject) => {
      this.client
        .delAsync(key)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  }

  public expireKey(key, expireTime) {
    // expireTime in seconds
    return new Promise((resolve, reject) => {
      this.client
        .expireAsync(key, expireTime)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  }
}
