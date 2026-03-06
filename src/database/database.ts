import { Pool } from "pg"
import { DatabaseConfig } from "./database_config.js"
import { env } from "../env/index.js"
import { User } from "../interfaces/user.js"
import { Meal } from "../interfaces/meal.js"

class Database {
    
    private pool

    constructor(config: DatabaseConfig){
        this.pool = new Pool({
            host: config.host,
            user: config.user,
            password: config.password,
            database: config.database,
            port: config.port,
            max: 10
        })
    }

    // Find User byUsername Statement
    async findUserByUsername(username: string){
        
        const res = await this.pool.query("SELECT * FROM users WHERE username = $1;", [ username ]);

        return res.rows[0]
    }

    // Create User Statement
    async createUser(user: User){
        
        if(await this.findUserByUsername(user.username)) throw new Error("Este Usuário já Existe.") 
        
        await this.pool.query("INSERT INTO users (id, username, password) VALUES ($1, $2, $3);", [ user.id, user.username, user.password ])
        
        const res = await this.pool.query("SELECT * FROM users WHERE id = $1;", [ user.id ])

        return res.rows[0]
    }

    // Create Meal Statement
    async createMeal(meal: Meal){

        await this.pool.query("INSERT INTO meals (id, username_id, name, description, date, inside_diet) VALUES ($1, $2, $3, $4, $5, $6)", [ meal.id, meal.username_id, meal.name, meal.description, meal.date, meal.inside_diet ])

        const res = await this.pool.query("SELECT id, name, description, date, inside_diet FROM meals WHERE id = $1;", [ meal.id ])

        return res.rows[0]
    }   

    async findMealById(id: string, username_id: string){
        
        const res = await this.pool.query("SELECT * FROM meals WHERE id = $1 AND username_id = $2;", [ id, username_id ])

        return res.rows[0]  
    }

    // List Meals Statement
    async listMeals(username_id: string){

        const res = await this.pool.query("SELECT id, name, description, date, inside_diet FROM meals WHERE username_id = $1;", [ username_id ])

        return res.rows
    }

    // Delete Meal Statement
    async deleteMeal(id: string, username_id: string){

        const meal = await this.findMealById(id, username_id)

        if(!meal) return "Meal not Found."

        await this.pool.query("DELETE FROM meals WHERE id = $1 AND username_id = $2;", [ id, username_id ])
        
        return `${meal.name} Successfully Deleted.`
    }

    // Update Meal Statement
    async updateMeal(id: string, username_id: string, name: string, description: string, inside_diet: boolean){

        await this.pool.query("UPDATE meals SET name = $1, description = $2, inside_diet = $3 WHERE id = $4 AND username_id = $5;", [ name, description, inside_diet, id, username_id ])

        const res = await this.pool.query("SELECT id, name, description, date, inside_diet FROM meals WHERE id = $1 AND username_id = $2;", [ id, username_id ])

        return res.rows[0]
    }

    async close(){
        await this.pool.end()
    }
}

const database_config: DatabaseConfig = {
    host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DATABASE,
    port: env.DB_PORT
}

const db = new Database(database_config)

export { db }
