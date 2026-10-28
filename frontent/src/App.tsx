import './App.css'
import { useGetPostsQuery } from './api/baseApi'
import { PostsProps } from './component/post'

function App() {
  const { data: posts, isLoading, isError } = useGetPostsQuery({})

  if (isLoading) {
    return <div className="loading">loading</div>
  }

  if (isError) {
    return <div className="error">error</div>
  }

  return (
    <div className="app-container">
      <div className="posts-list">
        {posts && posts.length === 0 ? (
          <p>no posts</p>
        ) : (
          posts?.map((post: any) => (
            <PostsProps key={post.id} post={post} />
          ))
        )}
      </div>
    </div>
  )
}

export default App