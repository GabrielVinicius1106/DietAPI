import { fastify, FastifyReply, FastifyRequest } from "fastify"
import { env } from "./env/index.js"

const server = fastify()

const PORT = env.PORT || 3333

server.get('/', (req: FastifyRequest, res: FastifyReply) => {
    return {
        message: "Hello World!"
    }
})

server.listen({
    port: PORT
}).then(() => { console.log(`Server running on PORT: ${PORT}`); })