import './App.css'
import { Posts } from './data/data'
import { PostsProps } from './component/post'


function App() {
  return (
    <div className="app-container">
      <div className="posts-list">
        {Posts.map((post) => (
          <PostsProps key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}

export default App