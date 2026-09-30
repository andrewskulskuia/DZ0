import express from 'express'
import postRepository from './repositories/post.js'
import { createPostService } from './services/post.js'
import { createPostHandler } from './transport/handlers/post.js'
import { createPostRouter } from './routers/post.js'

const app = express()

app.use(express.json())

const postService = createPostService(postRepository)
const postHandler = createPostHandler(postService)
const postRouter = createPostRouter(postHandler)

app.use('/posts', postRouter)

const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})