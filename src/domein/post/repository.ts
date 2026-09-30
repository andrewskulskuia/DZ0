import type { Post } from "./entity.js"

export interface PostRepository {
    getPosts(category?: string, take?: number): Promise<Post[]>
    getById(id: string): Promise<Post | null>
    addPost(postData: Omit<Post, "id">): Promise<Post>;
}