import express from 'express'
import postRouter from './routers/post.js'

const app = express()

app.use(express.json())

app.use(postRouter)

const PORT = 3000
const HOST = "localhost"
app.listen(PORT, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`)
})