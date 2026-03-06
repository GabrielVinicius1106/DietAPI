import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { createUserBodySchema } from "../schemas/createUserBodySchema.js";
import { db } from "../database/database.js";
import { randomUUID } from "node:crypto";
import { User } from "../interfaces/user.js";
import { getUserIdRouteSchema } from "../schemas/getUserIdRouteSchema.js";
import { Meal } from "../interfaces/meal.js";

// Returns Best Sequence of inside_diet Meals
function getBestSequence(meals: Meal[]): number{

    let best: number = 0, actual: number = 0

    for(let i = 0; i < (meals.length - 1); i++){
        if(meals[0]?.inside_diet){

            actual++

            if(actual > best) best = actual

        } else {
            actual = 0
        }
    }

    return best
}

export async function userRoutes(server: FastifyInstance){

    // Create User
    server.post("/", async (req: FastifyRequest, res: FastifyReply) => {

        const { username, password } = createUserBodySchema.parse(req.body)

        if(!username) return res.status(400).send({ message: "Username is Required." })

        if(password.length < 8) return res.status(400).send({ message: "Invalid Password." })

        const id = randomUUID()

        const user: User = {
            id,
            username,
            password
        }

        const response = await db.createUser(user)

        return res.status(201).send({
            user: response
        })

    })  

    // List User Metrics
    server.get("/:username_id", async (req: FastifyRequest, res: FastifyReply) => {

        const { username_id } = getUserIdRouteSchema.parse(req.params)

        const response = await db.listMeals(username_id)

        const numberMeals = response.reduce((acc) => acc + 1, 0)

        const mealsInsideDiet = response.filter((meal) => meal.inside_diet).reduce((acc) => acc + 1, 0)

        const mealsOutsideDiet = response.filter((meal) => !meal.inside_diet).reduce((acc) => acc + 1, 0)

        const bestSequence = getBestSequence(response)

        return res.status(200).send({
            metrics: {
                number_of_meals: numberMeals,
                meals_inside_diet: mealsInsideDiet,
                meals_outside_diet: mealsOutsideDiet,
                best_sequence: bestSequence
            }
        })

    })
    

}