import { fastify, FastifyReply, FastifyRequest } from "fastify"
import { env } from "./env/index.js"
import { Database } from "./database/database.js"
import { randomUUID, UUID } from "node:crypto"

const server = fastify()

const PORT = env.PORT || 3333

server.get('/', (req: FastifyRequest, res: FastifyReply) => {
    
    return {
        message: "Hello World!"
    }
})

server.post('/users', async (req: FastifyRequest, res: FastifyReply) => {
    
    const { username, password }: any = req.body

    const id: UUID = randomUUID()

    const db = new Database()

    db.connect()
    await db.query(`INSERT INTO users (id, username, password) VALUES ('${id}', '${username}', '${password}');`)
    db.close()

    return res.send("Usuário criado com sucesso!")

})

server.listen({
    port: PORT
}).then(() => { console.log(`Server running on PORT: ${PORT}`); })