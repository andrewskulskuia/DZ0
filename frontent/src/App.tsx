
import "./App.css";
import { LoginForm } from "./component/user/LoginForm";
import { RegisterForm } from "./component/user/RegistrationForm";
import { useGetMeQuery } from "./api/baseApi";

function App() {
    const { data: user, isLoading } = useGetMeQuery();

    return (
        <div className="app-container">
            <header className="board-header">
                <h1>/tech/ - Technology &amp; Programming</h1>
                {isLoading ? (
                    <span>Loading...</span>
                ) : user ? (
                    <span>{user.email}</span>
                ) : null}
            </header>
            <main>
                {!user && (
                    <>
                        <LoginForm />
                        <RegisterForm />
                    </>
                )}
                {/* <PostCardList /> */}
            </main>
        </div>
    );
}

export default App;