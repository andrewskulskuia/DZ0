import express from 'express'
import { db } from './prisma/db.js'
import { createUserRepository } from './repositories/user.js'
import { createUserService } from './services/auth.js'
import { createAuthRouter } from './routers/auth.js'
import { createPostRepository } from './repositories/post.js'
import { createPostService } from './services/post.js'
import { createPostHandler } from './transport/handlers/post.js'
import { createPostRouter } from './routers/post.js'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

const userRepo = createUserRepository(db)
const userService = createUserService(userRepo)
app.use('/auth', createAuthRouter(userService))

const postRepository = createPostRepository(db)
const postService = createPostService(postRepository)
const postHandler = createPostHandler(postService)
app.use('/posts', createPostRouter(postHandler))

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
})