import * as elasticsearch from "elasticsearch";
import { Config } from "../config/config";

export class Elasticsearch {
    public ELASTIC_PORT: number;
    public ELASTIC_HOST: string;

    public client: any;

    public config = new Config();
    constructor() {
        this.ELASTIC_PORT = this.config.Elasticsearch().ELASTIC_PORT;
        this.ELASTIC_HOST = this.config.Elasticsearch().ELASTIC_HOST;

        this.client = new elasticsearch.Client({ host: this.ELASTIC_HOST + ":" + this.ELASTIC_PORT });
    }

    public isESUp() {
        return new Promise((resolve, reject) => {
            this.client
            .ping({ requestTimeout: 30000 })
            .then((res) => res).catch((error) => error);
        });
    }

    public createIndex(indexName) { // Creates an Index (DB) on Elasticsearch
        return new Promise((resolve, reject) => {
            this.client.indices.create({
                index: indexName,
            }).then((error, response, status) => {
                if (error) {
                    reject(0);
                } else {
                    resolve(status);
                }
            });
        });
    }

    public deleteIndex(indexName) {
        return new Promise((resolve, reject) => {
            this.client.indices.delete({
                index: indexName,
            }).then((error, response, status) => {
                if (error) {
                    reject(0);
                } else {
                    resolve(response);
                }
            });
        });
    }

    public mapType(indexName, typeName, body) {
        return new Promise((resolve, reject) => {
            this.client.indices.putMapping({
                body,
                index: indexName,
                type: typeName,
            }).then((errror, response) => {
                if (errror) {
                    reject(errror);
                } else { resolve(response); }
            });
        });
    }

    public addData(indexName, typeName, id, data) {
        return new Promise((resolve, reject) => {
            this.client.index({
                body: data,
                id,
                index: indexName,
                type: typeName,
            }).then((error, resp, status) => {
                if (error) {
                    reject(0);
                } else {
                    resolve(1);
                }
            });
        });

    }

    public aSearch(indexName, typeName, query) {
        return new Promise((resolve, reject) => {
            this.client.search({
                body: query,
                index: indexName,
                type: typeName,
            }, (error, response, status) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(response);

                }
            });
        });
    }

    public deleteData(indexName, typeName, id) {
        return new Promise((resolve, reject) => {
            this.client.delete({
                id,
                ignore: [404],
                index: indexName,
                type: typeName,
            }, (err, resp, status) => {
                if (err) { reject(0); } else { resolve(1); }
            });
        });
    }

    public countAllData(indexName, typeName) {
        return new Promise((resolve, reject) => {
            this.client.count({ index: indexName, type: typeName }, (err, resp, status) => {
                if (err) {
                    reject(0);
                } else {
                    resolve(resp.count);
                }
            });
        });
    }

    public getMapping(indexName, typeName) {
        return new Promise((resolve, reject) => {
            this.client.indices.getMapping({
                index: indexName,
                type: typeName,
            },
                (error, response) => {
                    if (error) { reject(error.message); } else { resolve(response); }
                });
        });
    }

    public matchSearch(indexName, typeName, matchPair) {
        return new Promise((resolve, reject) => {
            this.client.search({
                body: {
                    query: { match: matchPair },
                },
                index: indexName,
                type: typeName,
            }, (error, response, status) => {
                if (error) { reject(error); } else { resolve(response); }
            });
        });
    }

    public countAllDBData() {
        return new Promise((resolve, reject) => {
            this.client.count((error, response, status) => {
                if (error) { reject(0); } else { resolve(response.count); }
            });
        });
    }

    public count_by_query(indexName, query) {
        return new Promise((resolve, reject) => {
            this.client.count({
                body: query,
                index: indexName,
            }, (err, response) => {
                if (response) {
                    resolve(response);
                } else {
                    reject(0);
                }
            });
        });
    }

    public update_data(indexName, typeName, id, data) {
        return new Promise((resolve, reject) => {
            this.client.update({
                body: { doc: data },
                id,
                index: indexName, type: typeName,
            }, (error, response) => {
                if (error) { reject(0); } else { resolve(1); }
            });
        });
    }

    public is_data_exist(indexName, typeName, id) {
        return new Promise((resolve, reject) => {

            this.client.exists({
                id,
                index: indexName,
                type: typeName,
            }, (error, exists) => {
                if (exists === true) {
                    resolve(1);
                } else {
                    reject(0);
                }
            });
        });
    }
}
