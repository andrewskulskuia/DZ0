import type { Request, Response } from 'express'
import type { CreatePostDTO, PostQueryDTO } from '..//../dto/dto.js' 

export interface PostHandlerContract {
    getPosts: (req: Request, res: Response) => Promise<any>
    getPostById: (req: Request, res: Response) => Promise<any>
    createPost: (req: Request, res: Response) => Promise<any>
}

export function createPostHandler(postService: any): PostHandlerContract {
    return {
        async getPosts(req, res) {
            const take = req.query.take ? Number(req.query.take) : 10
            const category = req.query.category as string
            const posts = await postService.getAllPosts(category, take)
            return res.json(posts)
        },

        async getPostById(req, res) {
            const id = req.params.id
            const post = await postService.getPostById(id)
            
            if (!post) {
                return res.status(404).json({ error: 'Post not found!' })
            }
            
            return res.json(post)
        },

        async createPost(req, res) {
            const { title, content, author, category } = req.body

            if (!title || !content || !author || !category) {
                return res.status(422).json({ error: 'All fields are required!' })
            }

            const newPost = await postService.createPost({ title, content, author, category })
            return res.status(201).json(newPost)
        }
    }
}