import type { Post } from '../domein/post/entity.js'
import type { PostRepository } from '../domein/post/repository.js'

export function createPostService(postRepository: PostRepository) {
    return {
        async getAllPosts(category?: Post["category"], take: number = 10) {
            return await postRepository.getPosts(category, take)
        },

        async getPostById(id: Post["id"]) {
            return await postRepository.getById(id)
        },

        async createPost(postData: any) {
            const postWithUser = {
                ...postData,
                userId: postData.userId || "fa66657f-4ee9-469e-b3de-9b4d86dba86a"
            }

            return await postRepository.addPost(postWithUser)
        }
    }
}