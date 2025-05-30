import { useContext, useState } from "react";
import { AuthContext } from "../AuthContext/AuthContext";
import { postRequest } from "../../utils/api";
import { useNavigate } from "react-router";
import { Postform } from "../Postform/Postform";

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

  return <Postform onSubmit={onSubmit} error={error} />;
};
