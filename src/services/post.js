import postRepository from '../repositories/post.js'

export async function getAllPosts(category, take) {
    return await postRepository.getAll(category, take)
}

export async function getPostById(id) {
    return await postRepository.getById(id)
}

export async function createPost(postData) {
    return await postRepository.addPost(postData)
}