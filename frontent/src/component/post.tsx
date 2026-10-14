import type { Post } from "../type/type"

interface PostProps {
    post: Post
}

export function PostsProps({ post }: PostProps) {
    return (
        <div className="post-card">
            <h2>{post.title}</h2>
            <p>{post.content}</p>
        </div>
    )
}