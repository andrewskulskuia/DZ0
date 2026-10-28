import type { User } from "../User/entity";

export interface Post {
    id: string
    title: string
    content: string
    author?: User
    category: string
}