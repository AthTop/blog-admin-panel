import { useNavigate, useParams } from "react-router";
import { useState, useEffect, useContext } from "react";
import { fetchPost } from "../../utils/api";
import styles from "./Post.module.css";
import FormatedDate from "../FormatedDate/FormatedDate";
import Comment from "../Comment/Comment";
import { AuthContext } from "../AuthContext/AuthContext";
import { deletePost } from "../../utils/api";

function Post() {
  const [post, setPost] = useState();
  const [error, setError] = useState();
  const [needsRefetch, setNeedsRefetch] = useState(false);
  const { postId } = useParams();
  const { currentUser, token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPost(postId)
      .then((data) => setPost(data))
      .catch((err) => console.log(err));
    setNeedsRefetch(false);
  }, [postId, needsRefetch]);

  // Todo
  // const changeState = async () => {
  //   const stateResponse = changePostState(postId);
  // }

  const onDelete = async () => {
    alert("Are you sure?");
    const deleteResponse = await deletePost(post, token);
    console.log(deleteResponse);
    if (deleteResponse === 204) {
      navigate("/posts");
    } else {
      setError("Something went wrong with deletion");
    }
  };

  if (post) {
    return (
      <div className="content" key={post.id}>
        <span>{error}</span>
        <div className={styles.post}>
          <h2>Title: {post.title}</h2>
          <p>{post.text}</p>
          <p>
            Posted: <FormatedDate dateString={post.posted} />{" "}
            <span>By: {post.author.username}</span>
          </p>
          <p>State: {post.state}</p>
          <button>Edit</button>
          <button onClick={onDelete}>Delete</button>
        </div>
        <div className={styles.comments}>
          {post.comments.map((comment) => {
            return (
              <div key={comment.id} className={styles.comment}>
                <Comment comment={comment} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Post;
