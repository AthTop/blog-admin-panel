import { useContext, useState } from "react";
import { AuthContext } from "../AuthContext/AuthContext";
import { postRequest } from "../../utils/api";
import { useNavigate } from "react-router";

export const Newpost = () => {
  const [error, setError] = useState();
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    const title = formData.get("title");
    const text = formData.get("text");
    const publish = formData.get("publish") ? "published" : "unpublished";
    const submitResponse = await postRequest(title, text, publish, token);
    if (!submitResponse.success) {
      setError(submitResponse.validationErrors);
      return;
    }
    const post = submitResponse.post;
    navigate(`/posts/${post.id}`);
  };

  return (
    <div>
      <span>{error}</span>
      <form action={onSubmit}>
        <label htmlFor="title">Title: </label>
        <input type="text" name="title" id="title" required />
        <label htmlFor="text">Text: </label>
        <textarea name="text" required></textarea>
        <label htmlFor="publish">Publish</label>
        <input type="checkbox" name="publish" id="publish" value="publish" />
        <button type="submit">Post</button>
      </form>
    </div>
  );
};
