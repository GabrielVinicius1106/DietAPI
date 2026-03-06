import z from "zod"

export const updateMealBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    inside_diet: z.boolean()
})