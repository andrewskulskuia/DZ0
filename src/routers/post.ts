import type { Request, Response } from 'express'
import  { Router } from 'express'

export interface PostHandlerContract {
    getPosts: (req: Request, res: Response) => void
    getPostById: (req: Request, res: Response) => void
    createPost: (req: Request, res: Response) => void
}

export function createPostRouter(handler: PostHandlerContract) {
    const router = Router()
    
    router.get('/', handler.getPosts)
    router.get('/:id', handler.getPostById)
    router.post('/', handler.createPost)

    return router
}