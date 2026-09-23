import * as postService from '../services/post.js'

export async function getPosts(req, res) {
    const { category, take } = req.query
    const posts = await postService.getAllPosts(category, take)
    res.json(posts);
}

export async function getPostById(req, res) {
    const { id } = req.params

    if (!id) {
        return res.status(400).json({ error: 'ID is required' })
    }

    const post = await postService.getPostById(id)

    if (!post) {
        return res.status(404).json({ error: 'Post not found' })
    }

    res.json(post)
}

export async function createPost(req, res) {
    const { title, content, author, category } = req.body

    if (!title || !content || !author || !category) {
        return res.status(422).json({ error: 'All fields are required' })
    }

    const newPost = await postService.createPost({ title, content, author, category })
    res.status(201).json(newPost)
}