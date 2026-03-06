import z from "zod"

export const getUserIdRouteSchema = z.object({
    username_id: z.string()
})