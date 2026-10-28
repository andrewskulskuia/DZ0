import type { Post } from "../domein/post/entity.js"
import type { PostRepository } from "../domein/post/repository.js"

type Database = typeof import("../prisma/db.js").db

export function createPostRepository(db: Database): PostRepository {
    const client = db as any

    async function getPostModel() {
        const model = client.orm?.Post 
                   || client.orm?.post 
                   || client.Post 
                   || client.post 
                   || client.orm?.public?.Post 
                   || client.orm?.public?.post

        if (!model) {
            throw new Error("Post Model not found")
        }
        return model
    }

    async function getPosts(category?: string, take?: number): Promise<Post[]> {
        const postModel = await getPostModel()
        let posts: Post[] = await postModel.all()

        if (category) {
            posts = posts.filter(p => p.category === category)
        }
        if (take) {
            posts = posts.slice(0, Number(take))
        }

        return posts
    }

    async function getById(id: string): Promise<Post | null> {
        const postModel = await getPostModel()
        const posts: Post[] = await postModel.all()
        return posts.find(p => p.id === id) || null
    }

    async function addPost(postData: Omit<Post, "id">): Promise<Post> {
        const postModel = await getPostModel()
        return postModel.create(postData)
    }

    return { getPosts, getById, addPost }
}