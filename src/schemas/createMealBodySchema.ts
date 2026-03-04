import z from "zod"

export const createMealBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    inside_diet: z.boolean()
})