import "dotenv/config"
import z from "zod"

const envSchema = z.object({
    PORT: z.coerce.number(),
    DB_USER: z.string(),
    DB_PASSWORD: z.string(),
    DB_HOST: z.string(),
    DB_PORT: z.coerce.number(),
    DATABASE: z.string()
})

const _env = envSchema.safeParse(process.env)

if(_env.success === false) throw new Error(`Invalid Environment Variables: ${_env.error}`)

export const env = _env.data