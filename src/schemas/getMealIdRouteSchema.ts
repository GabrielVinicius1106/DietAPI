import z from "zod";

export const getMealIdRouteSchema = z.object({
    id: z.string()
})