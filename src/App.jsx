import { useContext } from "react";
import "./App.css";
import { Layout } from "./Pages/Layout";
import { AuthContext } from "./components/AuthContext/AuthContext";
import Login from "./components/Login/Login";
import { Route, Routes } from "react-router";
import { Logout } from "./components/Logout/Logout";
import Posts from "./components/Posts/Posts";
import Post from "./components/Post/Post";
import { Unauthorized } from "./components/Unauthorized/Unauthorized";
import { Newpost } from "./components/Newpost/Newpost";

function App() {
  const { currentUser } = useContext(AuthContext);
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={!currentUser && <Login />} />

          <Route path="logout" element={<Logout />} />
          {currentUser && currentUser.role === "admin" && (
            <Route>
              <Route path="posts" element={<Posts />} />
              <Route path="posts/newpost" element={<Newpost />} />
              <Route path="posts/:postId" element={<Post />} />
            </Route>
          )}
          <Route
            path="/*"
            element={
              currentUser && currentUser.role !== "admin" && <Unauthorized />
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
