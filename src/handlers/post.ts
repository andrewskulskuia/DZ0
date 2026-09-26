import * as postService from '../services/post.js'
import type { Request, Response } from 'express'
import type { CreatePostDTO, PostQueryDTO } from '../dto/dto.js'


export async function getPosts(req: Request<{}, {}, {}, PostQueryDTO>, res: Response) {
    const take = req.query.take ? Number(req.query.take) : 10
    const category = req.query.category as string
    const posts = await postService.getAllPosts(category, take)
    res.json(posts);
}

export async function getPostById(req: Request, res: Response) {
    const id = req.params.id as string;

    if (!id) {
        return res.status(400).json({ error: 'ID is required' })
    }

    const post = await postService.getPostById(id)

    if (!post) {
        return res.status(404).json({ error: 'Post not found' })
    }

    res.json(post)
}

export async function createPost(req: Request<{}, {}, CreatePostDTO>, res: Response) {
    const { title, content, author, category } = req.body

    if (!title || !content || !author || !category) {
        return res.status(422).json({ error: 'All fields are required' })
    }

    const newPost = await postService.createPost({ title, content, author, category })
    res.status(201).json(newPost)
}