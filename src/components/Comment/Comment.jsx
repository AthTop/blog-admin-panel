import FormatedDate from "../FormatedDate/FormatedDate";

function Comment({ comment }) {
  return (
    <div>
      <p>{comment.text}</p>
      <p>
        Posted: <FormatedDate dateString={comment.posted} />{" "}
        <span>By: {comment.user.username}</span>
        <button>Edit</button>
        <button>Delete</button>
      </p>
    </div>
  );
}

export default Comment;
