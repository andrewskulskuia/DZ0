export interface CreatePostDTO{
    title: string
    content: string
    author :string
    category: string
}

export interface PostQueryDTO{
    content: string
    take: string
    category: string;
}