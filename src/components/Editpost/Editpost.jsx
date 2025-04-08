import { useContext, useState } from "react";
import { AuthContext } from "../AuthContext/AuthContext";
import { editPostRequest } from "../../utils/api";
import { useNavigate } from "react-router";
import { Postform } from "../Postform/Postform";

export const Editpost = ({ post, triggerEdit, setNeedsRefetch }) => {
  const [error, setError] = useState();
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    const title = formData.get("title");
    const text = formData.get("text");
    const publish = formData.get("publish") ? "published" : "unpublished";
    const editResponse = await editPostRequest(
      post,
      title,
      text,
      publish,
      token
    );
    if (!editResponse.status === 204) {
      setError(editResponse.validationErrors);
      return;
    }
    triggerEdit();
    setNeedsRefetch(true);
    navigate(`/posts/${post.id}`);
  };

  return (
    <Postform
      onSubmit={onSubmit}
      error={error}
      title={post.title}
      text={post.text}
      state={post.state}
    />
  );
};
