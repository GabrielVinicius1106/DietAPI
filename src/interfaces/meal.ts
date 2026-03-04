import { UUID } from "node:crypto";

export interface Meal {
    id: UUID
    username_id: string
    name: string
    description: string
    date: Date
    inside_diet: boolean
}