export interface Post{
    id: string
    title: string
    content: string
    author: string
    category: string
}

export type Postdata = Omit<Post, "id">

const posts: Post[] = [
    {
        id: '1',
        title: 'python',
        content: 'python.',
        author: 'python',
        category: 'python'
    },
    {
        id: '2',
        title: 'GO lang',
        content: 'GO lang',
        author: 'GO lang',
        category: 'GO lang'
    },
    {
        id: '3',
        title: 'JavaScript',
        content: 'JavaScript',
        author: 'JavaScript',
        category: 'JavaScript'
    }
]

class PostRepository {
    async getPosts(category?: Post["category"], take?: number) {
        let result = posts

        if (category) {
            result = result.filter(post => post.category === category)
        }

        if (take !== undefined && take !== null) {
            result = result.slice(0, Number(take))
        }

        return result;
    }

    async getById(id: Post["id"]) {
        return posts.find(post => post.id === id) || null
    }

    async addPost(postData: Postdata): Promise<Post> {
        return new Promise<Post>((resolve) => {
            const newId = (posts.length + 1).toString()

            const newPost: Post = {
                id: newId,
                ...postData
            }

            posts.push(newPost)
            resolve(newPost)
        });
    }
}

export default new PostRepository()