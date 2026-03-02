import "dotenv/config"
import z from "zod"

const envSchema = z.object({
    PORT: z.coerce.number()
})

const _env = envSchema.safeParse(process.env)

if(_env.success === false) throw new Error(`Invalid Environment Variables: ${_env.error}`)

export const env = _env.data