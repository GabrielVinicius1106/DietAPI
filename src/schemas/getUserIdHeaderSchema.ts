import z from "zod";

export const getUserIdHeaderSchema = z.object({
    username_id: z.string()
})