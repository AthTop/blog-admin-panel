import FormatedDate from "../FormatedDate/FormatedDate";
import { useState, useContext } from "react";
import { AuthContext } from "../AuthContext/AuthContext";
import { deleteComment } from "../../utils/api";
import { useNavigate, useParams } from "react-router";
import { Editcomment } from "../Editcomment/Editcomment";

function Comment({ comment, setError, setNeedsRefetch }) {
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const { postId } = useParams();
  const { token } = useContext(AuthContext);

  const triggerEdit = () => {
    setIsEdit(!isEdit);
  };

  const onDelete = async () => {
    alert("Are you sure?");
    const deleteResponse = await deleteComment(postId, comment, token);
    if (deleteResponse === 204) {
      setNeedsRefetch(true);
      navigate(`/posts/${postId}`);
    } else {
      setError("Something went wrong with deletion");
    }
  };

  if (isEdit) {
    return (
      <Editcomment
        comment={comment}
        triggerEdit={triggerEdit}
        setNeedsRefetch={setNeedsRefetch}
      />
    );
  }
  return (
    <div>
      <p>{comment.text}</p>
      <p>
        Posted: <FormatedDate dateString={comment.posted} />{" "}
        <span>By: {comment.user.username}</span>
        <button onClick={triggerEdit}>Edit</button>
        <button onClick={onDelete}>Delete</button>
      </p>
    </div>
  );
}

export default Comment;
