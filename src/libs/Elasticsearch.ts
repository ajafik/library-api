import * as elasticsearch from 'elasticsearch';
import { Config } from "../config/config";

export class Elasticsearch{
    ELASTIC_PORT:number;
    ELASTIC_HOST:string;

    client: any;

    config = new Config();
    constructor(){
        this.ELASTIC_PORT = this.config.Elasticsearch().ELASTIC_PORT;
        this.ELASTIC_HOST = this.config.Elasticsearch().ELASTIC_HOST;

        this.client = new elasticsearch.Client({host : this.ELASTIC_HOST +':' + this.ELASTIC_PORT});
    }

    isESUp(){
        return new Promise((resolve, reject)=>{
            this.client.ping({requestTimeout:30000}).then((res)=>console.log(res)).catch((error)=>console.log(error));
        });
    }
}