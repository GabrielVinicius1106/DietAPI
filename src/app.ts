import { fastify } from "fastify"
import { userRoutes } from "./routes/userRoutes.js"
import { mealRoutes } from "./routes/mealRoutes.js"

const app = fastify()

app.register(userRoutes, {
    prefix: "users"
})

app.register(mealRoutes, {
    prefix: "meals"
})

export { app }