import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { createUserBodySchema } from "../schemas/createUserBodySchema.js";
import { db } from "../database/database.js";
import { randomUUID } from "node:crypto";
import { User } from "../interfaces/user.js";

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
    

}