// import PostCardList from "./post/PostCardList";
import "./App.css";
import { LoginForm } from "./component/user/LoginForm";
import { RegisterForm } from "./component/user/RegistrationForm";
function App() {
  return (
    <div className="app-container">
      <header className="board-header">
        <h1>/tech/ - Technology &amp; Programming</h1>
      </header>
      <main>
        <LoginForm />
        <RegisterForm />
        {/* <PostCardList /> */}
      </main>
    </div>
  );
}

export default App;