import { Database } from "../database.js";

export class CreateTableUsers {

    private db

    constructor(){
        this.db = new Database()
    }

    public async up(){
        this.db.connect()
        await this.db.query("CREATE TABLE IF NOT EXISTS users(id uuid NOT NULL PRIMARY KEY, username TEXT NOT NULL, password TEXT NOT NULL);")
        this.db.close()
    }

    public async down(){
        this.db.connect()
        await this.db.query("DROP TABLE users;");
        this.db.close()
    }
}