import { Router } from 'express'
import { getPosts, getPostById, createPost } from '../handlers/post.js'

const router = Router()

router.get('/posts', getPosts)
router.get('/posts/:id', getPostById)
router.post('/posts', createPost)

export default router