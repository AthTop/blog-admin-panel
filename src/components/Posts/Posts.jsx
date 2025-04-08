import { useEffect, useState } from "react";
import { fetchPosts } from "../../utils/api";
import styles from "./Posts.module.css";
import FormatedDate from "../FormatedDate/FormatedDate";
import { Link } from "react-router";

function Posts() {
  const [posts, setPosts] = useState();
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    fetchPosts()
      .then((data) => setPosts(data))
      .finally(setLoading(false))
      .catch((err) => console.log(err));
  }, []);
  console.log(posts);
  return (
    <div className={isLoading ? styles.loading : styles.posts}>
      <Link className={styles.link} to="newpost">
        New post
      </Link>
      {posts &&
        posts.map((post) => {
          return (
            <Link
              className={styles.link}
              to={"/posts/" + post.id}
              key={post.id}
            >
              <div className={styles.post}>
                <h2>Title: {post.title}</h2>
                <p>
                  Posted: <FormatedDate dateString={post.posted} />
                </p>
                <p>Status: {post.state}</p>
              </div>
            </Link>
          );
        })}
    </div>
  );
}

export default Posts;
