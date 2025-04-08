import { useContext, useState } from "react";
import { AuthContext } from "../AuthContext/AuthContext";
import { editCommentRequest } from "../../utils/api";
import { useNavigate, useParams } from "react-router";
import styles from "./Editcomment.module.css";

export const Editcomment = ({ comment, triggerEdit, setNeedsRefetch }) => {
  const [error, setError] = useState();
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const { postId } = useParams();

  const onSubmit = async (formData) => {
    const text = formData.get("text");
    const editResponse = await editCommentRequest(
      postId,
      comment.id,
      text,
      token
    );
    if (!editResponse.status === 204) {
      setError(editResponse.validationErrors);
      return;
    }
    triggerEdit();
    setNeedsRefetch(true);
    navigate(`/posts/${postId}`);
  };

  return (
    <div className={styles.wrapper}>
      <span>{error}</span>
      <form action={onSubmit}>
        <label htmlFor="text">Text: </label>
        <textarea name="text" required defaultValue={comment.text}></textarea>
        <button type="submit">Post</button>
      </form>
    </div>
  );
};
