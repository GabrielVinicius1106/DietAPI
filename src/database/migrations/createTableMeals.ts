import { Database } from "../database.js";

export class CreateTableMeals {

    private db

    constructor(){
        this.db = new Database()
    }

    public async up(){
        this.db.connect()
        await this.db.query("CREATE TABLE IF NOT EXISTS meals(id uuid NOT NULL PRIMARY KEY, username_id uuid NOT NULL, name TEXT NOT NULL, description TEXT NOT NULL, date TIMESTAMPTZ, inside_diet BOOLEAN NOT NULL, FOREIGN KEY (username_id) REFERENCES users(id) );")
        this.db.close()
    }

    public async down(){
        this.db.connect()
        await this.db.query("DROP TABLE meals;");
        this.db.close()
    }
}