import { Client } from "pg"
import { env } from "../env/index.js"

export class Database {
    
    private client

    constructor(){
        this.client = new Client({
            host: env.DB_HOST,
            user: env.DB_USER,
            password: env.DB_PASSWORD,
            database: env.DATABASE,
            port: env.DB_PORT
        })
    }

    connect(){
        this.client.connect()
    }

    close(){
        this.client.end()
    }

    async query(query: string){
        await this.client.query(query)
    }
}
