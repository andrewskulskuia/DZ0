import postRepository from '../repositories/post.js'
import type { Post, Postdata } from '../repositories/post.js'

// Додали ? ось тут 👇
export async function getAllPosts(category?: Post["category"], take: number = 10) {
    return await postRepository.getAll(category, take)
}

export async function getPostById(id: Post["id"]) {
    return await postRepository.getById(id)
}

export async function createPost(postData: Postdata) {
    return await postRepository.addPost(postData)
}