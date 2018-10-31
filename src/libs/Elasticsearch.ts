import * as elasticsearch from 'elasticsearch';
import { Config } from "../config/config";

export class Elasticsearch {
    ELASTIC_PORT: number;
    ELASTIC_HOST: string;

    client: any;

    config = new Config();
    constructor() {
        this.ELASTIC_PORT = this.config.Elasticsearch().ELASTIC_PORT;
        this.ELASTIC_HOST = this.config.Elasticsearch().ELASTIC_HOST;

        this.client = new elasticsearch.Client({ host: this.ELASTIC_HOST + ':' + this.ELASTIC_PORT });
    }

    isESUp() {
        return new Promise((resolve, reject) => {
            this.client.ping({ requestTimeout: 30000 }).then((res) => console.log(res)).catch((error) => console.log(error));
        });
    }

    createIndex(index_name) { //Creates an Index (DB) on Elasticsearch
        return new Promise((resolve, reject) => {
            this.client.indices.create({
                index: index_name
            }).then((error, response, status) => {
                if (error) {
                    reject(0);
                } else {
                    resolve(status);
                }
            })
        });
    }

    deleteIndex(index_name) {
        return new Promise((resolve, reject) => {
            this.client.indices.delete({
                index: index_name
            }).then((error, response, status) => {
                if (error) {
                    reject(0);
                } else {
                    resolve(response);
                }
            })
        });
    }

    mapType(index_name, type_name, body) {
        return new Promise((resolve, reject) => {
            this.client.indices.putMapping({
                index: index_name,
                type: type_name,
                body: body
            }).then((errror, response) => {
                if (errror) {
                    reject(errror);
                } else { resolve(response); }
            });
        });
    }

    addData(index_name, type_name, id, data) {
        return new Promise((resolve, reject) => {
            this.client.index({
                index: index_name,
                id: id,
                type: type_name,
                body: data
            }).then((error, resp, status) => {
                if (error) {
                    reject(0);
                } else {
                    resolve(1);
                }
            });
        });

    }

    aSearch(index_name, type_name, query) {
        return new Promise((resolve, reject) => {
            this.client.search({
                index: index_name,
                type: type_name,
                body: query
            }, (error, response, status) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(response);

                }
            });
        });
    }

    deleteData(index_name, type_name, id) {
        return new Promise((resolve, reject) => {
            this.client.delete({
                index: index_name,
                id: id,
                type: type_name,
                ignore: [404]
            }, (err, resp, status) => {
                if (err) { reject(0); }
                else { resolve(1); }
            });
        });
    }

    countAllData(index_name, type_name) {
        return new Promise((resolve, reject) => {
            this.client.count({ index: index_name, type: type_name }, (err, resp, status) => {
                if (err) {
                    reject(0);
                }
                else {
                    resolve(resp['count']);
                }
            });
        });
    }

    getMapping(index_name, type_name) {
        return new Promise((resolve, reject) => {
            this.client.indices.getMapping({
                index: index_name,
                type: type_name,
            },
                (error, response) => {
                    if (error) { reject(error.message); }
                    else { resolve(response); }
                });
        });
    }


    matchSearch(index_name, type_name, match_pair) {
        return new Promise((resolve, reject) => {
            this.client.search({
                index: index_name,
                type: type_name,
                body: {
                    query: { match: match_pair },
                }
            }, (error, response, status) => {
                if (error) { reject(error); }
                else { resolve(response); }
            });
        });
    }


    countAllDBData() {
        return new Promise((resolve, reject) => {
            this.client.count((error, response, status) => {
                if (error) { reject(0); }
                else { resolve(response.count); }
            });
        });
    }

    count_by_query(index_name, query) {
        return new Promise((resolve, reject) => {
            this.client.count({
                index: index_name,
                body: query
            }, (err, response) => {
                if (response) {
                    resolve(response);
                } else {
                    reject(0);
                }
            });
        });
    }

    update_data(index_name, type_name, _id, data) {
        return new Promise((resolve, reject) => {
            this.client.update({
                index: index_name, type: type_name, id: _id,
                body: { doc: data }
            }, (error, response) => {
                if (error) { reject(0); }
                else { resolve(1); }
            });
        });
    }

    is_data_exist(index_name, type_name, _id) {
        return new Promise((resolve, reject) => {

            this.client.exists({
                index: index_name,
                type: type_name,
                id: _id
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