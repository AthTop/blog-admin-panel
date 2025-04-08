import { useParams } from "react-router";
import { useState, useEffect, useContext } from "react";
import { fetchPost } from "../../utils/api";
import styles from "./Post.module.css";
import FormatedDate from "../FormatedDate/FormatedDate";
import Comment from "../Comment/Comment";
import { AuthContext } from "../AuthContext/AuthContext";

function Post() {
  const [post, setPost] = useState();
  const [needsRefetch, setNeedsRefetch] = useState(false);
  const { postId } = useParams();
  const { currentUser } = useContext(AuthContext);

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

  if (post) {
    return (
      <div className="content" key={post.id}>
        <div className={styles.post}>
          <h2>Title: {post.title}</h2>
          <p>{post.text}</p>
          <p>
            Posted: <FormatedDate dateString={post.posted} />{" "}
            <span>By: {post.author.username}</span>
          </p>
          <p>State: {post.state}</p>
          <button>Edit</button>
          <button>Delete</button>
        </div>
        <div className={styles.comments}>
          {post.comments.map((comment) => {
            return (
              <div key={comment.id} className={styles.comment}>
                <Comment comment={comment} />
              </div>
            );
          })}
          {/* {currentUser && (
            <NewComment
              postId={postId}
              triggerRefetch={() => setNeedsRefetch(true)}
            />
          )} */}
        </div>
      </div>
    );
  }
}

export default Post;
