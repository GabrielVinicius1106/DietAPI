import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { createMealBodySchema } from "../schemas/createMealBodySchema.js";
import { getUserIdHeaderSchema } from "../schemas/getUserIdHeaderSchema.js";
import { getUserIdRouteSchema } from "../schemas/getUserIdRouteSchema.js";
import { Meal } from "../interfaces/meal.js";
import { randomUUID } from "node:crypto";
import { db } from "../database/database.js";

export async function mealRoutes(server: FastifyInstance){

    // Create Meal
    server.post("/", async (req: FastifyRequest, res: FastifyReply) => {

        const { name, description, inside_diet } = createMealBodySchema.parse(req.body)

        const id = randomUUID()
        const { username_id } = getUserIdHeaderSchema.parse(req.headers)

        if(!name) return res.status(400).send({ message: "Name is Required." })

        if(!description) return res.status(400).send({ message: "Description is Required." })

        if(!username_id) return res.status(400).send({ message: "Username_ID is Required." })

        const meal: Meal = {
            id,
            username_id,
            name,
            description,
            date: new Date(),
            inside_diet
        }

        const response = await db.createMeal(meal)

        return res.status(201).send({
            meal: response
        })

    })

    // List Meals
    server.get("/", async (req: FastifyRequest, res: FastifyReply) => {
        
        const { username_id } = getUserIdHeaderSchema.parse(req.headers)

        if(!username_id) return res.status(200).send({ message: "Username_ID is Required." })

        const response = await db.listMeals(username_id)

        return res.status(200).send({
            data: response
        })

    })

    // Delete Meal
    server.delete("/:id", async (req: FastifyRequest, res: FastifyReply) => {

        const { id } = getUserIdRouteSchema.parse(req.params)
        const { username_id } = getUserIdHeaderSchema.parse(req.headers)

        const response = await db.deleteMeal(id, username_id)

        return res.status(200).send({ message: response })

    })

}