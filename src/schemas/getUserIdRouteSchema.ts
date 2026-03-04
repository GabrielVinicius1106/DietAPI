import z from "zod";

export const getUserIdRouteSchema = z.object({
    id: z.string()
})