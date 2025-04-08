import { useNavigate, useParams } from "react-router";
import { useState, useEffect, useContext } from "react";
import { fetchPost } from "../../utils/api";
import styles from "./Post.module.css";
import FormatedDate from "../FormatedDate/FormatedDate";
import Comment from "../Comment/Comment";
import { AuthContext } from "../AuthContext/AuthContext";
import { deletePost } from "../../utils/api";
import { Editpost } from "../Editpost/Editpost";

function Post() {
  const [post, setPost] = useState();
  const [error, setError] = useState();
  const [needsRefetch, setNeedsRefetch] = useState(false);
  const { postId } = useParams();
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    fetchPost(postId)
      .then((data) => setPost(data))
      .catch((err) => console.log(err));
    setNeedsRefetch(false);
  }, [postId, needsRefetch]);

  const triggerEdit = () => {
    setIsEdit(!isEdit);
  };

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
    if (isEdit) {
      return (
        <Editpost
          post={post}
          triggerEdit={triggerEdit}
          setNeedsRefetch={setNeedsRefetch}
        />
      );
    }
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
          <div>
            <button onClick={triggerEdit}>Edit</button>
            <button onClick={onDelete}>Delete</button>
          </div>
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
