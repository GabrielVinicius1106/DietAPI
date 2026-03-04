import { CreateTableMeals } from "./createTableMeals.js";
import { CreateTableUsers } from "./createTableUsers.js";

const createTableUsers = new CreateTableUsers()
const createTableMeals = new CreateTableMeals()

function createMigrations(){
    try {
        createTableUsers.up()
        createTableMeals.up()
        console.log("Excutando Migrations...");
    } catch(error: any) {
        console.log("Falha ao Executar Migrations!");
        console.log(error.message);
    }
}
createMigrations()

